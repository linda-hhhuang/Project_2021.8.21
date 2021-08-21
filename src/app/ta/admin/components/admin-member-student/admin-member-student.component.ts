import { Component, OnInit, Input } from '@angular/core';
import { MemberService } from '@ta/services/member.service';
import { Student, UpdateStudent } from '@ta/model/member';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-admin-member-student',
  templateUrl: './admin-member-student.component.html',
  styleUrls: ['./admin-member-student.component.css'],
})
export class AdminMemberStudentComponent implements OnInit {
  @Input() studentList: Student[] | null = [];
  currentDisplayUserList!: Student[] | null;

  currentSelectedUser!: Student;

  isVisibleShowInfo = false;
  isOkLoadingShowInfo = false;

  isVisibleResetInfo = false;
  isOkLoadingResetInfo = false;

  searchNameValue = '';
  visibleSearchName = false;

  searchSidValue = '';
  visibleSearchSid = false;

  constructor(
    private memberSrvc: MemberService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.memberSrvc.studentList$.subscribe((v) => {
      this.currentDisplayUserList = v;
    });
  }

  showModalShowInfo(e: any) {
    console.log('in ShowInfo ', e);
    this.currentSelectedUser = e;
    this.isVisibleShowInfo = true;
  }
  handleOkShowInfo(): void {
    this.isVisibleShowInfo = false;
  }

  showModalResetInfo(e: any) {
    console.log('in resetRole ', e);
    this.currentSelectedUser = e;
    this.isVisibleResetInfo = true;
  }
  handleOkResetInfo(): void {
    this.isOkLoadingResetInfo = true;
    const resetInfoValue: UpdateStudent = {
      major: this.currentSelectedUser.major,
      info: this.currentSelectedUser.info,
      field: this.currentSelectedUser.field,
      doubleDegree: this.currentSelectedUser.doubleDegree,
      doubleDegreeMajor: this.currentSelectedUser.doubleDegreeMajor,
      doubleDegreeDepartment: this.currentSelectedUser.doubleDegreeDepartment,
      topicName: this.currentSelectedUser.topicName,
      topicType: this.currentSelectedUser.topicType,
      topicSocialExp: this.currentSelectedUser.topicSocialExp,
    };
    this.memberSrvc
      .UpdataStudent(resetInfoValue, this.currentSelectedUser.sid)
      .subscribe((_) => {
        this.message.success(`成功更新学生信息`);
        this.isOkLoadingResetInfo = false;
        this.isVisibleResetInfo = false;
      });
  }
  handleCancelResetInfo(): void {
    this.isVisibleResetInfo = false;
  }

  resetName(): void {
    this.searchNameValue = '';
    this.searchName();
  }
  searchName(): void {
    this.visibleSearchName = false;
    this.currentDisplayUserList = this.studentList!.filter(
      (item: Student) => item.name!.indexOf(this.searchNameValue) !== -1
    );
  }

  resetSid(): void {
    this.searchSidValue = '';
    this.searchSid();
  }
  searchSid(): void {
    this.visibleSearchSid = false;
    this.currentDisplayUserList = this.studentList!.filter(
      (item: Student) => String(item.sid).indexOf(this.searchSidValue) !== -1
    );
  }

  deleteConfirm(user: Student) {
    this.memberSrvc.deleteMember(user.sid).subscribe((_) => {
      this.message.success('删除学生成功!');
    });
  }

  deleteCancel() {}
}
