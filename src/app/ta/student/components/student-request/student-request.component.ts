import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MemberService } from '@ta/services/member.service';
import { RequestService } from '@ta/student/services/request.service';

@Component({
  selector: 'app-student-request',
  templateUrl: './student-request.component.html',
  styleUrls: ['./student-request.component.css'],
})
export class StudentRequestComponent implements OnInit {
  isVisibleInner = false;
  isOkLoadingInner = false;

  isVisibleOuter = false;
  isOkLoadingOuter = false;

  isVisibleOuterWarning = false;

  currentInnerRequest: number | null = null;
  currentOuterRequest: string | null = null;

  constructor(
    private requestSrvc: RequestService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {}

  //系统内课程
  showModalInner(): void {
    this.isVisibleInner = true;
  }
  handleOkInner(): void {
    this.isOkLoadingInner = true;
    this.requestSrvc
      .createRequestInner(this.currentInnerRequest!)
      .subscribe((_) => {
        this.isOkLoadingInner = false;
        this.isVisibleInner = false;
        this.message.success('成功发出毕业设计申请!');
        this.currentInnerRequest = null;
      });
  }
  handleCancelInner(): void {
    this.isVisibleInner = false;
    this.isOkLoadingInner = false;
    this.currentInnerRequest = null;
  }

  //系统外教师
  showModalOuter(): void {
    this.showModalOuterWarning();
  }
  handleOkOuter(): void {
    this.isOkLoadingOuter = true;
    this.requestSrvc
      .createRequestOuter(this.currentOuterRequest!)
      .subscribe((_) => {
        this.isOkLoadingOuter = false;
        this.isVisibleOuter = false;
        this.message.success('成功发出毕业设计申请!');
        this.currentOuterRequest = null;
      });
  }
  handleCancelOuter(): void {
    this.isVisibleOuter = false;
    this.isOkLoadingOuter = false;
    this.currentOuterRequest = null;
  }

  //系统外提醒
  showModalOuterWarning(): void {
    this.isVisibleOuterWarning = true;
  }
  handleOkOuterWarning(): void {
    this.isVisibleOuterWarning = false;
    this.isVisibleOuter = true;
  }
  handleCancelOuterWarning(): void {
    this.isVisibleOuterWarning = false;
  }
}
