import { Routes } from '@angular/router';
import { Registration } from './registration/registration';
import { Login } from './login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Registration },
  { path: '**', redirectTo: 'login' },
];
