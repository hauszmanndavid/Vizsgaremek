import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

  registrationForm: any;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.registrationForm.valid){
      console.log("Regisztráció sikeres!", this.registrationForm.value);
    } else{
      this.registrationForm.markAllAsTouched();
    }
  }
}
