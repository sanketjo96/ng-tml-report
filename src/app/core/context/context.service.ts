import { Injectable } from '@angular/core';
import { SearchPane, SearchControl } from 'src/app/report/search/search.data';
import { Complaint } from 'src/app/models/complaint';
import { ReportSearch } from 'src/app/report/report.data';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private searchData: ReportSearch;
  private detailsData: Array<Complaint>;

  constructor() { }

  preferOldSearchPaneData(): SearchPane {
    return this.searchData
      ? this.searchData.searchParams
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
    this.searchData = data;
  }

  getSearchData() {
    return this.searchData;
  }

  setComplaintDetails(detailsData: Array<Complaint>) {
    this.detailsData = detailsData;
  }

  getComplaintDetails(): Array<Complaint> {
    return this.detailsData;
  }
}
