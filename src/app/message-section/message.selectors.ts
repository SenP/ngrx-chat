import { MessageVM } from './message.vm';
import { Thread } from '../../../shared/model/thread';
import { ApplicationState } from '../store/application-state';
import * as _ from 'lodash';

export function participantNamesSelector(state: ApplicationState): string {
    
    const currentThreadId = state.uiState.currentThreadId;
    
    if (!currentThreadId) return "";
    
    const currentThread = state.storeData.threads[currentThreadId];    
    return _.keys(currentThread.participants).map(participantId => state.storeData.participants[participantId].name).join(",");
}

export function messagesSelector(state: ApplicationState): MessageVM[] {
    
    const currentThreadId = state.uiState.currentThreadId;
    
    if (!currentThreadId) return [];

    const messageIds = state.storeData.threads[currentThreadId].messageIds;    

    return messageIds.map( messageId => {
                        const message = state.storeData.messages[messageId];
                        return {
                            id: message.id,
                            participantName: state.storeData.participants[message.participantId].name,
                            text: message.text,
                            timestamp: message.timestamp
                        }
                });
  }
