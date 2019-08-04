import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TMLChartData } from 'src/app/report/charts/chart.data';
import { chartOptions } from './chart-options-conf';

@Component({
  selector: 'tml-bar-chart',
  templateUrl: './tml-bar-chart.component.html',
  styleUrls: ['./tml-bar-chart.component.scss']
})
export class TmlBarChartComponent implements OnInit {
  @Input() chartData: TMLChartData;
  chartOptions: any
  @ViewChild("chartCanvas", {static: false}) chartCanvas: ElementRef; 
  style: any = {
    'position': 'relative',
    'min-height': '300px',
  };

  ngOnInit() {
    this.style.width = this.chartData.width;
    this.chartOptions = chartOptions;
    this.chartOptions.title.text = this.chartData.title
  }

  downloadCanvas(event) {
    // get the `<a>` element from click event
    var anchor = event.target;
    // get the canvas, I'm getting it by tag name, you can do by id
    // and set the href of the anchor to the canvas dataUrl
    anchor.href = this.chartCanvas.nativeElement.toDataURL();
    // set the anchors 'download' attibute (name of the file to be downloaded)
    anchor.download = `${this.chartData.header}.png`;
  }
}
