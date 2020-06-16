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
  }

  ngOnInit() {
    if (localStorage.getItem('products')) {
      this.products = JSON.parse(localStorage.getItem('products'));
    }
  }

  toggleHeart(index) {
    this.products[index - 1].favorited = !this.products[index - 1].favorited;
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  filterByCategory(category) {
    switch (category) {
      case 'All Categories': {
        this.products = products;
        break;
      }
      case 'Favorites': {
        this.products = this.products.filter((p) => p.favorited);
        break;
      }
    }
  }

  filterProducts(filter: string) {
    if (!filter) {
      this.products = products;
    }
    this.products = this.products.filter((p) => p.title.includes(filter));
  }
}
