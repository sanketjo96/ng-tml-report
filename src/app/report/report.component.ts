import { Component, OnInit } from '@angular/core';
import { ITMLViewConfig, ReportSearch } from './report.data';
import { DataService } from '../core/data/data.service';
import { Complaint } from '../models/complaint';
import { ReportService } from './report.service';
import { ContextService } from '../core/context/context.service';
import { SearchPane } from './search/search.data';
import { Router } from '@angular/router';
import { ISummary } from './charts/chart.data';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  view: string = '';
  reportLabel: string;
  viewsConfig: ITMLViewConfig = null;
  isDataPresent = false;
  searchParams: SearchPane;
  selectedModels: Array<string> = [];
  detailsForSummary: ISummary;

  constructor(
    private dataService: DataService, 
    private reportService: ReportService,
    private context: ContextService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSearch(params: ReportSearch) {
    this.searchParams = params.searchParams;
    if (params.redirection) {
      this.setReport(params, this.reportService.groupedData);
      return;
    }

    this.selectedModels = this.searchParams.models.selectedVal;
    this.dataService.findComplaints({
      complaintGroupCode:  this.searchParams.complaint.selectedVal,
      models:  this.searchParams.models.selectedVal,
      from:  this.searchParams.from.selectedVal,
      to:  this.searchParams.to.selectedVal,
      mis:  this.searchParams.mis.selectedVal
    }).subscribe((data: Array<Complaint>) => {
      this.reportService.getGroupedData(data, params.viewConfig);
      this.setReport(params, this.reportService.groupedData);
    });
  }

  setReport(params: ReportSearch, data) {
    this.reportLabel = `${params.searchParams.complaint.selectedVal} - ${params.complaintGroupDesc}`;
    this.viewsConfig = JSON.parse(JSON.stringify(params.viewConfig));
    this.isDataPresent = (data && Object.keys(data).length)
      ? true
      : false
    ; 
    this.view = params.activeView;
    this.detailsForSummary = {
      ccdes: params.complaintGroupDesc,
      ccode: params.searchParams.complaint.selectedVal,
      model: (params.searchParams.models.selectedVal.length == 1) ? params.searchParams.models.selectedVal[0] : undefined
    } 
    this.context.setSearchPaneData(params.searchParams);
  }

  onRedirect(data) {
    const redirectParam = {
      ...data
    };

    this.context.setComplaintDetails(this.reportService.rawData);
    this.router.navigate(['/details', redirectParam]);
  }
}
