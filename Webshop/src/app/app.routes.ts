import { Routes } from '@angular/router';
import { Registration } from './registration/registration';
import { Login } from './login/login';
import { HomePage } from './home-page/home-page';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Registration },
  { path: '**', redirectTo: 'login' },
  { path: 'home', component: HomePage},
  { path: '**', redirectTo: 'home' },
];
