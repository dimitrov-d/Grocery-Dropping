import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Category } from '../models/category';
import { ProductsService } from './products.service';
import { Options, LabelType } from 'ng5-slider';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  options: Options = {
    floor: 0,
    ceil: 5,
    tickStep: 0.2,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '&euro;';
        case LabelType.High:
          return value + '&euro;';
        default:
          return value + '&euro;';
      }
    },
  };

  constructor(
    private db: AngularFirestore,
    private prodService: ProductsService
  ) {}

  getProducts() {
    return this.db.collection('/products').valueChanges();
  }

  filterByMarket(market) {
    return this.db
      .collection('/products', (prod) =>
        prod.where('supermarket', '==', market)
      )
      .valueChanges();
  }

  filterByCategory(category) {
    if (category === Category.All) {
      return this.getProducts();
    } else if (category === Category.Favorites) {
      if (!this.prodService.authorizeFavorites()) {
        return;
      }
      return this.db
        .collection('/products', (prod) => prod.where('favorited', '==', true))
        .valueChanges();
    } else {
      return this.db
        .collection('/products', (prod) =>
          prod.where('category', '==', category)
        )
        .valueChanges();
    }
  }

  filterByName(filter) {
      return this.db
        .collection(
          '/products',
          (prod) =>
            prod
              .where('name', '>=', filter)
              .where('name', '<=', filter + '\uf8ff') // Unicode range to be able to search by substring
        )
        .valueChanges();
  }

  filterByPrice(min, max) {
    return this.db
      .collection('/products', (prod) =>
        prod.where('price', '>=', min).where('price', '<=', max)
      )
      .valueChanges();
  }
}
