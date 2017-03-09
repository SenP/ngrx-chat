import { MessageVM } from '../message-section/message.vm';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnChanges{

  @Input() messages : MessageVM[];  
  @ViewChild('list') list: ElementRef;

  ngOnChanges(changes: SimpleChanges) {

    if(changes['messages']) {

      const prevLength = changes['messages'].previousValue.length;
      const currLength = changes['messages'].currentValue.length;

      if (currLength > prevLength) { //new messages added, scroll to last
        setTimeout( () => this.scrollToLastMessage());
      }
    }

  }

  scrollToLastMessage() {
    const items = this.list.nativeElement.querySelectorAll('li');
    const lastItem: any = _.last(items);
    if (lastItem) lastItem.scrollIntoView();
  }
}
