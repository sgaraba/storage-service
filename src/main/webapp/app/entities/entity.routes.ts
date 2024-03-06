import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'files',
    title: 'files.home',
    loadChildren: () => import('./files/files.routes'),
    data: { breadcrumb: { skip: true } }
  },
  {
    path: 'document',
    data: {
      pageTitle: 'storageServiceApp.document.home.title',
      breadcrumb: "global.menu.sidebar.personalDocuments"
    },
    loadChildren: () => import('./document/document.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
