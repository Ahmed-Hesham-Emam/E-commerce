import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent, title: 'Home' },

  { path: 'brands', component: BrandsComponent, title: 'Brands' },

  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
    canActivate: [authGuardGuard],
  },

  { path: 'products', component: ProductsComponent, title: 'Products' },

  { path: 'categories', component: CategoriesComponent, title: 'Categories' },

  { path: 'login', component: LoginComponent, title: 'Login' },

  { path: 'register', component: RegisterComponent, title: 'Register' },

  { path: '**', component: NotfoundComponent, title: 'Erorr 404' },
];
