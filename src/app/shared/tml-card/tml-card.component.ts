import { Component, OnInit, Input } from '@angular/core';
import { IComplaintCard } from './complaint-card.data';

@Component({
  selector: 'tml-complaint-card',
  templateUrl: './tml-card.component.html',
  styleUrls: ['./tml-card.component.scss']
})
export class TmlCompaintCardComponent implements OnInit {
  @Input() data: IComplaintCard;

  constructor() { }

  ngOnInit() {
  }

}
