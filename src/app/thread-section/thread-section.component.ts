import { UiState } from '../store/ui-state';
import { threadSummariesSelector, unreadCounterSelector, userNameSelector } from './thread.selectors';
import { timestamp } from '@angular-cli/ast-tools/node_modules/rxjs/operator/timestamp';
import * as _ from 'lodash';
import { Thread } from '../../../shared/model/thread';
import { Observable } from 'rxjs/Rx';
import { LoadUserThreadsAction, ThreadSelectedAction } from '../store/actions';
import { ApplicationState } from '../store/application-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { ThreadSummaryVM } from './thread-summary.vm';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMsgCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;
  uiState: UiState;

  constructor(private store: Store<ApplicationState>) { 
           
        this.userName$ = store.select(userNameSelector);
        
        this.unreadMsgCounter$ = store.select(unreadCounterSelector);

        this.threadSummaries$ = store.select(threadSummariesSelector);                        

        store.select("uiState").subscribe((uiState: UiState) =>  this.uiState = _.cloneDeep(uiState));
  }

  onThreadSelected(selectedThreadId: number){
    this.store.dispatch(new ThreadSelectedAction({ selectedThreadId, currentUserId: this.uiState.userId }));
  }
}
