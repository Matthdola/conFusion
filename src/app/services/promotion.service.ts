import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';
import { PROMOTIONS } from '../share/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getDishes(): Promotion[] {
    return PROMOTIONS;
  }

  getDish(id: string): Promotion{
    return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedDish(): Promotion {
    return PROMOTIONS.filter((promo) => promo.featured)[0];
  }

}
