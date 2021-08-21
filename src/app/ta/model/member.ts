import { Request } from './request';

export interface Student {
  [index: string]: number | null | string | undefined | boolean | Request[];
  sid: number; // 学号
  name: string; // 姓名
  major: string; // 专业
  department: string; // 院系
  info: string; // 个人介绍
  field: string; // 学科门类
  doubleDegree: boolean; // 是否双学位
  doubleDegreeMajor: string; // 双学位所在专业
  doubleDegreeDepartment: string; // 双学位所在院系
  maxReq: number; // 最大申请数
  topicName: string; // 论文选题
  topicType: string; // 论文选题类型
  topicSocialExp: boolean; // 是否社会实践类
  Requests?: Request[];
}

export interface Teacher {
  [index: string]: number | null | string | undefined | Request[];
  sid: number; // 工号
  name: string; // 姓名
  contact: string; // 联系方式
  institute: string; // 研究所
  department: string; // 院系
  organization: string; // 单位
  job: string; // 职称
  direction: string; // 研究方向
  maxRes: number; // 招收学生数
  Request?: Request[];
}

export interface UpdateTeacher {
  [index: string]: number | null | string | boolean;
  contact: string; // 联系方式
  institute: string; // 研究所
  department: string; // 院系
  organization: string; // 单位
  job: string; // 职称
  direction: string; // 研究方向
  maxRes: number; // 招收学生数
}

export interface UpdateStudent {
  [index: string]: number | null | string | boolean;
  major: string; // 专业
  info: string; // 个人介绍
  field: string; // 学科门类
  doubleDegree: boolean; // 是否双学位
  doubleDegreeMajor: string; // 双学位所在专业
  doubleDegreeDepartment: string; // 双学位所在院系
  topicName: string; // 论文选题
  topicType: string; // 论文选题类型
  topicSocialExp: boolean; // 是否社会实践类
}
