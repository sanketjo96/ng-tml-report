import { Injectable } from '@angular/core';
import { SearchPane, SearchControl } from 'src/app/report/search/search.config';
import { Complaint } from 'src/app/models/complaint';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private searchData: SearchPane;
  private detailsData: Array<Complaint>;

  constructor() { }

  preferOldSearchPaneData(): SearchPane {
    return this.searchData 
      ? this.searchData
      : new SearchPane(
          new SearchControl(),
          new SearchControl(),
          new SearchControl(),
          new SearchControl(),
          new SearchControl()
        )
    ;
  }

  setSearchPaneData(data: SearchPane) {
    this.searchData = data;
  }

  setComplaintDetails(detailsData: Array<Complaint>) {
    this.detailsData = detailsData;
  }

  getComplaintDetails(): Array<Complaint> {
    return this.detailsData;
  }
}
