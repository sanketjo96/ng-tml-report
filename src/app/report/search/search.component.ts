import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/core/data/data.service';
import { IReportConfig, ReportSearch } from '../report.data';
import { reportConfig } from './search.config';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  viewToggle = true;
  view = 'Table View';
 
  complaintGroupSearchControl = new FormControl('');
  complaintGroups: any = [];

  modelsControl = new FormControl('');
  modelsGroup: Array<string> = [];
  selectedModels: Array<string> = []

  misControl = new FormControl('');
  misGroup: Array<number> = [3, 6, 9, 12, 15, 18, 21, 24];
  selectedMis: number

  fromComplaintDateControl = new FormControl();
  selectedFromDate: Date;
  
  toComplaintDateControl = new FormControl();
  selectedToDate: Date;

  reportConfig: IReportConfig;
  optionSelected = false;
  @Output() searchParams = new EventEmitter<ReportSearch>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getModels().subscribe(data => this.modelsGroup = data);
    this.reportConfig = reportConfig;

   this.complaintGroupSearchControl.valueChanges.pipe(
      filter(text => text.length >= 4 && !this.getPredictionObject(text, 'Complaint_Group')),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap((text) => this.dataService.searchComplaintGroup(text))
    ).subscribe((data: any)=> {
      this.complaintGroups = data.data;
    });

    this.modelsControl.valueChanges.subscribe(data => this.selectedModels = data);
    this.misControl.valueChanges.subscribe(data => this.selectedMis = data);

    this.fromComplaintDateControl.valueChanges.subscribe(data => this.selectedFromDate = data);
    this.toComplaintDateControl.valueChanges.subscribe(data => this.selectedToDate = data);
  }

  getPredictionObject(text: string, keyToSearch: string) {
    return this.complaintGroups.find((data) => {
      return data[keyToSearch] === text;
    });
  }
  
  onViewChange() {
    this.viewToggle = !this.viewToggle;
    this.view = this.viewToggle ? 'Table View' : 'Chart View';
    this.search();
  }

  search() {
    const selectedComplaintGroupCode = this.complaintGroupSearchControl.value;
    if (selectedComplaintGroupCode) {
     const complaint = this.getPredictionObject(selectedComplaintGroupCode, 'Complaint_Group');
     if (complaint) { 
      const params: ReportSearch = {
          colConfig: this.reportConfig,
          complaintPrams: {
            complaintGroupCode: selectedComplaintGroupCode,
            complaintGroupDesc: complaint.Complaint_Group_Description,
            models: this.selectedModels,
            mis: this.selectedMis,
            from: this.selectedFromDate,
            to: this.selectedToDate
          },
          view: this.view
        }
        this.searchParams.emit(params)
      }
    }
  }
}
