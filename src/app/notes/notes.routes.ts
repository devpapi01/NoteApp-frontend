import { Routes } from '@angular/router';
import { authGuard } from '../auth-guard';

export default [
  {
    path: 'notes',
    loadComponent: () => import('./listenotes/listenotes').then((module) => module.Listenotes),
    canActivate: [authGuard],
  },
  {
    path: 'notes/new',
    loadComponent: () => import('./editnote/editnote').then((module) => module.Editnote),
    canActivate: [authGuard],
  },
  {
    path: 'p',
    loadComponent: () => import('./public-list/public-list').then((module) => module.PublicList),
  },
  {
    path: 'shared',
    loadComponent: () => import('./shared-list/shared-list').then((module) => module.SharedList),
  },
  {
    path: 'notes/:id',
    loadComponent: () => import('./editnote/editnote').then((module) => module.Editnote),
    canActivate: [authGuard],
  },
  {
    path: 'p/:token',
    loadComponent: () => import('./public-note/public-note').then((module) => module.PublicNote),
  },
] as Routes;
