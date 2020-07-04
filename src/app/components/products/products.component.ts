import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Observable<any[]>;
  categories = Object.values(Category);
  currentCategory: string;
  currentMarket: string;
  markets = ['Hofer', 'Lidl', 'Mercator'];
  minPrice = 0;
  maxPrice = 5;

  constructor(
    private db: AngularFirestore,
    public prodService: ProductsService,
    public filterService: FilterService
  ) {
    this.products = this.filterService.getProducts();
    this.currentCategory = Category.All;
  }

  toggleHeart(index) {
    return this.prodService.toggleHeart(index);
  }

  filterByCategory(category) {
    this.resetFilters(category, null);
    setTimeout(() => {
      this.products = this.filterService.filterByCategory(category);
    }, 50);
  }

  filterByMarket(market) {
    this.resetFilters(null, market);
    setTimeout(() => {
      this.products = this.filterService.filterByMarket(market);
    }, 50);
  }

  filterByName(filter: string) {
    if (!filter) {
      this.currentCategory = Category.All;
      this.products = this.filterService.getProducts();
      return;
    }
    this.resetFilters(null, null);
    setTimeout(() => {
      this.products = this.filterService.filterByName(filter);
    }, 50);
  }

  filterByPrice() {
    this.currentCategory = null;
    this.currentMarket = null;
    this.products = this.filterService.filterByPrice(
      this.minPrice,
      this.maxPrice
    );
  }

  addToCart(product: Product) {
    this.prodService.addToCart(product);
  }

  resetFilters(category?, market?) {
    this.minPrice = 0;
    this.maxPrice = 5;
    setTimeout(() => {
      this.currentCategory = category;
      this.currentMarket = market;
    }, 50);
  }
}
