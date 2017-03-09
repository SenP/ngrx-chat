import { UiState } from '../store/ui-state';
import { uiState } from '../store/reducers/uiState.reducer';
import { SendNewMessageAction } from '../store/actions';
import { messagesSelector, participantNamesSelector } from './message.selectors';
import { MessageVM } from './message.vm';
import { Observable } from 'rxjs/Rx';
import { ApplicationState } from '../store/application-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})

export class MessageSectionComponent {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;
  uiState: UiState;

  constructor( private store: Store<ApplicationState>) { 

    this.participantNames$ = store.select(participantNamesSelector);

    this.messages$ = store.select(messagesSelector);

    store.subscribe(state => this.uiState = Object.assign({}, state.uiState));
     
  }

  sendNewMessage(input: any) {
    this.store.dispatch(new SendNewMessageAction({
      text: input.value, 
      threadId: this.uiState.currentThreadId,
      participantId: this.uiState.userId
    }));
    input.value = '';
  }

}
