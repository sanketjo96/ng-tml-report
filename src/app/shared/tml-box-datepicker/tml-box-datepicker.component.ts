import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tml-box-datepicker',
  templateUrl: './tml-box-datepicker.component.html',
  styleUrls: ['./tml-box-datepicker.component.scss']
})
export class TmlBoxDatepickerComponent implements OnInit {
  @Input() fromDateControl: FormControl;
  @Input() toDateControl: FormControl;

  @Input() fromlabel: string = '';
  @Input() tolabel: string = '';
  constructor() { }

  ngOnInit() {

  }
}
