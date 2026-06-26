import initSqlJs from 'sql.js';

let dbInstance: any = null;

// 从 IndexedDB 加载数据库
const loadDatabase = async (): Promise<Uint8Array | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open('SchoolStudyDB', 1);
    
    request.onupgradeneeded = () => {
      request.result.createObjectStore('database', { keyPath: 'id' });
    };
    
    request.onsuccess = () => {
      const tx = request.result.transaction('database', 'readonly');
      const store = tx.objectStore('database');
      const getRequest = store.get('sqlite-db');
      
      getRequest.onsuccess = () => {
        if (getRequest.result) {
          resolve(getRequest.result.data);
        } else {
          resolve(null);
        }
      };
      
      getRequest.onerror = () => resolve(null);
    };
    
    request.onerror = () => resolve(null);
  });
};

// 保存数据库到 IndexedDB
const saveDatabase = async (data: Uint8Array): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SchoolStudyDB', 1);
    
    request.onupgradeneeded = () => {
      request.result.createObjectStore('database', { keyPath: 'id' });
    };
    
    request.onsuccess = () => {
      const tx = request.result.transaction('database', 'readwrite');
      const store = tx.objectStore('database');
      const putRequest = store.put({ id: 'sqlite-db', data });
      
      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
};

// 初始化数据库
export const initDatabase = async (): Promise<any> => {
  if (dbInstance) return dbInstance;
  
  const SQL = await initSqlJs({
    locateFile: () => `/sql-wasm.wasm`
  });
  
  const existingData = await loadDatabase();
  
  if (existingData) {
    dbInstance = new SQL.Database(existingData);
    // 即使从缓存加载，也要确保建表 + 种子数据
    createTables();
    seedData();
  } else {
    dbInstance = new SQL.Database();
    createTables();
    seedData();
  }
  
  return dbInstance;
};

