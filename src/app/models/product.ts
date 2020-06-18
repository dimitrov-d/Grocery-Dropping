import { Category } from './category';

export class Product {
  id: number;
  title: string;
  category: Category;
  price: number;
  supermarket: string;
  imageUrl: string;
  favorited: boolean;
}
