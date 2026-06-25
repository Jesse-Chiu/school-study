export interface DaoUnit {
  id: string;
  title: string;
  lessons: DaoLesson[];
}

export interface DaoLesson {
  id: string;
  title: string;
  points: string[]; // 核心知识点
}

export interface DaoStructure {
  units: DaoUnit[];
}

const daoStructure: DaoStructure = {
  units: [
    {
      id: 'unit1',
      title: '第一单元 珍惜青春时光',
      lessons: [
        {
          id: 'lesson1',
          title: '第一课 青春正当时',
          points: [
            '青春期生理变化',
            '青春期心理变化',
            '青春期矛盾心理',
            '男生女生性别特征',
            '异性交往',
            '自我保护'
          ]
        },
        {
          id: 'lesson2',
          title: '第二课 做情绪情感的主人',
          points: [
            '情绪的类型与影响',
            '管理情绪的方法',
            '情感的作用',
            '培养积极情感',
            '提升情感境界'
          ]
        }
      ]
    },
    {
      id: 'unit2',
      title: '第二单元 焕发青春活力',
      lessons: [
        {
          id: 'lesson3',
          title: '第三课 人贵自尊',
          points: [
            '自尊的含义与表现',
            '自尊的重要性',
            '做自尊的人'
          ]
        },
        {
          id: 'lesson4',
          title: '第四课 自信给人力量',
          points: [
            '自信的含义与表现',
            '自信的作用',
            '做自信的人'
          ]
        },
        {
          id: 'lesson5',
          title: '第五课 人生当自强',
          points: [
            '自强的含义',
            '自强的作用',
            '做自强不息的中国人'
          ]
        }
      ]
    },
    {
      id: 'unit3',
      title: '第三单元 传承中华优秀传统文化',
      lessons: [
        {
          id: 'lesson6',
          title: '第六课 传承核心思想理念',
          points: [
            '中华优秀传统文化的核心思想理念',
            '讲仁爱、重民本、守诚信、崇正义、尚和合、求大同'
          ]
        },
        {
          id: 'lesson7',
          title: '第七课 弘扬中华人文精神',
          points: [
            '中华人文精神的主要体现',
            '处世方法、教化思想、美学追求、生活理念'
          ]
        },
        {
          id: 'lesson8',
          title: '第八课 践行中华传统美德',
          points: [
            '中华传统美德的内涵',
            '自强不息、敬业乐群、孝老爱亲、见义勇为'
          ]
        }
      ]
    },
    {
      id: 'unit4',
      title: '第四单元 生活在法治社会',
      lessons: [
        {
          id: 'lesson9',
          title: '第九课 法律为我们护航',
          points: [
            '法律的本质',
            '我国法律体系',
            '法律的作用'
          ]
        },
        {
          id: 'lesson10',
          title: '第十课 走近民法典',
          points: [
            '民法典的性质与作用',
            '人身权保护',
            '财产权保护'
          ]
        },
        {
          id: 'lesson11',
          title: '第十一课 远离违法犯罪',
          points: [
            '违法行为及其分类',
            '犯罪的特征',
            '刑罚的种类',
            '严于律己，远离违法犯罪'
          ]
        }
      ]
    }
  ]
};

export default daoStructure;
