import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { MemberService } from '@ta/services/member.service';
import { FileList } from '@ta/model/request';
import { Student } from '@ta/model/member';
@Component({
  selector: 'app-student-upload',
  templateUrl: './student-upload.component.html',
  styleUrls: ['./student-upload.component.css'],
})
export class StudentUploadComponent implements OnInit {
  uploading = false; // 初始值
  fileList: NzUploadFile[] = [];
  displayFileList: FileList[] = [];
  // currentStudnet: Student | null = null;
  currentStatus: number = 3;
  status = ['审核已通过', '审核被拒绝', '等待教务审核'];
  AntdStatus = function (v: number) {
    switch (v) {
      case 0:
        return 'success';
      case 1:
        return 'danger';
      case 2:
        return 'warning';
      default:
        return undefined;
    }
  };

  constructor(
    private message: NzMessageService,
    private memberSrvc: MemberService
  ) {}

  init() {
    this.memberSrvc.fileList$.subscribe((v) => {
      this.displayFileList = v!;
    });
  }
  ngOnInit(): void {
    this.memberSrvc.getUploadFileList().subscribe((_) => {
      this.init();
    });
    this.memberSrvc.getStudentInfo().subscribe((v) => {
      this.currentStatus = v.body.pass;
    });
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    // 对上传文件大小进行限制

    const isLt10M = file.size! / 1024 / 1024 < 10;
    if (!isLt10M) {
      this.message.warning('文件必须在10M以内');
      this.uploading = false;
      this.fileList = [];
      return false;
    }
    this.fileList = this.fileList.concat(file);

    return false;
  };

  handleUpload(): void {
    // 手动上传
    this.fileList.forEach((file: any) => {
      this.uploading = true; // 修改上传按钮状态
      const formData = new FormData();
      formData.append('file', file);

      this.memberSrvc.uploadFile(formData).subscribe((_) => {
        this.uploading = false;
        this.message.success(
          `${file.name} 上传完毕,请在下方检查成功上传的文件`
        );
        this.ngOnInit();
      });
    });
    this.fileList = [];
  }

  deleteUploadConfirm(data: FileList) {
    this.memberSrvc.deleteUpload(data.fid).subscribe((_) => {
      this.init();
      this.message.success(`成功删除 ${data.filename} `);
    });
  }
  deleteUploadCancel() {}
  downloadUpload(data: FileList) {
    this.memberSrvc.studentdownloadUpload(data.fid);
  }

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
