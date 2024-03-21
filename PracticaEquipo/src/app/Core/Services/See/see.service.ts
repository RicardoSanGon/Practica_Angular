import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  constructor() { }

  getServerSentEvent(url: string): Observable<any> {
    return new Observable(observer => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = event => {
        this.safeObserverNext(observer, event);
      };
      eventSource.onerror = error => {
        this.safeObserverError(observer, error);
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  private safeObserverNext(observer: Observer<MessageEvent>, event: MessageEvent) {
    if (!observer) {
      return;
    }
    observer.next(event);
  }

  private safeObserverError(observer: Observer<MessageEvent>, error: any) {
    if (!observer) {
      return;
    }
    observer.error(error);
  }
}
