import {Injectable, NgZone} from '@angular/core';
import {Observable, Observer, Subscriber} from 'rxjs';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
  providedIn: 'root'
})
export class SseService {


  private eventSource: EventSource|null = null;

  constructor(private zone: NgZone) {}

  getServerSentEvent(url: string): Observable<any> {
    return new Observable(observer => {
      const eventSource = this.getEventSource(url);

      eventSource.onmessage = event => {
        observer.next(event);
      };

      eventSource.onerror = error => {
        if (eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          console.log(error)
          observer.error(error);
        }
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
