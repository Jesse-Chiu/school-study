import { useState } from 'react';
import { ChevronDown, ChevronRight, Lightbulb, AlertTriangle, Beaker, BookOpen } from 'lucide-react';

const summarySections = [
  {
    id: 'unit3-key',
    title: '🌿 第三单元核心知识点速记',
    icon: BookOpen,
    color: 'emerald',
    items: [
      { k: '种子的萌发条件', v: '环境：适宜温度、一定水分、充足空气；自身：活、完整、非休眠' },
      { k: '根尖结构（从上到下）', v: '成熟区（根毛，吸收）→伸长区（体积增大）→分生区（分裂）→根冠（保护）' },
      { k: '花的结构（最重要）', v: '雄蕊（花药+花丝）、雌蕊（柱头+花柱+子房）；子房→果实，胚珠→种子' },
      { k: '光合作用公式', v: '二氧化碳 + 水 →（光/叶绿体）有机物（储存能量）+ 氧气' },
      { k: '光合作用实质', v: '合成有机物、储存能量、释放氧气' },
      { k: '呼吸作用公式', v: '有机物 + 氧气 →（线粒体）二氧化碳 + 水 + 能量' },
      { k: '光合作用 vs 呼吸作用', v: '光合同化作用（储能），呼吸异化作用（释能）；场所：叶绿体 vs 线粒体' },
      { k: '蒸腾作用意义', v: '①促进水盐运输 ②降低叶片温度 ③促进生物圈水循环' },
      { k: '提高光合作用效率', v: '合理密植、延长光照时间、增加CO₂浓度、温室昼夜温差' },
      { k: '贮存粮食原理', v: '抑制呼吸作用（低温、干燥、充氮、密闭）' },
    ],
  },
  {
    id: 'unit4-key',
    title: '🧠 第四单元核心知识点速记',
    icon: BookOpen,
    color: 'amber',
    items: [
      { k: '新生命起点', v: '受精卵（在输卵管中形成）' },
      { k: '胎儿与母体物质交换', v: '胎盘（注意：不是子宫！）' },
      { k: '青春期的显著特点', v: '身高突增（最重要）；神经系统和心肺功能明显增强' },
      { k: '六大营养物质', v: '糖类（供能）、脂肪（储能）、蛋白质（建造）、水、无机盐、维生素' },
      { k: '缺乏症状速记', v: 'A→夜盲；B₁→脚气病；C→坏血病；D→佝偻病；钙→佝偻病；铁→贫血；碘→甲状腺肿' },
      { k: '消化系统', v: '消化道（口腔→咽→食道→胃→小肠→大肠→肛门）；最大消化腺：肝脏（分泌胆汁）' },
      { k: '小肠适于消化吸收', v: '①长（5-6米）②有皱襞和绒毛（增大面积）③有多种消化液④壁薄（一层细胞）' },
      { k: '血液成分', v: '血浆（运输）；红细胞（运氧，含血红蛋白）；白细胞（防御）；血小板（凝血）' },
      { k: '血管比较', v: '动脉（出心、壁厚、血流快）；静脉（回心、有静脉瓣）；毛细血管（单行通过、物质交换）' },
      { k: '心脏四腔与瓣膜', v: '心房→心室（房室瓣）；心室→动脉（动脉瓣）；左心室壁最厚' },
      { k: '体循环路径', v: '左心室→主动脉→全身毛细血管→上/下腔静脉→右心房（动脉血→静脉血）' },
      { k: '肺循环路径', v: '右心室→肺动脉→肺部毛细血管→肺静脉→左心房（静脉血→动脉血）' },
      { k: '尿液形成', v: '①肾小球过滤（形成原尿，不含大分子蛋白质）②肾小管重吸收（形成终尿）' },
      { k: '原尿 vs 血浆', v: '原尿不含大分子蛋白质；原尿 vs 尿液：尿液不含葡萄糖' },
    ],
  },
  {
    id: 'easy-mistakes',
    title: '⚠️ 高频易错点',
    icon: AlertTriangle,
    color: 'red',
    items: [
      { k: '动脉血 vs 动脉', v: '肺动脉里流的是静脉血！肺静脉里流的是动脉血！别被名字骗了！' },
      { k: '咽是共同通道', v: '咽既是消化道的一部分，也是呼吸道的一部分（食物和空气都经过咽）' },
      { k: '维生素D vs 钙', v: '缺维生素D会影响钙的吸收，导致佝偻病/骨质疏松（二者常常同时缺）' },
      { k: '受精部位', v: '受精发生在输卵管（不是子宫！），受精卵形成后才移动到子宫着床' },
      { k: '呼气 vs 吸气', v: '吸气：肋间肌+膈肌收缩→胸廓扩大→肺内压降低；呼气：相反（肌群舒张）' },
      { k: '排泄 vs 排遗', v: '排泄：排出代谢废物（CO₂、尿素、多余水盐）；排遗：排出食物残渣（粪便）' },
      { k: '血液流经肺部', v: '血液流经肺部毛细血管后：静脉血→动脉血（获得氧气，排出CO₂）' },
      { k: '血液流经肾脏', v: '血液流经肾脏后：动脉血→静脉血（氧气和营养物质被带走，废物进入尿液）' },
    ],
  },
  {
    id: 'experiments',
    title: '🧪 实验探究考点',
    icon: Beaker,
    color: 'purple',
    items: [
      { k: '探究种子萌发条件', v: '对照组：适宜条件下萌发；实验组：缺任一条件不萌发。注意"对照组"的定义' },
      { k: '绿叶在光下制造淀粉', v: '步骤：暗处理（耗尽淀粉）→遮光处理→光照→酒精脱色（隔水加热！）→滴碘液→见光部分变蓝' },
      { k: '二氧化碳是光合作用原料', v: '氢氧化钠溶液吸收CO₂作为对照组；有CO₂组产生淀粉，无CO₂组不产生' },
      { k: '观察小鱼尾鳍', v: '用湿棉絮包裹小鱼（保持鳃湿润）；找红细胞单行通过的血管（毛细血管）' },
      { k: '测定食物中的能量', v: '原理：食物燃烧使水温升高；计算公式：能量 = 水质量×温差×4.2' },
      { k: '比较不同果蔬维生素C', v: '高锰酸钾溶液（紫色）被维生素C还原成无色；滴加至紫色不褪去为止' },
    ],
  },
  {
    id: 'review-tips',
    title: '📌 期末复习策略',
    icon: Lightbulb,
    color: 'sky',
    items: [
      { k: '第一轮：过一遍课本', v: '逐节阅读，理解每个概念，不要死记硬背。配合本网站"知识点"卡片学习' },
      { k: '第二轮：做专项练习', v: '每学完一个小节，做对应的专项练习。错题要弄懂原因' },
      { k: '第三轮：综合练习', v: '学完整个单元后，做综合练习，检验知识连贯性' },
      { k: '第四轮：模拟测试', v: '考前做2-3套模拟题，熟悉题型和时间分配（40题/60分钟）' },
      { k: '重点章节', v: '光合作用/呼吸作用（常考大题）；血液循环（常考图解）；尿液形成（常考流程）' },
    ],
  },
];

