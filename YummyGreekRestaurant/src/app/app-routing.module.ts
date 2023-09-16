import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/Menu/menu/menu.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'cart', component: CartComponent},
  {path: '', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
