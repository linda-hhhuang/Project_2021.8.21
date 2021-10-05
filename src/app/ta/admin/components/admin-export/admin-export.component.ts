import { Component, OnInit } from '@angular/core';
import { MemberService } from '@ta/services/member.service';
import { Student } from '@ta/model/member';
@Component({
  selector: 'app-admin-export',
  templateUrl: './admin-export.component.html',
  styleUrls: ['./admin-export.component.css'],
})
export class AdminExportComponent implements OnInit {
  constructor(private memberSrvc: MemberService) {}
  isLoading = false;
  ngOnInit(): void {}

  exportCvs() {
    this.isLoading = true;
    let title = ['姓名', '准考证号', '性别', '联系电话', '初试分数'];
    let titleForKey = ['name', 'sid', 'sex', 'phone', 'score1'];
    this.memberSrvc.memberlistInit().subscribe((v) => {
      this.isLoading = false;

      let data = v.body
        .filter((n: Student) => n.pass == 0)
        .map((v: Student) => {
          return {
            name: v.name,
            sid: v.sid,
            sex: v.sex,
            phone: v.phone,
            score1: v.score1,
          };
        });
      let str = [];
      str.push(title.join(',') + '\n');
      for (let i = 0; i < data.length; i++) {
        let temp: any[] = [];
        for (let j = 0; j < titleForKey.length; j++) {
          if (j == 1 || j == 3) temp.push('\t' + data[i][titleForKey[j]]);
          else temp.push(data[i][titleForKey[j]]);
        }
        str.push(temp.join(',') + '\n');
      }
      let uri =
        'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str.join(''));
      let downloadLink = document.createElement('a');
      downloadLink.href = uri;
      downloadLink.download =
        new Date().toISOString().substring(0, 10) + '-已通过审核学生名单.csv';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }
}
