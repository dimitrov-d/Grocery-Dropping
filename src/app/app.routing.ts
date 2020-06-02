import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  { path: '**', redirectTo: '/' },
];
