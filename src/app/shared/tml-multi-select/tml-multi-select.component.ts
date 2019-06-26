import { Component, OnInit, Input } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'tml-multi-select',
  templateUrl: './tml-multi-select.component.html',
  styleUrls: ['./tml-multi-select.component.scss']
})
export class TmlMultiSelectComponent implements OnInit {
  @Input() label: string;
  @Input() dataList: string;
  @Input() selectControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  selectAll() {
    this.selectControl.patchValue(this.dataList);
  }

  deselectAll() {
    this.selectControl.patchValue([]);
  }
}
