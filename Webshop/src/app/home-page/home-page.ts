import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  cartService: any;

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

    addToCart() {
  this.cartService.addToCart({
    id: 1,
    name: '6 sebességes váltógomb',
    price: 13570,
    image: 'https://via.placeholder.com/100',
    quantity: 1
  });
}
}
