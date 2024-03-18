import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'files',
    title: 'files.home',
    loadChildren: () => import('./files/files.routes'),
    data: { breadcrumb: "global.menu.sidebar.storage" }
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
