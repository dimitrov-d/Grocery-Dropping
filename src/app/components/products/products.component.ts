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
    this.currentMarket = null;
    this.currentCategory = category;
    this.products = this.filterService.filterByCategory(category);
  }

  filterByMarket(market) {
    this.currentCategory = null;
    this.currentMarket = market;
    this.products = this.filterService.filterByMarket(market);
  }

  filterProducts(filter: string) {
    this.currentCategory = null;
    this.currentMarket = null;
    this.products = this.filterService.filterByName(filter);
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
}
