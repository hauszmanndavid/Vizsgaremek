import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  getItems() {
    return this.items;
  }

  addToCart(item: CartItem) {
    const existing = this.items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
  }

  removeFromCart(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }

  clearCart() {
    this.items = [];
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
