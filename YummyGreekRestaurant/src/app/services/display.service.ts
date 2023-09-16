import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from '../model/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  serviceUrl: string;

  constructor(private http: HttpClient) {
    this.serviceUrl = "http://localhost:3000/dishes";
  }

  getAllDishes() {
    return this.http.get<Dish[]>(this.serviceUrl);
   }
}
