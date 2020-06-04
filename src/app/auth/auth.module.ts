import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AUTH_ROUTES), ReactiveFormsModule],
  declarations: [LoginComponent, RegisterComponent, AccountComponent],
  providers: [FormBuilder]
})
export class AuthModule {}
