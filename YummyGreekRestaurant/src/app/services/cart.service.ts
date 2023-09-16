import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: string[] = [];

  addToCart(dishName: string) {
    this.cart.push(dishName);
  }

  getCart() {
    return this.cart;
  }

  deleteDish(dishName: string) {
    const index = this.cart.indexOf(dishName);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }
}
