export interface HistoryUnit {
  id: string;
  title: string;
  lessons: HistoryLesson[];
}

export interface HistoryLesson {
  id: string;
  title: string;
  points: string[];
}

export interface HistoryStructure {
  units: HistoryUnit[];
}

const historyStructure: HistoryStructure = {
  units: [
    {
      id: 'h-unit1',
      title: '第一单元 隋唐时期：繁荣与开放的时代',
      lessons: [
        {
          id: 'h-lesson1',
          title: '第1课 隋朝的统一与灭亡',
          points: ['隋朝建立与统一', '隋文帝的统治措施', '大运河的开通', '科举制的创立', '隋朝的灭亡'],
        },
        {
          id: 'h-lesson2',
          title: '第2课 唐朝建立与"贞观之治"',
          points: ['唐朝的建立', '贞观之治', '武则天的统治'],
        },
        {
          id: 'h-lesson3',
          title: '第3课 开元盛世',
          points: ['开元盛世', '农业的发展', '手工业的兴盛', '商业的繁荣', '长安城'],
        },
        {
          id: 'h-lesson4',
          title: '第4课 安史之乱与唐朝衰亡',
          points: ['安史之乱', '黄巢起义', '唐朝灭亡', '五代十国'],
        },
        {
          id: 'h-lesson5',
          title: '第5课 隋唐时期的民族交往与交融',
          points: ['文成公主入藏', '与突厥的关系', '与回纥/渤海/南诏的关系', '唐朝疆域'],
        },
        {
          id: 'h-lesson6',
          title: '第6课 隋唐时期的中外文化交流',
          points: ['遣隋使和遣唐使', '鉴真东渡', '与新罗的交往', '玄奘西行', '与大食的交往'],
        },
        {
          id: 'h-lesson7',
          title: '第7课 隋唐时期的科技与文化',
          points: ['雕版印刷术', '天文学与医学', '思想与唐诗', '书法与绘画', '敦煌莫高窟'],
        },
      ],
    },
    {
      id: 'h-unit2',
      title: '第二单元 辽宋夏金元时期：民族关系发展和社会变化',
      lessons: [
        {
          id: 'h-lesson8',
          title: '第8课 北宋的政治',
          points: ['北宋的建立', '中央集权的加强', '崇文抑武方针', '王安石变法'],
        },
        {
          id: 'h-lesson9',
          title: '第9课 辽、西夏与北宋并立',
          points: ['辽的建立', '辽与北宋的和战', '西夏的建立', '西夏与北宋的关系'],
        },
        {
          id: 'h-lesson10',
          title: '第10课 金与南宋对峙',
          points: ['金的建立', '金灭辽与北宋', '南宋建立', '岳飞抗金', '宋金和议'],
        },
        {
          id: 'h-lesson11',
          title: '第11课 元朝的统一',
          points: ['蒙古兴起与元朝建立', '元朝的统一', '元朝的统治', '行省制度', '民族交融'],
        },
        {
          id: 'h-lesson12',
          title: '第12课 宋元时期经济的繁荣',
          points: ['农业的发展', '手工业的兴盛', '商业的繁荣', '经济重心南移'],
        },
        {
          id: 'h-lesson13',
          title: '第13课 宋元时期的对外交流',
          points: ['海外贸易的繁荣', '外贸管理机构', '中外文化交流'],
        },
        {
          id: 'h-lesson14',
          title: '第14课 辽宋夏金元时期的科技与文化',
          points: ['活字印刷术', '指南针与火药', '天文学发展', '理学', '宋词与元曲', '《资治通鉴》'],
        },
      ],
    },
    {
      id: 'h-unit3',
      title: '第三单元 明清时期：统一多民族国家的巩固与发展',
      lessons: [
        {
          id: 'h-lesson15',
          title: '第15课 明朝的统治',
          points: ['明朝的建立', '强化皇权', '科举考试的变化', '民族关系'],
        },
        {
          id: 'h-lesson16',
          title: '第16课 明朝的对外关系',
          points: ['郑和下西洋', '戚继光抗倭', '援朝战争', '葡萄牙人攫取澳门'],
        },
        {
          id: 'h-lesson17',
          title: '第17课 明朝的灭亡和清朝的建立',
          points: ['张居正改革', '李自成起义', '满洲兴起', '清军入关'],
        },
        {
          id: 'h-lesson18',
          title: '第18课 统一多民族国家的巩固和发展',
          points: ['郑成功收复台湾', '清朝对西藏的管辖', '清朝对新疆的管辖', '雅克萨之战', '清朝疆域'],
        },
        {
          id: 'h-lesson19',
          title: '第19课 清朝君主专制的强化',
          points: ['军机处的设立', '奏折制度', '文字狱', '社会矛盾加剧', '闭关政策'],
        },
        {
          id: 'h-lesson20',
          title: '第20课 明清时期社会经济的发展',
          points: ['农业生产的恢复和发展', '手工业的发展', '商业的繁荣', '人口增长'],
        },
        {
          id: 'h-lesson21',
          title: '第21课 明清时期的科技与文化',
          points: ['科技著作', '明长城与北京城', '明清思想家'],
        },
      ],
    },
  ],
};

export default historyStructure;
