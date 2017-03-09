import { Message } from '../../../shared/model/message';
import {
    NewMessagesReceivedAction,
    SendNewMessageAction,
    ThreadSelectedAction,
    UserThreadsLoadedAction
} from './actions';
import { StoreData } from './store-data';
import * as _ from 'lodash';
const uuid = require("uuid/V4");

export function handleLoadUserThreadsAction(state : StoreData, action : UserThreadsLoadedAction) : StoreData {
    
    return {
      threads: _.keyBy(action.payload.threads, 'id'),
      participants: _.keyBy(action.payload.participants, 'id'),
      messages: _.keyBy(action.payload.messages, 'id')
    }    
 }

 export function handleThreadSelectedAction(state : StoreData, action : ThreadSelectedAction) : StoreData {
    const newStoreState = _.cloneDeep(state);
    const selectedThread = newStoreState.threads[action.payload.selectedThreadId];
    // Mark unread counter for the current user on the selected thread to 0
    selectedThread.participants[action.payload.currentUserId] = 0; 
    return newStoreState;
}

 export function handleSendNewMessageAction(state : StoreData, action : SendNewMessageAction) : StoreData {
    const newStoreState = _.cloneDeep(state);
    const { text, threadId, participantId } = action.payload;

    const currentThread = newStoreState.threads[threadId];
    const id = uuid();

    const newMessage: Message = {
        id,
        participantId,        
        threadId,
        text,
        timestamp: new Date().getTime()
    };

    currentThread.messageIds.push(id);
    newStoreState.messages[id] = newMessage;
    
    return newStoreState;
 }

export function handleNewMessagesReceivedAction(state : StoreData, action : NewMessagesReceivedAction) : StoreData {
  const newStoreState = _.cloneDeep(state);
  const { unreadMessages, currentThreadId, currentUserId } = action.payload;

  unreadMessages.forEach(message => {
    newStoreState.messages[message.id] = message;
    newStoreState.threads[message.threadId].messageIds.push(message.id);

    if (message.threadId !== currentThreadId) {
        newStoreState.threads[message.threadId].participants[currentUserId] += 1;
    }
  });
  return newStoreState;
}