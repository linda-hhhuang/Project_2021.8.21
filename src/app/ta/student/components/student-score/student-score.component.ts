import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MemberService } from '@ta/services/member.service';
import { Student } from '@ta/model/member';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-student-score',
  templateUrl: './student-score.component.html',
  styleUrls: ['./student-score.component.css'],
})
export class StudentScoreComponent implements OnInit {
  isVisibleScore = false;
  isOkLoadingScore = false;

  currentStudentInfo!: Student;

  constructor(
    private memberSrvc: MemberService,
    private message: NzMessageService
  ) {}

  init() {
    this.memberSrvc.getStudentInfo().subscribe((student) => {
      this.currentStudentInfo = student.body;
      console.log('in student-personal ngOnInit, data is ', student);
    });
  }
  ngOnInit(): void {
    this.init();
  }

  //查看成绩
  showModalScore(): void {
    this.memberSrvc.currentStudent$
      .pipe(filter((v) => v != null))
      .subscribe((v) => {
        console.log('in showModalScore', v);
        this.isVisibleScore = true;
        this.currentStudentInfo = v!;
      });
  }
  handleOkScore(): void {
    this.isVisibleScore = false;
  }
}
