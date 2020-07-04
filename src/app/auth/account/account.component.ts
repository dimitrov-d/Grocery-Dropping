import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  submitted = false;
  loading = false;
  accountForm: FormGroup;
  currentUser: User;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.currentUser = this.authService.currentUserSubject.value;
  }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNum: ['',[Validators.required, Validators.pattern('^[0-9]{6,12}$')]],
      address: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.setInputData();
  }

  get controls() {
    return this.accountForm.controls;
  }

  setInputData() {
    this.accountForm.get('firstName').setValue(this.currentUser.firstName);
    this.accountForm.get('lastName').setValue(this.currentUser.lastName);
    this.accountForm.get('email').setValue(this.currentUser.email);
    this.accountForm.get('password').setValue(this.currentUser.password);
    this.accountForm.get('address').setValue(this.currentUser.address);
    this.accountForm.get('phoneNum').setValue(this.currentUser.phoneNum);
  }

  onSubmit() {
    this.submitted = true;
    if (this.accountForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.deleteUser(this.currentUser).pipe(first()).subscribe();

    this.authService
      .modifyUser(this.accountForm.value)
      .pipe(first())
      .subscribe(
        (success) => {
          this.toastr.success('Update Successful', 'Success');
          if (!localStorage.getItem('currentUser')) {
            sessionStorage.setItem(
              'currentUser',
              JSON.stringify(this.accountForm.value))
          }
          else {
            localStorage.setItem(
              'currentUser',
              JSON.stringify(this.accountForm.value))
          }
          this.authService.currentUserSubject.next(this.accountForm.value);
          this.loading = false;
          setTimeout(() => {
            // Reload window to mirror changes to the UI.
            location.reload();
          }, 600);
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error');
          this.loading = false;
        }
      );
  }
}
