import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ROUTES } from './app.routing';
import { RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import localeSl from '@angular/common/locales/sl';

registerLocaleData(localeSl, 'sl');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    FavoritesComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MDBBootstrapModule.forRoot(),
    AuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'sl' }],
})
export class AppModule {}
