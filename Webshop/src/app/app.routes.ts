import { Routes } from '@angular/router';
import { Registration } from './registration/registration';
import { Login } from './login/login';
import { HomePage } from './home-page/home-page';
import { SearchResult } from './search-result/search-result';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomePage },
  { path: 'login', component: Login },
  { path: 'register', component: Registration },
  { path: 'search', component:  SearchResult},

  { path: '**', redirectTo: 'home' }
]
