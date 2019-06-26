import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IReportConfig } from '../report.data';
import { ReportService } from '../report.service';
import { TMLChartData } from './chart.data';

@Component({
  selector: 'report-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() colsConfig: IReportConfig;
  data: Array<TMLChartData> = [];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.data = this.reportService.getChartsDataSet(this.colsConfig);
    console.log(this.data)
  }

}
