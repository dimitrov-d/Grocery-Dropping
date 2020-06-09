import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
         {
           path: '',
           redirectTo: '/products',
           pathMatch: 'full',
         },
         {
           path: 'products',
           component: ProductsComponent,
           canActivate: [AuthGuard],
         },
         { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
         {
           path: 'favorites',
           component: FavoritesComponent,
           canActivate: [AuthGuard],
         },
         {
           path: 'auth',
           loadChildren: () =>
             import('./auth/auth.module').then((a) => a.AuthModule),
         },
         { path: '**', redirectTo: '/products' },
       ];
