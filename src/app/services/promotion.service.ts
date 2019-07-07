import { Injectable } from '@angular/core';
import { Promotion } from '../share/promotion';
import { PROMOTIONS } from '../share/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL} from '../share/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Promotion[]> {
    // Use of RxJS Reactive programming instead of Promise directly
    //return of(PROMOTIONS).pipe(delay(2000));

    // Use of HttpClient to fetch data from the server
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError));

    /*
    return new Promise(resolve => {
      setTimeout( () => resolve(PROMOTIONS), 2000);
    });
    */
  }

  getDish(id: string): Observable<Promotion> {
    // Use of RxJS Reactive programming instead of Promise directly
    //return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));

    // Use of HttpClient to fetch data from the server
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));

    /*
    return new Promise(resolve => {
      setTimeout( () => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
    */
  }

  getFeaturedDish(): Observable<Promotion> {
    // Use of RxJS Reactive programming instead of Promise directly
    //return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
    // Use of HttpClient to fetch data from the server
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
      .pipe( map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));

    /*
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });
    */
  }
}
