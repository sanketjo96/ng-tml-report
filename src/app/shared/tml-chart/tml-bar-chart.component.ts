import { Component, Input } from '@angular/core';
import { TMLChartData } from 'src/app/report/charts/chart.data';

@Component({
  selector: 'tml-bar-chart',
  templateUrl: './tml-bar-chart.component.html',
  styleUrls: ['./tml-bar-chart.component.scss']
})
export class TmlBarChartComponent {
  @Input() chartData: TMLChartData;
  chartOptions = {
    responsive: true
  };
  onChartClick(event) {
    console.log(event);
  }
}
