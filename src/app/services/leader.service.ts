import { Injectable } from '@angular/core';
import { Leader } from '../share/leader';
import { LEADERS } from '../share/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
     // Use of RxJS to include reactive Programming instead of using Angular native Promise
    return of(LEADERS).pipe(delay(2000));
    /*
    return new Promise(resolve => {
      setTimeout( () => resolve(LEADERS), 2000);
    });
    */
  }

  getLeader(id: string): Observable<Leader> {
     // Use of RxJS to include reactive Programming instead of using Angular native Promise
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    /*
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    });
    */
  }

  getFeaturedLeader(): Observable<Leader> {
    // Use of RxJS to include reactive Programming instead of using Angular native Promise
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000))
    /*
    return new Promise(resolve => {
      setTimeout( () => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });
    */
  }
}

