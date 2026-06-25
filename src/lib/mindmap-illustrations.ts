/**
 * 知识脑图 SVG 插图
 * 每个插图都是自包含的 SVG 字符串，用于嵌入 Markdown 节点
 */

/** 花的结构示意 */
export const flowerStructure = `
<svg width="200" height="160" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(100,90)">
    <circle cx="0" cy="0" r="4" fill="#e91e63"/>
    <ellipse cx="0" cy="14" rx="2" ry="12" fill="#4caf50"/>
    <text x="14" y="16" font-size="8" fill="#388e3c">花柱</text>
    <ellipse cx="0" cy="-16" rx="10" ry="4" fill="#ff9800"/>
    <text x="14" y="-12" font-size="8" fill="#f57c00">柱头</text>
    <ellipse cx="0" cy="-30" rx="5" ry="10" fill="#e91e63"/>
    <text x="14" y="-26" font-size="8" fill="#c2185b">子房壁</text>
    <circle cx="0" cy="-33" r="2" fill="#ffeb3b"/>
    <text x="14" y="-40" font-size="8" fill="#fbc02d">胚珠</text>
    <line x1="-20" y1="-16" x2="-40" y2="-30" stroke="#795548" stroke-width="1.5"/>
    <circle cx="-40" cy="-32" r="5" fill="#ff9800"/>
    <text x="-62" y="-28" font-size="8" fill="#e65100">花药</text>
    <line x1="-40" y1="-30" x2="-40" y2="-12" stroke="#795548" stroke-width="1.5"/>
    <text x="-62" y="-8" font-size="8" fill="#795548">花丝</text>
    <text x="-62" y="-4" font-size="7" fill="#795548">（雄蕊）</text>
    <ellipse cx="25" cy="-10" rx="12" ry="6" fill="#f48fb1" opacity="0.5"/>
    <text x="42" y="-8" font-size="8" fill="#ad1457">花瓣</text>
    <ellipse cx="-25" cy="-4" rx="8" ry="4" fill="#a5d6a7" opacity="0.6"/>
    <text x="-48" y="-2" font-size="8" fill="#2e7d32">萼片</text>
  </g>
</svg>
`;

/** 消化系统示意 */
export const digestiveSystem = `
<svg width="180" height="200" viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg">
  <text x="5" y="10" font-size="8" fill="#666">口腔</text>
  <ellipse cx="90" cy="18" rx="18" ry="10" fill="#f48fb1"/>
  <text x="5" y="35" font-size="8" fill="#666">咽</text>
  <rect x="82" y="28" width="16" height="10" rx="3" fill="#ef9a9a"/>
  <text x="5" y="52" font-size="8" fill="#666">食道</text>
  <line x1="90" y1="38" x2="90" y2="58" stroke="#ef9a9a" stroke-width="4"/>
  <text x="5" y="72" font-size="8" fill="#666">胃</text>
  <ellipse cx="90" cy="78" rx="22" ry="16" fill="#ffcc80"/>
  <text x="120" y="78" font-size="7" fill="#f57c00">肝脏（最大）</text>
  <text x="5" y="110" font-size="8" fill="#666">小肠</text>
  <path d="M90,94 Q70,110 90,130 Q110,110 90,94" stroke="#a5d6a7" fill="#c8e6c9" stroke-width="1"/>
  <text x="14" y="140" font-size="7" fill="#2e7d32">5-6米</text>
  <text x="5" y="160" font-size="8" fill="#666">大肠</text>
  <rect x="70" y="150" width="40" height="20" rx="8" fill="#bcaaa4"/>
  <text x="5" y="188" font-size="8" fill="#666">肛门</text>
  <circle cx="90" cy="192" r="4" fill="#bcaaa4"/>
</svg>
`;

/** 心脏结构示意 */
export const heartStructure = `
<svg width="220" height="180" viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="12" width="180" height="140" rx="20" fill="#ffcdd2" stroke="#e57373" stroke-width="1.5"/>
  <line x1="100" y1="12" x2="100" y2="152" stroke="#e57373" stroke-width="1"/>
  <line x1="10" y1="82" x2="190" y2="82" stroke="#ef9a9a" stroke-width="1" stroke-dasharray="3"/>
  <text x="30" y="55" font-size="9" fill="#c62828" font-weight="bold">右心房</text>
  <text x="120" y="55" font-size="9" fill="#c62828" font-weight="bold">左心房</text>
  <text x="30" y="128" font-size="9" fill="#b71c1c" font-weight="bold">右心室</text>
  <text x="118" y="128" font-size="9" fill="#b71c1c" font-weight="bold">左心室</text>
  <text x="128" y="142" font-size="7" fill="#d32f2f">壁最厚→</text>
  <rect x="82" y="70" width="36" height="14" rx="2" fill="none" stroke="#f44336" stroke-width="1"/>
  <text x="85" y="80" font-size="7" fill="#d32f2f">房室瓣</text>
  <text x="195" y="30" font-size="7" fill="#1565c0">肺静脉→</text>
  <text x="195" y="42" font-size="7" fill="#1565c0">←主动脉</text>
</svg>
`;

