import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cart_items: Observable<any[]>;
  total: number;
  totalPrice: number;
  checkoutForm: FormGroup;
  submitted = false;
  currentUser: User;

  constructor(
    private db: AngularFirestore,
    private cart: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.cart_items = this.cart.getItems();
    db.collection('/cart')
      .valueChanges()
      .subscribe((products) => {
        this.getTotalPrice(products);
        this.total = products.length;
      });

  }

  getTotalPrice(products: any) {
    var current_price = 0;
    for (var i = 0; i < products.length; i++) {
      current_price += products[i].quantity * products[i].price;
    }
    this.totalPrice = current_price;
  }

  get controls() {
    return this.checkoutForm.controls;
  }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
  }
}
