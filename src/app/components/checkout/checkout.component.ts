import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

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
  date = new Date();

  constructor(
    private db: AngularFirestore,
    private cart: CartService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.cart_items = this.cart.getItems();
    db.collection('/cart')
      .valueChanges()
      .subscribe((products) => {
        this.getTotalPrice(products);
        this.total = products.length;
      });

    this.date.setDate(this.date.getDate() + 1);
    this.date.setHours(8);
    this.date.setMinutes(0);
    console.log(this.date);
  }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      datetime: ['', Validators.required],
    });
    this.currentUser = this.authService.currentUserSubject.value || null;
    this.setInputData();
  }

  getTotalPrice(products: any) {
    let current_price = 0;
    for (let i = 0; i < products.length; i++) {
      current_price += products[i].quantity * products[i].price;
    }
    this.totalPrice = current_price;
  }

  get controls() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      return;
    }
    this.cart.completeOrder();
  }

  setInputData() {
    this.checkoutForm.get('firstName').setValue(this.currentUser.firstName);
    this.checkoutForm.get('lastName').setValue(this.currentUser.lastName);
    this.checkoutForm.get('address').setValue(this.currentUser.address);
    this.checkoutForm.get('email').setValue(this.currentUser.email);
    this.checkoutForm.get('phoneNum').setValue(this.currentUser.phoneNum);
  }
}
