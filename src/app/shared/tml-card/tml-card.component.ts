import { Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { IComplaintCard } from './complaint-card.data';

@Component({
  selector: 'tml-complaint-card',
  templateUrl: './tml-card.component.html',
  styleUrls: ['./tml-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TmlCompaintCardComponent implements OnInit {
  @Input() data: IComplaintCard;

  constructor() { }

  ngOnInit() {
  }

}
