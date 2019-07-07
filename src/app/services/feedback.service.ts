import { Injectable } from '@angular/core';
import { Feedback } from '../share/feedback';

/* import { FEEDBACKS } from '../share/Feedbackes'; */
/*import { resolve } from 'dns'; */
import { Observable, of, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL} from '../share/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getFeedbackes(): Observable<Feedback[]> {
    // Get the data from the server side
    return this.http.get<Feedback[]>(baseURL + 'feedback')
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeedback(id: string): Observable<Feedback> {
    // Get the data from the server side
    return this.http.get<Feedback>(baseURL + 'feedback/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeaturedFeedback(): Observable<Feedback> {
    // Get the data from the server side
   return this.http.get<Feedback>(baseURL + 'feedback?featured=true')
      .pipe( map(Feedbackes => Feedbackes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  submitFeedback(Feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Feedback>(baseURL + 'feedback/', Feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
