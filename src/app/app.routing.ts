import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SavedComponent } from './components/saved/saved.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'saved',
    component: SavedComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((a) => a.AuthModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/products' },
];
