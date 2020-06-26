import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentUser: User;
  cartTotal: number;
  constructor(
    private authService: AuthenticationService,
    private cart: CartService,
    private db: AngularFirestore
  ) {
    this.currentUser = this.authService.currentUserSubject.value || null;
    db.collection('/cart')
      .valueChanges()
      .subscribe((products) => {
        this.cartTotal = products.length;
      });
  }

  logout() {
    location.reload();
    setTimeout(() => {
      this.cart.cleartCart();
      this.currentUser = null;
    }, 1000);
    this.authService.logout();
  }
}
