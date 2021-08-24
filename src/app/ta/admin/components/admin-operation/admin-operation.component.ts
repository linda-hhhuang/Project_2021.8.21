import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MemberService } from '@ta/services/member.service';
import { Student } from '@ta/model/member';
import { FileList } from '@ta/model/request';
import { CommentList } from '@ta/model/request';

@Component({
  selector: 'app-admin-operation',
  templateUrl: './admin-operation.component.html',
  styleUrls: ['./admin-operation.component.css'],
})
export class AdminOperationComponent implements OnInit {
  studentList: Student[] | null = [];
  currentDisplayStudentList!: Student[] | null;

  currentSelectedStudent!: Student;

  fileList: FileList[] | null = [];

  commentValue: string = '无评论';
  commentList: CommentList[] | null = [];
  isReject = false;

  isVisibleShowInfo = false;
  isOkLoadingShowInfo = false;

  isVisibleShowUpload = false;
  isOkLoadingShowUpload = false;

  isVisibleShowComment = false;
  isOkLoadingShowComment = false;

  searchSidValue = '';
  visibleSearchSid = false;

  searchStatusValue = '';
  visibleSearchStatus = false;
  Status(n: number) {
    if (n == 0) return '审核通过';
    else if (n == 1) return '已拒绝';
    else if (n == 2) return '等待审核';
    else return '状态错误!';
  }

  constructor(
    private memberSrvc: MemberService,
    private message: NzMessageService
  ) {}

  init() {
    this.memberSrvc.studentList$.subscribe((v) => {
      this.studentList = v;
      this.currentDisplayStudentList = v;
    });
  }

  ngOnInit(): void {
    this.memberSrvc.memberlistInit().subscribe((_) => {
      this.init();
    });
  }

  showModalShowInfo(e: Student) {
    console.log('in ShowInfo ', e);
    this.memberSrvc.getStudent(e.sid).subscribe((v) => {
      this.currentSelectedStudent = v.body;
      this.isVisibleShowInfo = true;
    });
  }
  handleOkShowInfo(): void {
    this.isVisibleShowInfo = false;
  }

  showModalShowComment(e: Student) {
    console.log('in ShowComment ', e);
    this.currentSelectedStudent = e;
    this.commentValue = '无评论';
    this.memberSrvc.getComment(e.sid).subscribe((v) => {
      this.commentList = v.body;
      this.isVisibleShowComment = true;
    });
  }
  handleOkShowComment(): void {
    this.isVisibleShowComment = false;
    this.commentValue = '无评论';
  }

  showModalShowUpload(e: Student) {
    console.log('in ShowUpload ', e);
    this.currentSelectedStudent = e;
    this.isReject = false;
    this.commentValue = '无评论';
    this.memberSrvc.getUploadList(e.sid).subscribe((v) => {
      this.fileList = v.body;
      this.isVisibleShowUpload = true;
    });
  }
  handleOkShowUpload(): void {
    this.isVisibleShowUpload = false;
    this.isReject = false;
    this.commentValue = '无评论';
  }

  resetSid(): void {
    this.searchSidValue = '';
    this.searchSid();
  }
  searchSid(): void {
    this.visibleSearchSid = false;
    this.currentDisplayStudentList = this.studentList!.filter(
      (item: Student) => String(item.sid).indexOf(this.searchSidValue) !== -1
    );
  }

  //按状态搜索
  resetStatus(): void {
    this.searchStatusValue = '';
    this.searchStatus();
  }
  searchStatus(): void {
    this.visibleSearchStatus = false;
    this.currentDisplayStudentList = this.studentList!.filter(
      (item: Student) =>
        String(item.pass!).indexOf(this.searchStatusValue) !== -1
    );
  }

  deleteConfirm(student: Student) {
    this.memberSrvc.deleteMember(student.sid).subscribe((_) => {
      this.message.success(`删除学生 ${student.name} 成功!`);
      this.ngOnInit();
    });
  }

  getStudentUpload(student: Student) {
    this.memberSrvc.getUploadList(student.sid).subscribe((v) => {
      this.fileList = v.body;
    });
  }

  pass(student: Student) {
    this.memberSrvc.passUpload(student.sid).subscribe((_) => {
      this.message.success(`成功通过学生 ${student.name} 的材料审核`);
      this.ngOnInit();
      this.isVisibleShowUpload = false;
    });
  }

  reject(student: Student, comment: string) {
    this.memberSrvc.rejectUpload(student.sid, comment).subscribe((_) => {
      this.message.success(`成功拒绝学生 ${student.name} 的材料审核`);
      this.ngOnInit();
      this.isVisibleShowUpload = false;
    });
  }

  comment(student: Student, comment: string) {
    this.memberSrvc.sendComment(student.sid, comment).subscribe((_) => {
      this.message.success(`成功给学生 ${student.name} 发送评论`);
      this.commentValue = '无评论';
      this.memberSrvc.getComment(student.sid).subscribe((v) => {
        this.commentList = v.body;
      });
    });
  }

  downloadUpload(data: FileList) {
    this.memberSrvc.admindownloadUpload(data.studentSid, data.fid);
  }

  Cancel() {}

  formatDateTime(dateString: string) {
    const date = new Date(dateString);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let mm = m < 10 ? '0' + m : m;
    let d = date.getDate();
    let dd = d < 10 ? '0' + d : d;
    let h = date.getHours();
    let hh = h < 10 ? '0' + h : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let minuteS = minute < 10 ? '0' + minute : minute;
    let secondS = second < 10 ? '0' + second : second;
    return y + '-' + mm + '-' + dd + ' ' + hh + ':' + minuteS + ':' + secondS;
  }
}
