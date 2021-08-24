import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Student } from './member';

export type FileList = {
  [index: string]: number | null | string | undefined | NzUploadFile;
  fid: string;
  filename: string;
  studentSid: number;
  date: string;
  nzUpload: NzUploadFile;
};

export type CommentList = {
  [index: string]: number | null | string | undefined;
  cid: number;
  studentSid: number;
  comment: string;
  date: string;
};
