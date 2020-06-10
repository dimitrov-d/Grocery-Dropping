import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    // Redirect to home if already logged in
    if (this.authService.currentUserSubject.value) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNum: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get controls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (success) => {
          window.alert('Registration Successful');
          this.router.navigate(['/login']);
        },
        (error) => {
          window.alert(error.error.message);
          this.loading = false;
        }
      );
  }
}
