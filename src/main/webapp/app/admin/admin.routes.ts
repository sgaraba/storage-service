import { Routes } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */


const routes: Routes = [
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.route'),
    title: 'userManagement.home.title',
  },
  {
    path: 'docs',
    loadComponent: () => import('./docs/docs.component'),
    title: 'global.menu.admin.apidocs',
  },
  {
    path: 'logs',
    loadComponent: () => import('./logs/logs.component'),
    title: 'logs.title',
  },
  /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
];

export default routes;
