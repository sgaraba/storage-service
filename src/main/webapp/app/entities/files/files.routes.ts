import { Routes } from '@angular/router';
import {FilesComponent} from "./list/files.component";
import { UploadComponent } from './upload/upload.component';

const filesRoutes: Routes = [
  {
    path: 'list',
    component: FilesComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'upload',
    component: UploadComponent,
  }
];

export default filesRoutes;
