import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBar } from '../nav-bar/nav-bar';
import { CartService } from '../services/cart-service';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, NavBar],
  templateUrl: './search-result.html',
  styleUrl: './search-result.css'
})
export class SearchResult implements OnInit {
  result: any[] = [];
  query = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.http.get<any[]>(`http://localhost:8080/api/products/search?name=${encodeURIComponent(this.query)}`).subscribe({
          next: (data) => {
            this.result = data;
          },
          error: (err) => console.error(err)
        });
      } else {
        this.result = [];
      }
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}