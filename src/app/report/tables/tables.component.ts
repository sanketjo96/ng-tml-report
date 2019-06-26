import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReportService } from '../report.service';
import { IReportConfig } from '../report.data';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnChanges {
  data: Array<Array<any>> = [[]];
  displayedColumns: Array<Array<any>> = [];

  @Input() colsConfig: IReportConfig;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
      this.displayedColumns = this.reportService.getTableSetCols(this.colsConfig);
  }

  ngOnChanges() {
    this.data = this.reportService.getTablesDataSet();
  }

}
