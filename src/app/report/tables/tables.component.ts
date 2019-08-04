import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ReportService } from '../report.service';
import { ITMLViewConfig } from '../report.data';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnChanges {
  data: Array<Array<any>> = [[]];
  displayedColumns: Array<Array<any>> = [];

  @Input() viewConfig: ITMLViewConfig;
  @Output() redirectRequest = new EventEmitter();

  constructor(private reportService: ReportService) { }

  ngOnInit() {
      this.displayedColumns = this.reportService.getTableSetCols(this.viewConfig);
  }

  ngOnChanges() {
    this.data = this.reportService.getTablesDataSet();
    console.log(this.data);
  }

  onRowClick(data, index) {
    const param = {};
    const primaryCol = this.viewConfig.views[index].dimension;
    param[primaryCol] = data[primaryCol];
    this.redirectRequest.emit(param)
  }

}
