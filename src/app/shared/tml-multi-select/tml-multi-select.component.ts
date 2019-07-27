import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tml-select',
  templateUrl: './tml-multi-select.component.html',
  styleUrls: ['./tml-multi-select.component.scss']
})
export class TmlMultiSelectComponent implements OnInit {
  @Input() label: string;
  @Input() dataList: string;
  @Input() selectControl: FormControl;
  @Input() isMultiSelect = true;
  @Input() default: any;

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
