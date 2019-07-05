import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';
import { PROMOTIONS } from '../share/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getDishes(): Observable<Promotion[]> {
    // Use of RxJS Reactive programming instead of Promise directly
    return of(PROMOTIONS).pipe(delay(2000));
    /*
    return new Promise(resolve => {
      setTimeout( () => resolve(PROMOTIONS), 2000);
    });
    */
  }

  getDish(id: string): Observable<Promotion> {
    // Use of RxJS Reactive programming instead of Promise directly
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    /*
    return new Promise(resolve => {
      setTimeout( () => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
    */
  }

  getFeaturedDish(): Observable<Promotion> {
    // Use of RxJS Reactive programming instead of Promise directly
    return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
    /*
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
    */
  }

}
