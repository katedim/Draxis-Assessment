import { Component, OnInit, TemplateRef } from '@angular/core';
import { Dish } from 'src/app/model/dish.model';
import { DisplayService } from 'src/app/services/display.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dishArray: Dish[] = [];
  modalRef: BsModalRef | undefined;
  selectedDish: Dish | undefined;
  selectedDietary: string = '';
  selectedPriceRange: string = '';
  selectedAllergens: string = '';
  filterDishArray: Dish[] = [];

  constructor(
    private displayService: DisplayService,
    private modalService: BsModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllDishes();
  }

  getAllDishes() {
    this.displayService.getAllDishes().subscribe(
      (res) => {
        this.dishArray = res;
        this.filterDishArray = this.dishArray;
      },
      (err) => {
        console.error('Unable to get dishes', err);
      }
    );
  }

  openModal(template: TemplateRef<any>, dish: Dish) {
    this.selectedDish = dish;
    this.modalRef = this.modalService.show(template);
  }

  addDishToCart(dishName: string) {
    this.cartService.addToCart(dishName);
  }

  onDietaryChange(selectedDietary: string | '') {

    if (selectedDietary === '' || selectedDietary === 'NoDietary') {
      this.filterDishArray = this.dishArray.slice();
      console.log(this.filterDishArray)
    } else {
      selectedDietary = selectedDietary.toLowerCase();
      this.filterDishArray = this.dishArray.filter((dish) => {
        if (dish.tags && dish.tags.dietaryPreferences) {
          return dish.tags.dietaryPreferences.some((preference) =>
            preference.toLowerCase() === selectedDietary
          );
        }
        return false;
      });
    }
  }

  onPriceRangeChange(priceRange: string | '') {

    if (priceRange === '' || priceRange === 'NoRange') {
      this.filterDishArray = this.dishArray.slice();

    }
    else if (priceRange === 'Over40') {
      this.filterDishArray = this.dishArray.filter((dish) => {
        return dish.price > 40;
      });
    }
    else {
      const priceRangeInt = parseInt(priceRange, 10);
      this.filterDishArray = this.dishArray.filter((dish) => {
        return dish.price < priceRangeInt && dish.price > priceRangeInt - 10;
      });
    }
  }


  onAllergensChange(selectedAllergens: string | '') {
    console.log(selectedAllergens);

    if (selectedAllergens === '' || selectedAllergens === 'NoAllergens') {
      this.filterDishArray = this.dishArray.slice();
    } else {
      selectedAllergens = selectedAllergens.toLowerCase();
      this.filterDishArray = this.dishArray.filter((dish) => {
        if (dish.tags && dish.tags.allergens) {
          return !dish.tags.allergens.some((preference) =>
            preference.toLowerCase() === selectedAllergens
          );
        }
        return true;
      });
    }
  }


}
