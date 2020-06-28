import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
    // Redirect to home if already logged in
    if (this.authService.currentUserSubject.value) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  get controls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login(this.controls.email.value, this.controls.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          location.reload();
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
          }, 3000);
        },
        (error) => {
          this.toastr.error('Invalid credentials, try again', 'Error');
          this.loading = false;
        }
      );
  }
}
