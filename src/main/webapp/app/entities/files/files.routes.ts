import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { FilesComponent } from "./list/files.component";
import { UploadComponent } from './upload/upload.component';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { FileModel } from './file.model';
import { FileService } from './service/file.service';
import { FilesDetailComponent } from './detail/detail.componenet';

export const FileResolve: ResolveFn<FileModel | null> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('idFile');
  if (id) {
    return inject(FileService).find(parseInt(id, 10));
  }
  return of(null);
};

const filesRoutes: Routes = [
  {
    path: '',
    component: FilesComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'upload',
    component: UploadComponent,
    data: {
      defaultSort: 'id,asc',
      breadcrumb: "files.buttons.upload"
    },
  },
  {
    path: ':idFile/detail',
    component: FilesDetailComponent,
    resolve: {
      file: FileResolve
    },
    data: {
      breadcrumb: "entity.action.view"
    }
  }
];

export default filesRoutes;
