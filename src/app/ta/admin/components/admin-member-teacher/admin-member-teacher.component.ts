import { Component, OnInit, Input } from '@angular/core';
import { MemberService } from '@ta/services/member.service';
import { Teacher } from '@ta/model/member';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-member-teacher',
  templateUrl: './admin-member-teacher.component.html',
  styleUrls: ['./admin-member-teacher.component.css'],
})
export class AdminMemberTeacherComponent implements OnInit {
  @Input() teacherList: Teacher[] | null = [];
  currentDisplayUserList!: Teacher[] | null;

  currentSelectedUser!: Teacher;

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
    this.memberSrvc.teacherList$.subscribe((v) => {
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
    const resetInfoValue = {
      contact: this.currentSelectedUser.contact,
      institute: this.currentSelectedUser.institute,
      department: this.currentSelectedUser.department,
      organization: this.currentSelectedUser.organization,
      job: this.currentSelectedUser.job,
      direction: this.currentSelectedUser.direction,
      maxRes: this.currentSelectedUser.maxRes,
    };
    this.memberSrvc
      .UpdataTeacher(resetInfoValue, this.currentSelectedUser.sid)
      .subscribe((_) => {
        this.message.success(`成功更新教师信息`);
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
    this.currentDisplayUserList = this.teacherList!.filter(
      (item: Teacher) => item.name!.indexOf(this.searchNameValue) !== -1
    );
  }

  resetSid(): void {
    this.searchSidValue = '';
    this.searchSid();
  }
  searchSid(): void {
    this.visibleSearchSid = false;
    this.currentDisplayUserList = this.teacherList!.filter(
      (item: Teacher) => String(item.sid).indexOf(this.searchSidValue) !== -1
    );
  }

  deleteConfirm(user: Teacher) {
    this.memberSrvc.deleteMember(user.sid).subscribe((_) => {
      this.message.success('删除教师成功!');
    });
  }

  deleteCancel() {}
}
