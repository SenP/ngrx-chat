import { SEND_NEW_MESSAGE_ACTION } from '../actions';
import { ThreadsService } from '../../services/threads.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class WriteNewMessageEffectService {

  constructor(private actions$: Actions,
              private threadsService: ThreadsService) {}

  @Effect({dispatch: false}) 
  writeNewMessage$ = this.actions$
                        .ofType(SEND_NEW_MESSAGE_ACTION)
                        .debug('send message action received')
                        .switchMap(action => this.threadsService.saveNewMessage(action.payload));

}