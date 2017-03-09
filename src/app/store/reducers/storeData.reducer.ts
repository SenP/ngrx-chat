import {
    handleLoadUserThreadsAction,
    handleNewMessagesReceivedAction,
    handleSendNewMessageAction,
    handleThreadSelectedAction
} from '../action-handlers';
import { Action } from '@ngrx/store';
import {
    NEW_MESSAGES_RECEIVED_ACTION,
    NewMessagesReceivedAction,
    SEND_NEW_MESSAGE_ACTION,
    SendNewMessageAction,
    THREAD_SELECTED_ACTION,
    USER_THREADS_LOADED_ACTION,
    UserThreadsLoadedAction
} from '../actions';
import { INITIAL_STORE_DATA, StoreData } from '../store-data';

export function storeData(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {

      switch (action.type) {
          case USER_THREADS_LOADED_ACTION:
            return handleLoadUserThreadsAction(state, action);
          case THREAD_SELECTED_ACTION:     
            return handleThreadSelectedAction(state, action);
          case SEND_NEW_MESSAGE_ACTION:
            return handleSendNewMessageAction(state, action);
          case NEW_MESSAGES_RECEIVED_ACTION:
            return handleNewMessagesReceivedAction(state, action);
          default:
            return state;
      }
}

