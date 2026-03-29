import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBar } from '../../nav-bar/nav-bar';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavBar],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:8080/api/admin/users').subscribe({
      next: (data) => {
        this.users = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  updateUser(user: any) {
    this.http.put(`http://localhost:8080/api/admin/users/${user.id}`, user, { responseType: 'text' }).subscribe({
      next: () => alert('Felhasználó frissítve!'),
      error: (err) => console.error(err)
    });
  }

  deleteUser(id: number) {
    if (confirm('Biztosan törli a felhasználót?')) {
      this.http.delete(`http://localhost:8080/api/admin/users/${id}`, { responseType: 'text' }).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error(err)
      });
    }
  }
}