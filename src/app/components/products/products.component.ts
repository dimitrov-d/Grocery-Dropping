import { Component, OnInit } from '@angular/core';
import { products } from '../../../assets/products';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  categories = [
    'All Categories',
    'Bread',
    'Dairy',
    'Fruits',
    'Vegetables',
    'Favorites',
  ];
  constructor() {
    this.products = products;
    this.filteredProducts = products;
  }

  ngOnInit() {}

  toggleHeart(index) {
    this.products[index - 1].favorited = !this.products[index - 1].favorited;
  }

  filterByCategory(category) {
    switch (category) {
      case 'All Categories': {
        this.filteredProducts = this.products;
        break;
      }
      case 'Favorites': {
        this.filteredProducts = this.products.filter((p) => p.favorited);
        break;
      }
    }
  }

  filterProducts(filter: string) {
    if (!filter) {
      this.filteredProducts = this.products;
    }
    this.filteredProducts = this.filteredProducts.filter((p) =>
      p.title.includes(filter)
    );
  }
}
