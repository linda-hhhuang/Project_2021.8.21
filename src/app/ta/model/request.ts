import { Student, Teacher } from './member';

export type Request = {
  [index: string]:
    | number
    | null
    | string
    | undefined
    | boolean
    | Student
    | Teacher;
  rid: number;
  isDeleted: boolean; // 被删除
  pass: boolean; // 教师是否通过
  manual: boolean; // 是否本校教师
  manualTeacher: string; // 外校教师的姓名（以及描述之类，显示在“姓名”中）
  Student: Student;
  studentSid: number;
  Teacher: Teacher;
  teacherSid: number;
};
