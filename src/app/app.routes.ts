import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },

  {
    path: 'authentication',
    canActivate: [() => inject(NoAuthGuard).canActivate()],
    loadComponent: () =>
      import('./components/authentication/authentication/authentication.component')
        .then(m => m.AuthenticationComponent)
  },
  {
    path: 'login',
    canActivate: [() => inject(NoAuthGuard).canActivate()],
    loadComponent: () =>
      import('./components/login/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    canActivate: [() => inject(NoAuthGuard).canActivate()],
    loadComponent: () =>
      import('./components/sign_up/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'social-home',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import('./components/Home_page/social-home/social-home.component')
        .then(m => m.SocialHomeComponent)
  },

  { path: '**', redirectTo: '/authentication', pathMatch: 'full' }
];

