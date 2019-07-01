import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/core/context/context.service';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../details.service';
import { ISortCol, SortDirection } from 'src/app/report/report.data';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  detailsLabel: string;
  detailsGridData: any;
  selectedComplaints: any;
  cols: Array<any>;
  defaultColToSort: ISortCol = {name: 'Dealer_Name', direction: SortDirection.desc};

  constructor(private context: ContextService, private activeRoute: ActivatedRoute, private details: DetailsService) { }

  ngOnInit() {
    this.cols = ['Dealer_Name', 'VC_Number', 'VC_Description', 'Model', 'Production_Month', 'Customer_Complaint', 'Investigation']
    this.activeRoute.paramMap.subscribe((params: any) => {
      const paramKey = Object.keys(params.params)[0];
      this.detailsLabel = `Complaints where ${paramKey} - ${params.params[paramKey]}`;
      this.detailsGridData = this.details.returnDetailsResultSet(
        params.params,
        this.context.getComplaintDetails()
      );
    });
  }

}
