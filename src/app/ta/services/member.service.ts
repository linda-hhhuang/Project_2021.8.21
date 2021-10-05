import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { ApiService } from '@core/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '@core/service/user.service';
import { Student } from '@ta/model/member';
import { FileList } from '@ta/model/request';
@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private studentList = new BehaviorSubject<Student[] | null>(null);
  studentList$ = this.studentList.asObservable();

  private currentStudent = new BehaviorSubject<Student | null>(null);
  currentStudent$ = this.currentStudent.asObservable();

  private fileList = new BehaviorSubject<FileList[] | null>(null);
  fileList$ = this.fileList.asObservable();

  constructor(
    @SkipSelf()
    @Optional()
    memberSrvc: MemberService,
    private userSrvc: UserService,
    private api: ApiService,
    private notify: NzNotificationService
  ) {
    if (memberSrvc) {
      throw new Error(
        'You should not import MemberService which is already imported in root!'
      );
    }
  }

  //教务端
  memberlistInit() {
    return this.api.get<any>(`/eduadmin/list`).pipe(
      tap({
        next: (response) => {
          this.studentList.next(response.body);
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  deleteMember(sid: number) {
    return this.api.delete<any>(`/eduadmin/${sid}`).pipe(
      tap({
        next: (response) => {
          this.memberlistInit().subscribe();
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  getStudent(sid: number) {
    return this.api.get<any>(`/eduadmin/${sid}`).pipe(
      tap({
        next: (response) => {
          this.currentStudent.next(response.body);
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  passUpload(sid: number) {
    return this.api.put<any>(`/eduadmin/${sid}/pass`, null).pipe(
      tap({
        next: (response) => {
          this.memberlistInit().subscribe();
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  rejectUpload(sid: number, comment: string) {
    return this.api
      .put<any>(`/eduadmin/${sid}/reject`, {
        studentSid: sid,
        comment: comment,
      })
      .pipe(
        tap({
          next: (response) => {
            this.memberlistInit().subscribe();
          },
          error: (err) => {
            this.handleError(err.error.msg);
          },
        })
      );
  }

  getUploadList(sid: number) {
    return this.api.get<any>(`/eduadmin/${sid}/files`).pipe(
      tap({
        next: (response) => {
          this.fileList.next(response.body);
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  getUploadFile(sid: number, fid: number) {
    window.location.href = `/api/eduadmin/${sid}/files/${fid}`;
    // return this.api.get<any>(`/eduadmin/${sid}/files/${fid}`).pipe(
    //   tap({
    //     next: (response) => {
    //       // this.fileList.next(response.body);
    //       //
    //     },
    //     error: (err) => {
    //       this.handleError(err.error.msg);
    //     },
    //   })
    // );
  }

  sendComment(sid: number, comment: string) {
    return this.api
      .put<any>(`/eduadmin/comments`, {
        studentSid: sid,
        comment: comment,
      })
      .pipe(
        tap({
          next: (response) => {},
          error: (err) => {
            this.handleError(err.error.msg);
          },
        })
      );
  }

  getComment(sid: number) {
    return this.api.get<any>(`/eduadmin/${sid}/comments`).pipe(
      tap({
        next: (response) => {},
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  admindownloadUpload(sid: number, fid: string) {
    window.location.href = `/api/eduadmin/${sid}/files/${fid}`;
  }

  //学生端
  getStudentInfo() {
    return this.api.get<any>('/student/me').pipe(
      tap({
        next: (response) => {
          this.currentStudent.next(response.body);
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  updateStudentInfo(update: Student) {
    return this.api
      .put<any>('student/me', {
        sign: update.sign,
        phone: update.phone,
      })
      .pipe(
        tap({
          next: (response) => {
            this.currentStudent.next(response.body);
          },
          error: (err) => {
            this.handleError(err.error.msg);
          },
        })
      );
  }

  uploadFile(data: FormData) {
    return this.api.post<any>('/student/me/files', data).pipe(
      tap({
        next: (response) => {
          this.getUploadFileList().subscribe();
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  getUploadFileList() {
    return this.api.get<any>('/student/me/files').pipe(
      tap({
        next: (response) => {
          this.fileList.next(response.body);
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  deleteUpload(fid: string) {
    return this.api.delete<any>(`/student/me/files/${fid}`).pipe(
      tap({
        next: (response) => {
          this.getUploadFileList().subscribe();
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  studentdownloadUpload(fid: string) {
    window.location.href = `/api/student/me/files/${fid}`;
  }

  studentGetComment() {
    return this.api.get<any>(`/student/me/comments`).pipe(
      tap({
        next: (response) => {},
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  //all
  private handleError(error: string) {
    this.notify.error('错误', error);
    if (error == '未登录') {
      location.reload();
    }
  }
}
