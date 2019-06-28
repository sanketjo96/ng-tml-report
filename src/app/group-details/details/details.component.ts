import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/core/context/context.service';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  detailsGridData: any;
  selectedComplaints: any;
  cols: Array<any>;

  constructor(private context: ContextService, private activeRoute: ActivatedRoute, private details: DetailsService) { }

  ngOnInit() {
    this.cols = ['Dealer_Code_Description', 'VC_Number', 'Model', 'Production_Month', 'Customer_Complaint', 'Investigation', 'Action_Taken']
    this.activeRoute.paramMap.subscribe((params: any) => {
      this.detailsGridData = this.details.returnDetailsResultSet(
        params.params,
        this.context.getComplaintDetails()
      );
    });
  }

}
