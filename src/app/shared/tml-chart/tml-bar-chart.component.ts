import { Component, Input, OnInit } from '@angular/core';
import { TMLChartData } from 'src/app/report/charts/chart.data';

@Component({
  selector: 'tml-bar-chart',
  templateUrl: './tml-bar-chart.component.html',
  styleUrls: ['./tml-bar-chart.component.scss']
})
export class TmlBarChartComponent implements OnInit {
  @Input() chartData: TMLChartData;
  chartOptions: any

  ngOnInit() {
    this.chartOptions = {
      responsive: true,
      title: {
        display: true,
        text: this.chartData.title
      },
      scales: {
        yAxes: [
          {
            id: 'left',
            position: 'left',
            ticks: {
              min: 0,
              max: this.chartData.datasets[0].data[this.chartData.datasets[0].data.length]
            }
          },
          {
            id: 'right',
            position: 'right',
            gridLines: {
              display: false
            },
            ticks: {
              min: 0,
              max: 100,
              callback: (value, index, values) => {
                return value + "%";
              }
            }     
          }
        ]
      }
    }
  }
}
