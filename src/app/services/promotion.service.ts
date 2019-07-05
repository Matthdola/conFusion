import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';
import { PROMOTIONS } from '../share/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getDishes(): Promise<Promotion[]> {
    return new Promise(resolve => {
      setTimeout( () => resolve(PROMOTIONS), 2000);
    });
  }

  getDish(id: string): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout( () => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
  }

  getFeaturedDish(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
  }

}
