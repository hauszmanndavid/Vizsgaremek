import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule, NavBar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
