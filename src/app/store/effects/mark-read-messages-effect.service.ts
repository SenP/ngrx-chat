import { SEND_NEW_MESSAGE_ACTION, THREAD_SELECTED_ACTION, ThreadSelectedAction } from '../actions';
import { ThreadsService } from '../../services/threads.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class MarkReadMessagesEffectService {

  constructor(private actions$: Actions,
              private threadsService: ThreadsService) {}

  @Effect({dispatch: false}) 
  markReadMessages$ = this.actions$
                        .ofType(THREAD_SELECTED_ACTION)
                        .debug('thread selected effects started')
                        .switchMap((action: ThreadSelectedAction) => 
                            this.threadsService.markMessagesAsRead(action.payload.currentUserId, action.payload.selectedThreadId));

}