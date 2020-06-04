import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AUTH_ROUTES)],
  declarations: [LoginComponent, RegisterComponent, AccountComponent],
})
export class AuthModule {}
