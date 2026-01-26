import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { Login } from './login/login';
import { Registration } from './registration/registration';
import { Cart } from './cart/cart';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomePage },
  { path: 'login', component: Login },
  { path: 'register', component: Registration },
  { path: 'cart', component: Cart },

  { path: '**', redirectTo: 'home' }
];
