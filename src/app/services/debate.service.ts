import { Injectable } from '@angular/core';
import { DebateResponse } from '../debate-response';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DebateService {
  private readonly sessionId = uuidv4();
  private readonly debateResponses = new Subject<DebateResponse[]>();
  private readonly stompClient: CompatClient;

  constructor() {
    this.stompClient = Stomp.over(
      new SockJS(`${environment.apiUrl}/websocket`),
    );
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(
        `/topic/debate/${this.sessionId}`,
        (message: IMessage) => {
          if (message.body) {
            this.debateResponses.next(JSON.parse(message.body));
          }
        },
      );
    });
  }

  startDebate(input: string, exchanges: number): Observable<DebateResponse[]> {
    this.stompClient.send(
      '/app/debate',
      {},
      JSON.stringify({
        sessionId: this.sessionId,
        input: input,
        exchanges: exchanges,
      }),
    );
    return this.debateResponses.asObservable();
  }
}
