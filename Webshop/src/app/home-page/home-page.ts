import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, NavBar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
    category = '';
    model = '';
    minPrice = '';
    maxPrice = '';

private route= inject(Router);

    onSearch() {
      this.route.navigate(['/search'] , {
        queryParams: {
          category: this.category,
          model: this.model,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
        }
      });
    }
}
