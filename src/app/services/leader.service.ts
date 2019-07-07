import { Injectable } from '@angular/core';
import { Leader } from '../share/leader';
import { LEADERS } from '../share/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL} from '../share/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
     // Use of RxJS to include reactive Programming instead of using Angular native Promise
    //return of(LEADERS).pipe(delay(2000));

    // Use of HttpClient to fetch data from the server
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));

    /*
    return new Promise(resolve => {
      setTimeout( () => resolve(LEADERS), 2000);
    });
    */
  }

  getLeader(id: string): Observable<Leader> {
    // Use of HttpClient to fetch data from the server
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));

     // Use of RxJS to include reactive Programming instead of using Angular native Promise
    //return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    /*
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    });
    */
  }

  getFeaturedLeader(): Observable<Leader> {
    // Use of HttpClient to fetch data from the server
    return this.http.get<Leader>(baseURL + 'leadership?featured=true')
      .pipe( map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));

    // Use of RxJS to include reactive Programming instead of using Angular native Promise
    //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000))
    /*
    return new Promise(resolve => {
      setTimeout( () => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });
    */
  }

  
}
