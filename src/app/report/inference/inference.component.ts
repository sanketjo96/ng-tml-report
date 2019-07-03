import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contributors } from '../report.data';
import { InferanceService } from './inferance.service';
import { IHighlight, ISummary } from '../charts/chart.data';

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
  highlightsTableData: Array<IHighlight>;
  
  constructor(
    public dialogRef: MatDialogRef<InferenceModalComponent>,
    private inferanceService: InferanceService,
    @Inject(MAT_DIALOG_DATA) public data: ISummary
    ) {
    }

  ngOnInit() {
    this.highlightsTableData = this.inferanceService.getContributorsTableData(this.data.charts);
  }

}
