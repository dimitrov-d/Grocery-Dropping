import { Component, OnInit } from '@angular/core';
import { products } from '../../../assets/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = products;
  categories = ['Bread', 'Dairy', 'Fruits'];
  constructor() {}

  ngOnInit() {}

}
