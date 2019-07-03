import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ITMLViewConfig } from '../report.data';
import { ReportService } from '../report.service';
import { TMLChartData, ISummary } from './chart.data';

import { MatDialog } from '@angular/material/dialog';
import { InferenceModalComponent } from '../inference/inference.component';

@Component({
  selector: 'report-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() viewConfig: ITMLViewConfig;
  @Input() detailsForSummary: ISummary;
  data: Array<TMLChartData> = [];

  constructor(private reportService: ReportService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.data = this.reportService.getChartsDataSet(this.viewConfig);
    this.detailsForSummary.charts = this.data;
  }

  openInfereance() {
    this.dialog.open(InferenceModalComponent, {
      width: '1200px',
      data: this.detailsForSummary
    });
  }
}
