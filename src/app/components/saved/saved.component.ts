import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { SavedService } from 'src/app/services/saved.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css'],
})
export class SavedComponent {
  saved_items: Observable<any[]>;
  savedTotal: number;

  constructor(private db: AngularFirestore, private saved: SavedService) {
    this.saved_items = this.db.collection('/saved').valueChanges();
    this.saved_items.subscribe((saved) => {
      this.savedTotal = saved.length;
    });
  }

  deleteOrder(index: number) {
    this.saved.deleteOrder(index);
  }

  addOrderToCart(index: number) {
    this.saved.addOrderToCart(index);
  }

  clearOrders() {
    this.saved.clearOrders();
    this.saved_items = null;
  }
}
