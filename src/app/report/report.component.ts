import { Component, OnInit } from '@angular/core';
import { IReportRequirements, ReportSearch } from './report.data';
import { DataService } from '../core/data/data.service';
import { IComplaintFinder, IComplaint } from '../models/complaint';
import { ReportService } from './report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  view: string = '';
  colsConfig: IReportRequirements = null;
  constructor(
    private dataService: DataService, 
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    
  }

  onSearch(params: ReportSearch) {
    this.dataService.findComplaints(params.complaintPrams).subscribe((data: Array<IComplaint>) => {
      this.reportService.getGroupedData(data, params.colConfig);
      this.colsConfig = JSON.parse(JSON.stringify(params.colConfig));
      this.view = params.view;
    });
  }

}
