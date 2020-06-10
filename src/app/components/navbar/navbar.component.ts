import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentUser: User;
  constructor(private authService: AuthenticationService) {
    this.currentUser = this.authService.currentUserSubject.value || null;
  }

  logout() {
    location.reload();
    setTimeout(() => {
      this.currentUser = null;
    }, 1000);
    this.authService.logout();
  }
}
