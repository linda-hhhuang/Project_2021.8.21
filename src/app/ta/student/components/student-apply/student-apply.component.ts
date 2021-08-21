import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Request } from '@ta/model/request';
import { Student, Teacher } from '@ta/model/member';
import { MemberService } from '@ta/services/member.service';
import { RequestService } from '@ta/student/services/request.service';

@Component({
  selector: 'app-student-apply',
  templateUrl: './student-apply.component.html',
  styleUrls: ['./student-apply.component.css'],
})
export class StudentApplyComponent implements OnInit {
  requestList: Request[] = [];
  currentDisplayRequestList: Request[] = [];

  resetTeacherName: string = '';

  currentSelectedRequest!: Request;

  isVisiblePostAgreement = false;
  isOkLoadingPostAgreement = false;

  isVisibleShowAgreement = false;
  isOkLoadingShowAgreement = false;

  searchStatusValue = '';
  visibleSearchStatus = false;

  constructor(
    private memberSrvc: MemberService,
    private requestSrvc: RequestService,
    private message: NzMessageService
  ) {}
  init() {
    this.requestSrvc.requestList$.subscribe((v) => {
      this.requestList = v!;
      this.currentDisplayRequestList = this.requestList;
      this.searchStatusValue = 'false';
      this.searchStatus();
    });
  }

  ngOnInit(): void {
    this.requestSrvc.getRequest().subscribe((v) => {
      this.init();
    });
  }

  //按状态搜索
  resetStatus(): void {
    this.searchStatusValue = '';
    this.searchStatus();
  }
  searchStatus(): void {
    this.visibleSearchStatus = false;
    this.currentDisplayRequestList = this.requestList!.filter(
      (item: Request) =>
        String(item.isDeleted!).indexOf(this.searchStatusValue) !== -1
    );
  }

  //更新教师
  showModalPostAgreement(e: Request) {
    console.log('in PostAgreement ', e);
    this.resetTeacherName = e.manualTeacher;
    this.isVisiblePostAgreement = true;
  }
  handleOkPostAgreement(): void {
    this.isOkLoadingPostAgreement = true;
    console.log(
      'in student-apply handleOkPostAgreement',
      this.currentSelectedRequest
    );
    this.requestSrvc.updateRequest(this.resetTeacherName).subscribe(() => {
      this.isVisiblePostAgreement = false;
      this.message.success('更改校外教师姓名成功!');
      this.isOkLoadingPostAgreement = false;
    });
  }
  handleCancelPostAgreement(): void {
    this.isVisiblePostAgreement = false;
  }

  //查看毕业设计工作协议
  showModalShowAgreement(e: Request) {
    console.log('in ShowAgreement ', e);
    this.currentSelectedRequest = e;
    this.isVisibleShowAgreement = true;
  }
  handleOkShowAgreement(): void {
    this.isVisibleShowAgreement = false;
  }

  CancelRequestConfirm(rid: number) {
    this.requestSrvc.deleteRequest(rid).subscribe(() => {
      this.message.success('删除此申请成功!');
      this.init();
    });
  }

  Cancel() {}
}
