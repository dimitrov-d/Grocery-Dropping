import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css'],
})
export class QuantityComponent implements OnInit {
  @Input('product') product: Product;
  quantity: number;

  constructor(private db: AngularFirestore) {}
  ngOnInit() {
    this.getQuantity(this.product);
  }

  increaseQuantity(product: Product) {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl,
      quantity: ++this.quantity,
    };

    this.db.collection('/cart').doc(product.id.toString()).set(data);
  }

  decreaseQuantity(product: Product) {
    if (this.quantity === 1) {
      this.db.collection('/cart').doc(product.id.toString()).delete();
    } else {
      const data = {
        id: product.id,
        name: product.name,
        price: product.price,
        imgUrl: product.imgUrl,
        quantity: --this.quantity,
      };

      this.db.collection('/cart').doc(product.id.toString()).set(data);
    }
  }

  getQuantity(product: Product) {
    const name = product.name;
    this.db
      .collection('/cart', (ref) => ref.where('name', '==', name))
      .valueChanges()
      .subscribe((prod: any) => (this.quantity = prod[0]?.quantity));
  }
}
