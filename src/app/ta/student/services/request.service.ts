import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { ApiService } from '@core/service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { Request } from '@ta/model/request';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  requestList = new BehaviorSubject<Request[] | null>(null);
  requestList$ = this.requestList.asObservable();

  constructor(
    @SkipSelf()
    @Optional()
    requestSrvc: RequestService,
    private api: ApiService,
    private notify: NzNotificationService
  ) {
    if (requestSrvc) {
      throw new Error(
        'You should not import requestSrvc which is already imported in root!'
      );
    }
  }

  getRequest() {
    return this.api.get<any>('/request/student').pipe(
      tap({
        next: (response) => {
          this.requestList.next(response.body.Requests);
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  deleteRequest(rid: number) {
    return this.api.delete<any>(`/request/student/${rid}`).pipe(
      tap({
        next: (response) => {
          this.getRequest().subscribe();
        },
        error: (err) => {
          this.handleError(err.error.msg);
        },
      })
    );
  }

  createRequestInner(teacher: number) {
    return this.api
      .post<any>('/request/student/add-inner', {
        teacher: teacher,
      })
      .pipe(
        tap({
          next: (response) => {
            this.getRequest().subscribe();
          },
          error: (err) => {
            this.handleError(err.error.msg);
          },
        })
      );
  }

  createRequestOuter(teacher: string) {
    return this.api
      .post<any>('/request/student/add-outer', {
        manualTeacher: teacher,
      })
      .pipe(
        tap({
          next: (response) => {
            this.getRequest().subscribe();
          },
          error: (err) => {
            this.handleError(err.error.msg);
          },
        })
      );
  }

  //Outer
  updateRequest(teacher: string) {
    return this.api
      .put<any>('/request/student/add-outer', {
        manualTeacher: teacher,
      })
      .pipe(
        tap({
          next: (response) => {
            this.getRequest().subscribe();
          },
          error: (err) => {
            this.handleError(err.error.msg);
          },
        })
      );
  }

  private handleError(error: string) {
    this.notify.error('??????', error);
    if (error == '?????????') {
      location.reload();
    }
  }
}
