import { Category } from './category';

export class Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  supermarket: string;
  imgUrl: string;
  favorited: boolean;
}
