import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentMainComponent } from './components/student-main/student-main.component';
import { StudentPersonalComponent } from './components/student-personal/student-personal.component';
import { StudentCommentComponent } from './components/student-comment/student-comment.component';
import { StudentScoreComponent } from './components/student-score/student-score.component';
import { StudentUploadComponent } from './components/student-upload/student-upload.component';
const routes: Routes = [
  {
    path: '',
    component: StudentMainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: StudentHomeComponent },
      {
        path: 'personal',
        component: StudentPersonalComponent,
      },
      {
        path: 'comment',
        component: StudentCommentComponent,
      },
      {
        path: 'score',
        component: StudentScoreComponent,
      },
      {
        path: 'upload',
        component: StudentUploadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
