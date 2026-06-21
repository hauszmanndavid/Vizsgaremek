import { Component, OnInit, ChangeDetectorRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from '../nav-bar/nav-bar';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavBar, RouterModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Profile implements OnInit {
  name = '';
  email = '';
  phone = '';
  address = '';
  profileImage: string | null = null;
  successMessage = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    this.name = localStorage.getItem('name') || 'Ismeretlen';

    if (this.email) {
      this.http.get<any>(`http://localhost:8080/api/customer?email=${this.email}`).subscribe({
        next: (data) => {
          this.name = data.name || 'Ismeretlen';
          this.phone = data.phone || 'Nincs megadva';
          this.address = data.address && data.address !== '' ? data.address : 'Nincs megadva';
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      this.profileImage = savedImage;
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.ngZone.run(() => {
          this.profileImage = e.target.result;
          localStorage.setItem('profileImage', e.target.result);
          this.successMessage = 'Profilkép sikeresen frissítve!';
          this.cdr.detectChanges();
          setTimeout(() => {
            this.successMessage = '';
            this.cdr.detectChanges();
          }, 3000);
        });
      };
      reader.readAsDataURL(file);
    }
  }
}