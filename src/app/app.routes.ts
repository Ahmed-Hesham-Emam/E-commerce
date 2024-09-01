import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';
import { ResetPasswordComponent } from './layout/additions/reset-password/reset-password.component';
import { WishlistComponent } from './layout/additions/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent, title: 'Home' },

  {
    path: 'brands',
    loadComponent: () =>
      import('./layout/pages/brands/brands.component').then(
        (res) => res.BrandsComponent
      ),
    title: 'Brands',
  },

  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
    canActivate: [authGuardGuard],
  },

  {
    path: 'checkout/:cartId',
    loadComponent: () =>
      import('./layout/additions/checkout/checkout.component').then(
        (res) => res.CheckoutComponent
      ),
    title: 'Check Out',
    canActivate: [authGuardGuard],
  },

  {
    path: 'allorders',
    loadComponent: () =>
      import('./layout/additions/all-orders/all-orders.component').then(
        (res) => res.AllOrdersComponent
      ),
    title: 'All Orders',
  },

  {
    path: 'order-details/:orderId',
    loadComponent: () =>
      import('./layout/additions/order-details/order-details.component').then(
        (res) => res.OrderDetailsComponent
      ),
    title: 'orderDetails',
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./layout/pages/categories/categories.component').then(
        (res) => res.CategoriesComponent
      ),
    title: 'Categories',
  },

  { path: 'login', component: LoginComponent, title: 'Login' },

  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    title: 'Reset Password',
  },

  { path: 'register', component: RegisterComponent, title: 'Register' },

  {
    path: 'productdetails/:id',
    loadComponent: () =>
      import(
        './layout/additions/product-details/product-details.component'
      ).then((res) => res.ProductDetailsComponent),
    title: 'productDetails',
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('./layout/additions/wishlist/wishlist.component').then(
        (res) => res.WishlistComponent
      ),
    title: 'Wishlist',
    canActivate: [authGuardGuard],
  },

  { path: '**', component: NotfoundComponent, title: 'Erorr 404' },
];
