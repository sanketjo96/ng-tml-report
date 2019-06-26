import { Component, OnInit } from '@angular/core';
import { IReportConfig, ReportSearch } from './report.data';
import { DataService } from '../core/data/data.service';
import { IComplaint } from '../models/complaint';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  view: string = '';
  reportLabel: string;
  colsConfig: IReportConfig = null;
  constructor(
    private dataService: DataService, 
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    
  }

  onSearch(params: ReportSearch) {
    this.dataService.findComplaints(params.complaintPrams).subscribe((data: Array<IComplaint>) => {
      this.reportLabel = `${params.complaintPrams.complaintGroupCode} - ${params.complaintPrams.complaintGroupDesc}`;
      this.reportService.getGroupedData(data, params.colConfig);
      this.colsConfig = JSON.parse(JSON.stringify(params.colConfig));
      this.view = params.view;
    });
  }

}
