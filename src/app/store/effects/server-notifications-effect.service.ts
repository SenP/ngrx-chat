import { Observable } from 'rxjs/Rx';
import { UiState } from '../ui-state';
import { ApplicationState } from '../application-state';
import { Store } from '@ngrx/store';
import { NewMessagesReceivedAction } from '../actions';
import { ThreadsService } from '../../services/threads.service';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';

@Injectable()
export class ServerNotificationsEffectService {

  constructor(private store: Store<ApplicationState>,
              private threadsService: ThreadsService) { }

  uiState$: Observable<UiState> = Observable.interval(2000)
                                            .withLatestFrom(this.store.select("uiState"))
                                            .map(([_, uiState]) => uiState);
  @Effect()
  newMessages$: Observable<any> = this.uiState$
                                      .filter(uiState => !!uiState.userId)
                                      .switchMap((uiState) => this.threadsService.loadNewMessagesForUser(uiState.userId))
                                      .debug("new messages received from server")
                                      .withLatestFrom(this.uiState$)
                                      .map(([unreadMessages,uiState]) => new NewMessagesReceivedAction({
                                                                                      unreadMessages,
                                                                                      currentThreadId: uiState.currentThreadId,
                                                                                      currentUserId: uiState.userId
                                                                                    }));

}