export interface Tags {
  dietaryPreferences: string[];
  allergens: string[];
}

export class Dish {
  id: number = 0;
  name: string = '';
  description: string = "";
  price: number= 0;
  image: string = "";
  ingredients: string[] = [];
  tags: Tags = { dietaryPreferences: [], allergens: [] };
}