/** 血液循环示意 */
export const bloodCirculation = `
<svg width="240" height="160" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect x="100" y="50" width="40" height="50" rx="8" fill="#ffcdd2" stroke="#ef5350" stroke-width="1"/>
  <text x="106" y="80" font-size="7" fill="#b71c1c">心脏</text>
  <text x="20" y="20" font-size="8" fill="#1565c0" font-weight="bold">体循环</text>
  <path d="M100,65 C60,65 60,20 30,30" stroke="#1565c0" stroke-width="1.5" fill="none" marker-end="url(#arrowBlue)"/>
  <text x="5" y="35" font-size="7" fill="#1565c0">全身</text>
  <path d="M30,40 C60,50 60,95 100,85" stroke="#1565c0" stroke-width="1.5" fill="none"/>
  <text x="5" y="55" font-size="7" fill="#d32f2f">动脉血→静脉血</text>
  <text x="150" y="20" font-size="8" fill="#e65100" font-weight="bold">肺循环</text>
  <path d="M140,65 C170,65 190,30 210,35" stroke="#e65100" stroke-width="1.5" fill="none"/>
  <text x="195" y="40" font-size="7" fill="#e65100">肺部</text>
  <path d="M210,45 C190,55 170,95 140,85" stroke="#e65100" stroke-width="1.5" fill="none"/>
  <text x="165" y="55" font-size="7" fill="#d32f2f">静脉血→动脉血</text>
  <defs>
    <marker id="arrowBlue" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6"><path d="M0,0 L8,4 L0,8 Z" fill="#1565c0"/></marker>
  </defs>
</svg>
`;

/** 肺泡气体交换 */
export const alveoliExchange = `
<svg width="220" height="140" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
  <circle cx="80" cy="60" r="25" fill="none" stroke="#66bb6a" stroke-width="1.5"/>
  <text x="68" y="64" font-size="8" fill="#2e7d32">肺泡</text>
  <text x="30" y="30" font-size="7" fill="#1565c0">O₂</text>
  <path d="M40,25 C50,30 60,40 70,44" stroke="#1565c0" stroke-width="1" fill="none" marker-end="url(#arrowO2)"/>
  <text x="20" y="100" font-size="7" fill="#d32f2f">CO₂</text>
  <path d="M70,90 C60,96 45,105 35,100" stroke="#d32f2f" stroke-width="1" fill="none"/>
  <rect x="120" y="40" width="80" height="40" rx="6" fill="#ffcdd2" stroke="#e57373" stroke-width="1"/>
  <text x="128" y="55" font-size="7" fill="#c62828">毛细血管</text>
  <text x="128" y="68" font-size="7" fill="#c62828">（一层上皮细胞）</text>
  <text x="40" y="120" font-size="8" fill="#2e7d32" font-weight="bold">扩散作用</text>
  <defs>
    <marker id="arrowO2" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5"><path d="M0,0 L8,4 L0,8 Z" fill="#1565c0"/></marker>
  </defs>
</svg>
`;

/** 肾单位结构 */
export const nephronStructure = `
<svg width="220" height="150" viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="50" r="20" fill="none" stroke="#e91e63" stroke-width="1.5"/>
  <text x="48" y="54" font-size="7" fill="#ad1457">肾小球</text>
  <text x="55" y="78" font-size="7" fill="#d32f2f">过滤→原尿</text>
  <path d="M60,70 Q60,100 120,100" stroke="#e91e63" stroke-width="1.5" fill="none"/>
  <rect x="115" y="85" width="14" height="30" rx="2" fill="none" stroke="#e91e63" stroke-width="1"/>
  <text x="130" y="105" font-size="7" fill="#ad1457">肾小管</text>
  <text x="90" y="125" font-size="7" fill="#d32f2f">重吸收→终尿</text>
  <path d="M129,100 Q150,100 150,50 Q150,20 120,20 Q80,20 80,50 Q80,65 95,75" stroke="#1976d2" stroke-width="1" stroke-dasharray="3" fill="none"/>
  <text x="155" y="25" font-size="7" fill="#1976d2">血液</text>
  <text x="10" y="15" font-size="8" fill="#ad1457" font-weight="bold">肾单位</text>
</svg>
`;

