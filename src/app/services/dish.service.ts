import { Injectable } from '@angular/core';
import { Dish } from '../share/dish';

/* import { DISHES } from '../share/dishes'; */
/*import { resolve } from 'dns'; */
import { Observable, of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL} from '../share/baseurl';
import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    // Use of RxJS reactive programming
    //return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));

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
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    /*
    return new Promise(resolve => {
      // Set server latency with 2 second delay
      setTimeout(() => resolve((DISHES.filter((dish) => (dish.id === id))[0])), 2000);
    });
    */
  }

  getFeaturedDish(): Observable<Dish> {
    // Use of RxJS Reactive programming instead of Promise directly
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    /*
    return new Promise(resolve => {
      // Set server latency with 2 second delay
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
    */
    // Get the data from the server side
   return this.http.get<Dish>(baseURL + 'dishes?featured=true')
      .pipe( map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    //return of(DISHES.map(dish => dish.id));
    // Get the data from the server side
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
  }
}
