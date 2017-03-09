import { ThreadSummaryVM } from '../thread-section/thread-summary.vm';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadListComponent {

  @Input() threads: ThreadSummaryVM[];
  @Output() threadSelected: EventEmitter<number> = new EventEmitter();

  @Input() currentThreadId : number;
  
  selectThread(threadId : number) {
    this.threadSelected.emit(threadId);
  }

}