/** 种子萌发过程 */
export const seedGermination = `
<svg width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="80" rx="15" ry="10" fill="#795548"/>
  <text x="28" y="100" font-size="7" fill="#4e342e">种子</text>
  <text x="20" y="18" font-size="7" fill="#4caf50">条件：</text>
  <text x="20" y="30" font-size="7" fill="#4caf50">适宜温度</text>
  <text x="20" y="42" font-size="7" fill="#4caf50">一定水分</text>
  <text x="20" y="54" font-size="7" fill="#4caf50">充足空气</text>
  <path d="M55,80 Q70,60 85,40" stroke="#4caf50" stroke-width="1.5" fill="none"/>
  <text x="72" y="65" font-size="6" fill="#388e3c">胚根→根</text>
  <path d="M85,40 Q95,20 95,10" stroke="#66bb6a" stroke-width="1.5" fill="none"/>
  <text x="98" y="18" font-size="6" fill="#388e3c">胚芽→</text>
  <text x="98" y="28" font-size="6" fill="#388e3c">茎和叶</text>
  <ellipse cx="95" cy="8" rx="18" ry="6" fill="#a5d6a7"/>
</svg>
`;

/** 光合作用与呼吸作用关系 */
export const photosynthesisRespiration = `
<svg width="240" height="120" viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="20" width="90" height="60" rx="8" fill="#c8e6c9" stroke="#66bb6a" stroke-width="1"/>
  <text x="20" y="38" font-size="8" fill="#2e7d32" font-weight="bold">光合作用</text>
  <text x="20" y="52" font-size="7" fill="#2e7d32">CO₂+H₂O→有机物+O₂</text>
  <text x="20" y="68" font-size="7" fill="#2e7d32">叶绿体 | 光能</text>
  <rect x="140" y="20" width="90" height="60" rx="8" fill="#ffcdd2" stroke="#e57373" stroke-width="1"/>
  <text x="150" y="38" font-size="8" fill="#c62828" font-weight="bold">呼吸作用</text>
  <text x="150" y="52" font-size="7" fill="#c62828">有机物+O₂→CO₂+H₂O+能量</text>
  <text x="150" y="68" font-size="7" fill="#c62828">线粒体 | 全天</text>
  <path d="M100,40 Q120,30 140,40" stroke="#f44336" stroke-width="1.5" fill="none" marker-end="url(#arrowR)"/>
  <text x="112" y="35" font-size="6" fill="#d32f2f">O₂</text>
  <path d="M140,60 Q120,70 100,60" stroke="#4caf50" stroke-width="1.5" fill="none" marker-end="url(#arrowG)"/>
  <text x="112" y="72" font-size="6" fill="#2e7d32">CO₂</text>
  <defs>
    <marker id="arrowR" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5"><path d="M0,0 L8,4 L0,8 Z" fill="#d32f2f"/></marker>
    <marker id="arrowG" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5"><path d="M0,0 L8,4 L0,8 Z" fill="#4caf50"/></marker>
  </defs>
</svg>
`;

/** 所有插图的映射表，按知识触发的关键词索引 */
export const illustrationMap: Record<string, string> = {
  '花的结构': flowerStructure,
  '开花和结果': flowerStructure,
  '传粉': flowerStructure,
  '消化系统': digestiveSystem,
  '消化和吸收': digestiveSystem,
  '小肠': digestiveSystem,
  '心脏': heartStructure,
  '心脏的结构': heartStructure,
  '四腔': heartStructure,
  '体循环': bloodCirculation,
  '肺循环': bloodCirculation,
  '血液循环': bloodCirculation,
  '肺泡': alveoliExchange,
  '气体交换': alveoliExchange,
  '呼吸运动': alveoliExchange,
  '肾单位': nephronStructure,
  '肾小球': nephronStructure,
  '尿液': nephronStructure,
  '种子的萌发': seedGermination,
  '种子萌发': seedGermination,
  '萌发': seedGermination,
  '光合作用': photosynthesisRespiration,
  '呼吸作用': photosynthesisRespiration,
};

/**
 * 查找匹配的插图
 * 如果节点标题包含关键词，返回对应的 SVG
 */
export function findIllustration(title: string): string | undefined {
  for (const [key, svg] of Object.entries(illustrationMap)) {
    if (title.includes(key)) return svg;
  }
  return undefined;
}
