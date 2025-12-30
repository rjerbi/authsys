import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.http.post('http://localhost:8000/api/register', this.form.getRawValue())
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => {
          if (err.status === 400) { // Si l'email existe déjà
            this.errorMessage = 'User already exists.';
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      });
  }
}
