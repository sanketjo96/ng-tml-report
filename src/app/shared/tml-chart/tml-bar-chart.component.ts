import { Component, Input, OnInit } from '@angular/core';
import { TMLChartData, Dset } from 'src/app/report/charts/chart.data';
import { chartOptions } from './chart-options-conf';

@Component({
  selector: 'tml-bar-chart',
  templateUrl: './tml-bar-chart.component.html',
  styleUrls: ['./tml-bar-chart.component.scss']
})
export class TmlBarChartComponent implements OnInit {
  @Input() chartData: TMLChartData;
  chartOptions: any

  ngOnInit() {
    this.chartOptions = chartOptions;
    this.chartOptions.title.text = this.chartData.title
  }
}
