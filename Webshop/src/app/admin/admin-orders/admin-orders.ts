import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBar } from '../../nav-bar/nav-bar';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavBar],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrders implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.http.get<any[]>('http://localhost:8080/api/admin/orders').subscribe({
      next: (data) => {
        this.orders = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  updateStatus(order: any) {
    this.http.put(`http://localhost:8080/api/admin/orders/${order.id}/status`,
      order.status, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' }).subscribe({
      next: () => alert('Státusz frissítve!'),
      error: (err) => console.error(err)
    });
  }

  deleteOrder(id: number) {
    if (confirm('Biztosan törli a rendelést?')) {
      this.http.delete(`http://localhost:8080/api/admin/orders/${id}`, { responseType: 'text' }).subscribe({
        next: () => this.loadOrders(),
        error: (err) => console.error(err)
      });
    }
  }
}