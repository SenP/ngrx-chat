import { Participant } from '../model/participant';
import { Thread } from '../model/thread';
import { Message } from '../model/message';

export interface AllUserData {
    threads: Thread[];
    participants: Participant[];
    messages: Message[];
}