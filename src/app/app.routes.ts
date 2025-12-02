import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',

    loadComponent: () => import('./app-bar/app-bar').then((module) => module.AppBar),
    children: [
      {
        path: '',
        loadChildren: () => import('./notes/notes.routes'),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((module) => module.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((module) => module.Register),
  },
];
