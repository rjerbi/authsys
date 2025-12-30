import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Validation email obligatoire
      password: ['', Validators.required] // Mot de passe obligatoire
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.http.post('http://localhost:8000/api/login', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}
