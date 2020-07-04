import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
    private authService: AuthenticationService,
    private toastr: ToastrService
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
      phoneNum: ['',[Validators.required, Validators.pattern('^[0-9]{6,12}$')]],
      address: ['', [Validators.required, Validators.minLength(6)]],
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
          this.toastr.success('Registration Successful', 'Success');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error');
          this.loading = false;
        }
      );
  }
}
