import { Thread } from '../../../shared/model/thread';
import { ThreadSummaryVM } from './thread-summary.vm';
import { ApplicationState } from '../store/application-state';
import * as _ from 'lodash';

export function userNameSelector(state: ApplicationState): string {
    let userId = state.uiState.userId;
    if (!state.storeData.participants[userId]) return "";
    return state.storeData.participants[userId].name;
}

export function unreadCounterSelector(state: ApplicationState): number {
    return _.values<Thread>(state.storeData.threads)
            .reduce((count, thread) => count + (thread.participants[state.uiState.userId] || 0), 0);
}

export function threadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {
    const threads = _.values<Thread>(state.storeData.threads);
    return threads.map(thread => {
                                const names = _.keys(thread.participants)
                                                .map(participantId => state.storeData.participants[participantId].name);
                                const lastMessageId = _.last(thread.messageIds),
                                        lastMessage = state.storeData.messages[lastMessageId];
                                return {
                                    id: thread.id,
                                    participantNames: names.join(","),
                                    lastMessageText: lastMessage.text,
                                    timestamp: lastMessage.timestamp,
                                    read: thread.id == state.uiState.currentThreadId || thread.participants[state.uiState.userId] == 0
                                }
                      });
  }
