import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/core/data/data.service';
import { IReportConfig, ReportSearch } from '../report.data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  complaintGroupSearchControl = new FormControl('');
  complaintGroups: any = [];

  modelsControl = new FormControl('');
  modelsGroup: Array<string> = [];
  selectedModels: Array<string> = []

  reportConfig: IReportConfig;
  optionSelected = false;
  @Output() searchParams = new EventEmitter<ReportSearch>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getModels().subscribe(data => this.modelsGroup = data);
    this.reportConfig = {
      groups: [
        {
          label: "Complaint Aggregate by Modal",
          groupBy: 'Model',
          aggregateFields: ['No_of_Complaints', 'Total_Expenses']
        },
        {
          label: "Complaint Aggregate by Production Month",
          groupBy: 'Production_Month',
          aggregateFields: ['No_of_Complaints', 'Total_Expenses']
        },
        {
          label: "Complaint Aggregate by Dealer",
          groupBy: 'Dealer_Code_Description',
          aggregateFields: ['No_of_Complaints', 'Total_Expenses'],
        },
        {
          label: "Complaint Aggregate by Deler's city",
          groupBy: 'Dealer_City',
          aggregateFields: ['No_of_Complaints', 'Total_Expenses']
        }
      ]
    }

   this.complaintGroupSearchControl.valueChanges.pipe(
      filter(text => text.length >= 4 && !this.getPredictionObject(text, 'Complaint_Group')),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap((text) => this.dataService.searchComplaintGroup(text))
    ).subscribe((data: any)=> {
      this.complaintGroups = data.data;
    });

    this.modelsControl.valueChanges.subscribe(data => this.selectedModels = data);
  }

  getPredictionObject(text: string, keyToSearch: string) {
    return this.complaintGroups.find((data) => {
      return data[keyToSearch] === text;
    });
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
            models: this.selectedModels
          },
          view: 'table'
        }
        this.searchParams.emit(params)
      }
    }
  }
}
