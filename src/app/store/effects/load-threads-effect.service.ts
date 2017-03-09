import { AllUserData } from '../../../../shared/to/all-user-data';
import {
    LOAD_USER_THREADS_ACTION,
    LoadUserThreadsAction,
    SELECT_USER_ACTION,
    UserThreadsLoadedAction
} from '../actions';
import { ThreadsService } from '../../services/threads.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class LoadThreadsEffectService {

  constructor(private actions$: Actions,
              private threadsService: ThreadsService) {}

  @Effect() userThreads$ = this.actions$
                                .ofType(LOAD_USER_THREADS_ACTION)
                                .debug("LOAD_USER_THREADS_ACTION action received")
                                .switchMap(action => this.threadsService.loadUserThreads(action.payload))
                                .debug("data received from http request")
                                .map(allUserData => new UserThreadsLoadedAction(allUserData));

  @Effect() newuserSelected$ = this.actions$
                                .ofType(SELECT_USER_ACTION)
                                .debug("SELECT_USER_ACTION action received")
                                .map(action => new LoadUserThreadsAction(action.payload));
}
