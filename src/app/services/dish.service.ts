import { Injectable } from '@angular/core';
import { Dish } from '../share/dish';
import { DISHES } from '../share/dishes';
/*import { resolve } from 'dns'; */
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    // Use of RxJS reactive programming
    return of(DISHES).pipe(delay(2000));
    /*
    // Promise basic implementation
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES), 2000);
    });
    */
    /*
    return new Promise(
      resolve(DISHES)
    );
    */
    //return Promise.resolve(DISHES);

  }

  getDish(id: string): Observable<Dish> {
    // Use of RxJS Reactive programming instead of Promise directly
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    /*
    return new Promise(resolve => {
      // Set server latency with 2 second delay
      setTimeout(() => resolve((DISHES.filter((dish) => (dish.id === id))[0])), 2000);
    });
    */
  }

  getFeaturedDish(): Observable<Dish> {
    // Use of RxJS Reactive programming instead of Promise directly
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    /*
    return new Promise(resolve => {
      // Set server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
    */
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id));
  }
}
