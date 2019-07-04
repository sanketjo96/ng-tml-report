import { Component, OnInit } from '@angular/core';
import { ITMLViewConfig, ReportSearch } from './report.data';
import { DataService } from '../core/data/data.service';
import { Complaint } from '../models/complaint';
import { ReportService } from './report.service';
import { ContextService } from '../core/context/context.service';
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
  selectedModels: Array<string> = [];
  detailsForSummary: ISummary;
  loading = false;

  constructor(
    private dataService: DataService, 
    private reportService: ReportService,
    private context: ContextService,
    private router: Router
  ) { }

  ngOnInit() {
    // Check if report data already present, if present load the
    // page using same data. Useful in cases where user wanted
    // to navigate back from details page etc.
    this.tryTosetReportWithExistingData();
  }

  onSearch(params: ReportSearch) {
    // If only view toggles, no need to trigger API
    // Try to load the report from cached data
    const cachedSearchParams =  this.context.getSearchData();
    if (
      cachedSearchParams
      && params
      && this.reportService.isOnlyViewSettingChanged(cachedSearchParams, params)     
    ) {
      this.tryTosetReportWithExistingData(params);
      return;
    }

    this.loading = true;
    this.selectedModels = params.apiparams.models;
    this.dataService.findComplaints(params.apiparams).subscribe((data: Array<Complaint>) => {
      this.reportService.getGroupedData(data, params.viewConfig);
      this.setReport(params, this.reportService.groupedData);
      this.loading = false;
    });
  }

  tryTosetReportWithExistingData(searchParams?: ReportSearch) {
    let cachedSearchParams = searchParams ? searchParams : this.context.getSearchData();
    if (
        cachedSearchParams
        && this.reportService.groupedData
      ) {
      this.setReport(cachedSearchParams, this.reportService.groupedData);
    }
  }

  setReport(params: ReportSearch, data) {
    this.reportLabel = `${params.apiparams.complaintGroupCode} - ${params.complaintGroupDesc}`;
    this.viewsConfig = JSON.parse(JSON.stringify(params.viewConfig));
    this.isDataPresent = (data && Object.keys(data).length)
      ? true
      : false
    ; 
    this.view = params.activeView;

    const models = params.apiparams.models;
    this.detailsForSummary = {
      ccdes: params.complaintGroupDesc,
      ccode: params.apiparams.complaintGroupCode,
      model: (models && models.length == 1) ? params.apiparams.models[0] : undefined
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
