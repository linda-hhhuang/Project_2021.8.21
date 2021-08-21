import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Request } from '@ta/model/request';
import { RequestService } from '@ta/admin/services/request.service';

@Component({
  selector: 'app-admin-operation',
  templateUrl: './admin-operation.component.html',
  styleUrls: ['./admin-operation.component.css'],
})
export class AdminOperationComponent implements OnInit {
  requestList: Request[] | null = [];
  currentDisplayRequestList!: Request[] | null;

  currentSelectedRequest!: Request;

  isVisibleShowInfo = false;
  isOkLoadingShowInfo = false;

  searchSidValue = '';
  visibleSearchSid = false;

  searchStatusValue = '';
  visibleSearchStatus = false;

  constructor(
    private requestSrvc: RequestService,
    private message: NzMessageService
  ) {}

  //留个小坑,看要不要用obs来快速加载
  init() {
    this.requestSrvc.getRequest().subscribe((v) => {
      console.log('in admin-operation ngoninit', v);
      this.currentDisplayRequestList = v.body;
      this.requestList = v.body;
      this.searchStatusValue = 'false';
      this.searchStatus();
    });
  }
  ngOnInit(): void {
    this.init();
  }

  showModalShowInfo(e: Request) {
    console.log('in ShowInfo ', e);
    this.currentSelectedRequest = e;
    this.isVisibleShowInfo = true;
  }
  handleOkShowInfo(): void {
    this.isVisibleShowInfo = false;
  }

  resetSid(): void {
    this.searchSidValue = '';
    this.searchSid();
  }
  searchSid(): void {
    this.visibleSearchSid = false;
    this.currentDisplayRequestList = this.requestList!.filter(
      (item: Request) => String(item.sid).indexOf(this.searchSidValue) !== -1
    );
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

  deleteConfirm(request: Request) {
    this.requestSrvc.deleRequest(request.rid).subscribe((_) => {
      this.message.success('不通过此申请执行成功!');
      this.init();
    });
  }

  passConfirm(request: Request) {
    this.requestSrvc.passRequest(request.rid).subscribe((_) => {
      this.message.success('通过此申请执行成功!');
      this.init();
    });
  }

  Cancel() {}
}
