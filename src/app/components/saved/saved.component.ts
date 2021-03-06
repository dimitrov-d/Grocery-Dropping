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
  savedItems: Observable<any[]>;
  savedTotal: number;

  constructor(private db: AngularFirestore, private saved: SavedService) {
    this.savedItems = this.db.collection('/saved').valueChanges();
    this.savedItems.subscribe((saved) => {
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
    this.savedItems = null;
  }
}
