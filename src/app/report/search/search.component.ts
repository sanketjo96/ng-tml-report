import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/core/data/data.service';
import { IReportRequirements, ReportSearch } from '../report.data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  complaintGroupSearchControl = new FormControl('');
  complaintGroups: any;
  reportConfig: IReportRequirements;
  @Output() searchParams = new EventEmitter<ReportSearch>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
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

    const typeahead = this.complaintGroupSearchControl.valueChanges.pipe(
      filter(text => text.length >= 4),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap((text) => this.dataService.searchComplaintGroup(text))
    );

    typeahead.subscribe((data: any)=> {
      this.complaintGroups = data.data;
    })
  }

  search() {
    if (this.complaintGroupSearchControl.value) {
      const params: ReportSearch = {
        colConfig: this.reportConfig,
        complaintPrams: {
          complaintGroupCode: this.complaintGroupSearchControl.value
        },
        view: 'table'
      }
      this.searchParams.emit(params)
    }
  }

}
