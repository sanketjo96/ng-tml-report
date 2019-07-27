import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/core/data/data.service';
import { ITMLViewConfig, ReportSearch } from '../report.data';
import { SearchPane } from './search.data';
import { ContextService } from 'src/app/core/context/context.service';
import { reportConfig } from 'src/app/configs/search-input';
import { ComplaintFinder } from 'src/app/models/complaint';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  viewToggle = false;
  view: string;
  viewConfig: ITMLViewConfig;
  sControl: SearchPane;
  
  @Output() searchParams = new EventEmitter<ReportSearch>();

  constructor(private dataService: DataService, private context: ContextService) { }

  ngOnInit() {
    this.sControl = this.context.preferOldSearchPaneData();
    const searchData = this.context.getSearchData();
    this.viewToggle = searchData ? ((searchData.activeView === 'Chart View') ? false : true) : false;
    this.setView();
    this.viewConfig = reportConfig;
    if (this.sControl.complaint.selectedVal) {
      return;
    }

    this.sControl.mis.data = ['None', 3, 12, 24];   
    this.dataService.getModels().subscribe(data => this.sControl.models.data = data);
    this.sControl.complaint.instance.valueChanges.pipe(
      filter(text => text.length >= 4 && !this.getPredictionObject(text, 'Complaint_Group')),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap((text) => this.dataService.searchComplaintGroup(text))
    ).subscribe((data: any)=> {
      this.sControl.complaint.data = data.data;
    });

    this.sControl.models.instance.valueChanges.subscribe(data => this.sControl.models.selectedVal = data);
    this.sControl.mis.instance.valueChanges.subscribe(data => this.sControl.mis.selectedVal = data);
    this.sControl.from.instance.valueChanges.subscribe(data =>  this.sControl.from.selectedVal = data);
    this.sControl.to.instance.valueChanges.subscribe(data => this.sControl.to.selectedVal = data);
  }

  getPredictionObject(text: string, keyToSearch: string) {
    return this.sControl.complaint.data.find((data) => {
      return data[keyToSearch] === text;
    });
  }
  
  onViewChange() {
    this.viewToggle = !this.viewToggle;
    this.setView();
    this.search();
  }

  setView() {
    this.view = this.viewToggle ? 'Table View' : 'Chart View';
  }

  search() {
    this.sControl.complaint.selectedVal = this.sControl.complaint.instance.value;
    if (this.sControl.complaint.selectedVal) {
     const complaint = this.getPredictionObject(this.sControl.complaint.selectedVal, 'Complaint_Group');
     if (complaint) {
      const apiparams: ComplaintFinder = {
        complaintGroupCode: this.sControl.complaint.selectedVal,
        models: this.sControl.models.selectedVal,
        from: this.sControl.from.selectedVal,
        to: this.sControl.to.selectedVal
      }
      
      if ( this.sControl.mis.selectedVal !== 'None') {
        apiparams.mis = this.sControl.mis.selectedVal;
      }
      const params: ReportSearch = {
          viewConfig: this.viewConfig,
          complaintGroupDesc: complaint.Complaint_Group_Description,
          apiparams,
          activeView: this.view
        }
        this.context.setSearchPaneData(this.sControl);
        this.searchParams.emit(params)
      }
    }
  }
}
