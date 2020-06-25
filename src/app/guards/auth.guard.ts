import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserSubject.value;
    if (currentUser) {
      return true;
    }
    this.toastr.error('You must be logged in to continue!', 'Error');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
