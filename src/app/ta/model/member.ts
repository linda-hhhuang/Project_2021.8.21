export interface Student {
  [index: string]: number | null | string | undefined | boolean | Request[];
  sid: number; // 准考证号
  name: string; // 姓名
  sex: string; // 性别
  phone: string; // 电话
  score1: string; // 初试分数
  score2: string; // 复试分数
  result?: string; // 录取结果
  // sign?: string; // 签名
  pass: number; // 材料审核状态
  // Pass; 教务审核后合格
  // Reject; 教务审核后觉得有问题
  // Wait; 等待教务审核
}
