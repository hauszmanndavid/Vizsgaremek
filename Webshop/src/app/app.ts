import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Login } from "./login/login";
import { Registration } from './registration/registration';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Login, Registration, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Webshop');
}
