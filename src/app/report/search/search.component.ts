import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/core/data/data.service';
import { ITMLViewConfig, ReportSearch } from '../report.data';
import { reportConfig, SearchPane } from './search.config';
import { ContextService } from 'src/app/core/context/context.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  viewToggle = true;
  view = 'Table View';
  viewConfig: ITMLViewConfig;
  sControl: SearchPane;
  
  @Output() searchParams = new EventEmitter<ReportSearch>();

  constructor(private dataService: DataService, private context: ContextService) { }

  ngOnInit() {
    this.sControl = this.context.preferOldSearchPaneData();
    this.viewConfig = reportConfig;
    if (this.sControl.complaint.selectedVal) {
      this.search(true);
      return;
    }

    this.sControl.mis.data = [3, 6, 9, 12, 15, 18, 21, 24];   
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
    this.view = this.viewToggle ? 'Table View' : 'Chart View';
    this.search();
  }

  search(redirection = false) {
    this.sControl.complaint.selectedVal = this.sControl.complaint.instance.value;
    if (this.sControl.complaint.selectedVal) {
     const complaint = this.getPredictionObject(this.sControl.complaint.selectedVal, 'Complaint_Group');
     if (complaint) {
      const params: ReportSearch = {
          viewConfig: this.viewConfig,
          complaintGroupDesc: complaint.Complaint_Group_Description,
          searchParams: this.sControl,
          activeView: this.view,
          redirection
        }
        this.searchParams.emit(params)
      }
    }
  }
}
