import { Component, OnInit } from '@angular/core';
import { CommentList } from '@ta/model/request';
import { MemberService } from '@ta/services/member.service';

@Component({
  selector: 'app-student-comment',
  templateUrl: './student-comment.component.html',
  styleUrls: ['./student-comment.component.css'],
})
export class StudentCommentComponent implements OnInit {
  commentList: CommentList[] | null = [];
  constructor(private memberSrvc: MemberService) {}

  ngOnInit(): void {
    this.memberSrvc.studentGetComment().subscribe((v) => {
      this.commentList = v.body;
    });
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
