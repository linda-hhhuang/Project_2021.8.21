import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Request } from '@ta/model/request';

import { Teacher } from '@ta/model/member';
import { MemberService } from '@ta/services/member.service';
import { RequestService } from '@ta/teacher/services/request.service';

@Component({
  selector: 'app-teacher-apply',
  templateUrl: './teacher-apply.component.html',
  styleUrls: ['./teacher-apply.component.css'],
})
export class TeacherApplyComponent implements OnInit {
  requestList: Request[] = [];
  currentDisplayRequestList: Request[] = [];

  currentSelectedRequest!: Request;

  isVisiblePostAgreement = false;
  isOkLoadingPostAgreement = false;

  isVisibleRequestInfo = false;
  isOkLoadingRequestInfo = false;

  searchStatusValue = '';
  visibleSearchStatus = false;

  constructor(
    private memberSrvc: MemberService,
    private requestSrvc: RequestService,
    private message: NzMessageService
  ) {}
  init() {
    this.requestSrvc.getRequest().subscribe((v: any) => {
      this.requestList = v.body;
      this.currentDisplayRequestList = this.requestList;
      this.searchStatusValue = 'false';
      this.searchStatus();
    });
  }

  ngOnInit(): void {
    this.init();
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

  //查看申请信息
  showModalRequestInfo(e: Request) {
    console.log('in RequestInfo ', e);
    this.currentSelectedRequest = e;
    this.isVisibleRequestInfo = true;
  }
  handleOkRequestInfo(): void {
    this.isVisibleRequestInfo = false;
  }

  //删除对此课程的毕业设计
  CancelRequestConfirm(rid: number) {
    this.requestSrvc.deleteRequest(rid).subscribe(() => {
      this.message.success('删除对此课程的毕业设计申请成功!');
      this.init();
    });
  }

  passRequestConfirm(rid: number) {
    this.requestSrvc.passRequest(rid).subscribe((_) => {
      this.message.success('通过此申请执行成功!');
      this.init();
    });
  }

  Cancel() {}
}
