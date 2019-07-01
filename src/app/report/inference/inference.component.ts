import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contributors } from '../report.data';

@Component({
  selector: 'inference-modal',
  templateUrl: './inference.component.html',
  styleUrls: ['./inference.component.scss']
})
export class InferenceModalComponent implements OnInit {
  contributors=Contributors;
  title: string;
  cols: Array<string> = ['Dimention', 'Top Contributor', '80% Contribution'];
  colDef = {
    'Top Contributor': {
      list: true
    },
    '80% Contribution': {
      list: true
    }
  }
  tableData: Array<any> = [];
  
  constructor(
    public dialogRef: MatDialogRef<InferenceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.title = `Summary for Model(s) - ${data.models}`;
    }

  ngOnInit() {
    for(let item of this.data.data) {
      if (item.summary && item.summary.length) {
        const row = {};
        row['Dimention'] = item.title
        for(let sumItem of item.summary) {
          row[sumItem.name] = sumItem.matchedLabels,
          row['col-list'] = true;
        }
        this.tableData.push(row);
      }
    }
  }

}
