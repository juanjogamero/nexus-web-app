import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Nexus | Marketplace' },
  { path: 'producto/:id', component: ProductDetailComponent, title: 'Producto | Nexus' },
  { path: 'oferta/:id', component: ProductDetailComponent, title: 'Oferta | Nexus' },
  { path: 'proyecto', component: AboutComponent, title: 'El proyecto | Nexus' },
  { path: '**', redirectTo: '' }
];