export default function SummaryPage() {
  const [expanded, setExpanded] = useState<string | null>('unit3-key');

  const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: 'text-amber-600' },
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'text-red-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', icon: 'text-purple-600' },
    sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-800', icon: 'text-sky-600' },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">📌 核心知识归纳</h1>
        <p className="text-sm text-slate-500 mt-1">期末考前快速复习，掌握全部核心考点</p>
      </div>

      <div className="space-y-4">
        {summarySections.map(section => {
          const isExpanded = expanded === section.id;
          const colors = colorMap[section.color] || colorMap['emerald'];
          const Icon = section.icon;

          return (
            <div key={section.id} className={`bg-white rounded-xl border overflow-hidden ${colors.border}`}>
              <button
                onClick={() => setExpanded(isExpanded ? null : section.id)}
                className={`w-full text-left px-5 py-4 flex items-center gap-3 hover:${colors.bg} transition-colors`}
              >
                <div className={`p-1.5 rounded-lg ${colors.bg}`}>
                  <Icon size={18} className={colors.icon} />
                </div>
                <span className="font-semibold text-slate-800 text-sm flex-1">{section.title}</span>
                <span className="text-slate-400">
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </span>
              </button>

              {isExpanded && (
                <div className={`px-5 pb-5 pt-0 ${colors.bg}`}>
                  <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-3 text-sm ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}
                      >
                        <span className={`font-bold shrink-0 ${colors.icon}`}>{item.k}</span>
                        <span className="text-slate-600 leading-relaxed">：{item.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 期末倒计时提示 */}
      <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
        <h3 className="font-bold text-emerald-800 text-sm mb-3">🎯 考前最后冲刺建议</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-emerald-700">
          <div className="flex items-start gap-2">
            <span>1️⃣</span>
            <span>每天做一套模拟题（40题），计时完成</span>
          </div>
          <div className="flex items-start gap-2">
            <span>2️⃣</span>
            <span>错题本：把每次做错的题记录下来，考前再看一遍</span>
          </div>
          <div className="flex items-start gap-2">
            <span>3️⃣</span>
            <span>看图记知识点：血液循环图解、肾脏结构图解要能默画</span>
          </div>
          <div className="flex items-start gap-2">
            <span>4️⃣</span>
            <span>保证睡眠：考前一晚不要熬夜，大脑需要休息来巩固记忆</span>
          </div>
        </div>
      </div>
    </div>
  );
}
