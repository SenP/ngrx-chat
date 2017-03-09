import { Message } from '../../../shared/model/message';
import { commonHttpHeaders } from './commonHttpHeaders';
import { SendNewMessageActionPayload } from '../store/actions';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AllUserData } from '../../../shared/to/all-user-data';

import 'rxjs/add/operator/do';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }

  loadUserThreads(userId): Observable<AllUserData> {
    return this.http.get('/api/threads', commonHttpHeaders(userId))
                    .map(res => res.json());
  }

  saveNewMessage(newMessage: SendNewMessageActionPayload) : Observable<any> {
    return this.http.post(`/api/threads/${newMessage.threadId}`, 
                          JSON.stringify({ text: newMessage.text }), 
                          commonHttpHeaders(newMessage.participantId)
                        );

  }

  loadNewMessagesForUser(userId: number) : Observable<Message[]> {
    return this.http.post('/api/notifications/messages', null, commonHttpHeaders(userId))
                        .map(res => res.json().payload);

  }

  markMessagesAsRead(userId: number, selectedThreadId: number) : Observable<any> {
    return this.http.patch(`/api/threads/${selectedThreadId}`, 
                          { read: true},
                          commonHttpHeaders(userId)
                        );
  }
 
}
