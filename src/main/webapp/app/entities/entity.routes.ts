import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'files',
    loadChildren: () => import('./files/files.routes'),
    title: 'files.home',
  },
];

export default routes;