// 创建所有表
const createTables = () => {
  if (!dbInstance) return;
  
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      invite_code TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS wrong_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      question_id TEXT NOT NULL,
      subject TEXT NOT NULL,
      unit_id TEXT,
      chapter_id TEXT,
      question_data TEXT NOT NULL,
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, question_id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
  
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS exam_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      exam_id TEXT NOT NULL,
      exam_title TEXT,
      score INTEGER,
      total INTEGER,
      answers TEXT,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
  
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS invite_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      used_by INTEGER DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(used_by) REFERENCES users(id)
    )
  `);
  
  saveDbToIndexedDB();
};

// 种子数据：确保默认登入码始终存在
const seedData = () => {
  if (!dbInstance) return;
  
  const result = dbInstance.exec("SELECT COUNT(*) as count FROM invite_codes WHERE code = 'STUDY2026'");
  if (!result[0] || result[0].values[0][0] === 0) {
    dbInstance.run("INSERT OR IGNORE INTO invite_codes (code) VALUES ('STUDY2026')");
    saveDbToIndexedDB();
  }
};

const saveDbToIndexedDB = async () => {
  if (!dbInstance) return;
  
  try {
    const data = dbInstance.export();
    await saveDatabase(data);
  } catch (error) {
    console.error('保存数据库失败:', error);
  }
};

// 执行查询
export const dbQuery = (sql: string, params: any[] = []): any[] => {
  if (!dbInstance) return [];
  
  try {
    const stmt = dbInstance.prepare(sql);
    stmt.bind(params);
    
    const results: any[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    
    return results;
  } catch (error) {
    console.error('查询失败:', sql, error);
    return [];
  }
};

// 执行更新
export const dbRun = (sql: string, params: any[] = []): number => {
  if (!dbInstance) return -1;
  
  try {
    const stmt = dbInstance.prepare(sql);
    stmt.bind(params);
    stmt.step();
    stmt.free();
    
    saveDbToIndexedDB();
    
    const result = dbInstance.exec("SELECT last_insert_rowid() as id");
    return result[0]?.values[0][0] || 0;
  } catch (error) {
    console.error('执行失败:', sql, error);
    return -1;
  }
};

// 用户注册
export const registerUser = (username: string, password: string, inviteCode: string): { success: boolean; message: string } => {
  const codeResult = dbQuery("SELECT * FROM invite_codes WHERE code = ? AND used_by IS NULL", [inviteCode]);
  if (codeResult.length === 0) {
    return { success: false, message: '推荐码无效或已被使用' };
  }
  
  const userResult = dbQuery("SELECT * FROM users WHERE username = ?", [username]);
  if (userResult.length > 0) {
    return { success: false, message: '用户名已存在' };
  }
  
  const userId = dbRun(
    "INSERT INTO users (username, password, invite_code) VALUES (?, ?, ?)",
    [username, password, inviteCode]
  );
  
  if (userId > 0) {
    dbRun("UPDATE invite_codes SET used_by = ? WHERE code = ?", [userId, inviteCode]);
    return { success: true, message: '注册成功' };
  }
  
  return { success: false, message: '注册失败，请重试' };
};

// 用户登入码验证（扫码关注公众号后获取登入码）
export const loginWithCode = (code: string): { success: boolean; userId: number; username: string; message: string } => {
  if (!dbInstance) {
    console.error('[loginWithCode] dbInstance 为空');
    return { success: false, userId: -1, username: '', message: '系统初始化中，请刷新页面' };
  }

  try {
    // 查找登入码 - 直接使用 dbInstance.prepare
    let stmt = dbInstance.prepare("SELECT * FROM invite_codes WHERE code = ?");
    stmt.bind([code]);
    
    if (!stmt.step()) {
      stmt.free();
      console.warn('[loginWithCode] 登入码无效:', code);
      return { success: false, userId: -1, username: '', message: '登入码无效' };
    }
    
    const inviteEntry = stmt.getAsObject();
    stmt.free();
    
    const username = `student_${Date.now()}`;

    // 登入码已被使用，查找对应用户
    if (inviteEntry.used_by) {
      stmt = dbInstance.prepare("SELECT * FROM users WHERE id = ?");
      stmt.bind([inviteEntry.used_by]);
      
      if (stmt.step()) {
        const user = stmt.getAsObject();
        stmt.free();
        return { 
          success: true, 
          userId: user.id, 
          username: user.username, 
          message: '登入成功（已有账户）' 
        };
      }
      stmt.free();
    }

    // 登入码未使用，创建新用户 — 直接 dbInstance.run(sql, params)
    dbInstance.run(
      "INSERT INTO users (username, password, invite_code) VALUES (?, ?, ?)",
      [username, code, code]
    );

    // 获取刚插入的 userId
    const lastIdResult = dbInstance.exec("SELECT last_insert_rowid() as id");
    const userId = lastIdResult[0]?.values?.[0]?.[0] as number;
    
    console.log('[loginWithCode] 插入结果 userId:', userId);

    if (userId && userId > 0) {
      dbInstance.run("UPDATE invite_codes SET used_by = ? WHERE code = ?", [userId, code]);
      saveDbToIndexedDB();
      return { success: true, userId, username, message: '首次登入成功' };
    }

    return { success: false, userId: -1, username: '', message: '创建账户失败，请重试' };
  } catch (error) {
    console.error('[loginWithCode] 异常:', error);
    return { success: false, userId: -1, username: '', message: `系统错误: ${error}` };
  }
};

// 用户登录（用户名+密码，保留供后续使用）
export const loginUser = (username: string, password: string): { success: boolean; userId: number; message: string } => {
  const result = dbQuery("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
  
  if (result.length === 0) {
    return { success: false, userId: -1, message: '用户名或密码错误' };
  }
  
  return { success: true, userId: result[0].id, message: '登录成功' };
};

// 添加错题
export const addWrongQuestion = (userId: number, questionId: string, subject: string, unitId: string, chapterId: string, questionData: any) => {
  try {
    dbRun(
      `INSERT OR REPLACE INTO wrong_questions (user_id, question_id, subject, unit_id, chapter_id, question_data) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, questionId, subject, unitId, chapterId, JSON.stringify(questionData)]
    );
    return true;
  } catch (error) {
    console.error('添加错题失败:', error);
    return false;
  }
};

// 删除错题
export const removeWrongQuestion = (userId: number, questionId: string) => {
  dbRun("DELETE FROM wrong_questions WHERE user_id = ? AND question_id = ?", [userId, questionId]);
};

// 获取用户错题列表
export const getWrongQuestions = (userId: number, subject?: string): any[] => {
  let sql = "SELECT * FROM wrong_questions WHERE user_id = ?";
  const params: any[] = [userId];
  
  if (subject) {
    sql += " AND subject = ?";
    params.push(subject);
  }
  
  sql += " ORDER BY added_at DESC";
  
  const results = dbQuery(sql, params);
  return results.map(row => ({
    ...row,
    question_data: JSON.parse(row.question_data)
  }));
};

// 清空用户所有错题
export const clearWrongQuestions = (userId: number) => {
  dbRun("DELETE FROM wrong_questions WHERE user_id = ?", [userId]);
};

// 保存模拟测试记录
export const saveExamRecord = (userId: number, examId: string, examTitle: string, score: number, total: number, answers: any) => {
  return dbRun(
    "INSERT INTO exam_records (user_id, exam_id, exam_title, score, total, answers) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, examId, examTitle, score, total, JSON.stringify(answers)]
  );
};

// 获取用户的模拟测试记录
export const getExamRecords = (userId: number, examId?: string): any[] => {
  let sql = "SELECT * FROM exam_records WHERE user_id = ?";
  const params: any[] = [userId];
  
  if (examId) {
    sql += " AND exam_id = ?";
    params.push(examId);
  }
  
  sql += " ORDER BY submitted_at DESC";
  
  const results = dbQuery(sql, params);
  return results.map(row => ({
    ...row,
    answers: JSON.parse(row.answers)
  }));
};

// 初始化数据库
export const initializeDatabase = async () => {
  await initDatabase();
};
