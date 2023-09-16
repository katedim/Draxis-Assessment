import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service'; // Import the CartService

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartArray: string[] = [];
  userPreference: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartArray = this.cartService.getCart();
    console.log(this.cartArray);
  }


  deleteDish(dishName: string) {
    this.cartService.deleteDish(dishName);
  }

  sendOrder()
  {
			if (confirm("Do you want to send the order?") == true) {
				this.userPreference = "The order has been sent!";
			} else {
				this.userPreference = "The order hasn not been sent";
			}
  }
}
