import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBar } from '../../nav-bar/nav-bar';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavBar],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css'
})
export class AdminProducts implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  showAddForm = false;

  newProduct: any = {
    name: '',
    description: '',
    price: null,
    categoryId: null,
    imageUrl: '',
    discountId: 1
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:8080/api/products').subscribe({
      next: (data) => {
        this.products = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  loadCategories() {
    this.http.get<any[]>('http://localhost:8080/api/categories').subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  onNewImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.imageUrl = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  onProductImageUpload(event: any, product: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        product.imageUrl = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct() {
    const productToSend = {
      ...this.newProduct,
      discountId: this.newProduct.discountId || 1
    };

    this.http.post('http://localhost:8080/api/admin/products', productToSend, { responseType: 'text' }).subscribe({
      next: () => {
        alert('Termék hozzáadva!');
        this.showAddForm = false;
        this.newProduct = { name: '', description: '', price: null, categoryId: null, imageUrl: '', discountId: 1 };
        this.loadProducts();
      },
      error: (err) => console.error(err)
    });
  }

  updateProduct(product: any) {
    this.http.put(`http://localhost:8080/api/admin/products/${product.id}`, product, { responseType: 'text' }).subscribe({
      next: () => alert('Termék frissítve!'),
      error: (err) => console.error(err)
    });
  }

  deleteProduct(id: number) {
    if (confirm('Biztosan törli a terméket?')) {
      this.http.delete(`http://localhost:8080/api/admin/products/${id}`, { responseType: 'text' }).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error(err)
      });
    }
  }
}