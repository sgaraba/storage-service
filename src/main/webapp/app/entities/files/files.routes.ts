import { Routes } from '@angular/router';
import {FilesComponent} from "./list/files";

const filesRoutes: Routes = [
  {
    path: '',
    component: FilesComponent,
  },
];

export default filesRoutes;
