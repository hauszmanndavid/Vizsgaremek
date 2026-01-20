import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NavBar],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {

  product = {
    images: [
      'assets/image1.jpg',
      'assets/image2.jpg',
      'assets/image3.jpg'
    ],
    price: 2999,
    description: 'Ez egy részletes leírás a termékről.'
  };
  images = this.product.images;
  currentImageIndex: number = 0;

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  addToFavorites() {
    console.log('Hozzáadva a kedvencekhez');
  }

  addToCart() {
    console.log('Hozzáadva a kosárhoz');
  }
}
