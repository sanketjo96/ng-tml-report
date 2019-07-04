import { Injectable } from '@angular/core';
import { SearchPane, SearchControl } from 'src/app/report/search/search.data';
import { Complaint } from 'src/app/models/complaint';
import { ReportSearch } from 'src/app/report/report.data';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private searchControls: SearchPane;
  private searchParams: ReportSearch = null;
  private detailsData: Array<Complaint>;

  constructor() { }

  setSearchPaneData(data: SearchPane) {
    this.searchControls = data;
  }

  preferOldSearchPaneData(): SearchPane {
    return this.searchControls
      ? this.searchControls
      : new SearchPane(
          new SearchControl(),
          new SearchControl(),
          new SearchControl(),
          new SearchControl(),
          new SearchControl()
        )
    ;
  }

  setSearchData(data: ReportSearch) {
    this.searchParams = data;
  }

  getSearchData(): ReportSearch {
    return this.searchParams;
  }

  setComplaintDetails(detailsData: Array<Complaint>) {
    this.detailsData = detailsData;
  }

  getComplaintDetails(): Array<Complaint> {
    return this.detailsData;
  }
}
