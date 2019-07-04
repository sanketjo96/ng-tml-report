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
    let eixtedSearchParams = this.context.getSearchData();
    if (
        eixtedSearchParams
        && this.reportService.groupedData
      ) {
      this.setReport(eixtedSearchParams, this.reportService.groupedData);
      return;
    }
  }

  onSearch(params: ReportSearch) {
    this.searchParams = params.searchParams;

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

    const models = params.searchParams.models.selectedVal;
    this.detailsForSummary = {
      ccdes: params.complaintGroupDesc,
      ccode: params.searchParams.complaint.selectedVal,
      model: (models && models.length == 1) ? params.searchParams.models.selectedVal[0] : undefined
    } 
    this.context.setSearchData(params);
    this.context.setComplaintDetails(this.reportService.rawData);
  }

  onRedirect(data) {
    const redirectParam = {
      ...data
    };
    this.router.navigate(['/details', redirectParam]);
  }
}
