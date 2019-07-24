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
  detailsLabel: string;
  detailsCardData: any;
  selectedComplaints: any;

  constructor(private context: ContextService, private activeRoute: ActivatedRoute, private details: DetailsService) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: any) => {
      const paramKey = Object.keys(params.params)[0];
      this.detailsLabel = `Complaints where ${paramKey} - ${params.params[paramKey]}`;
      this.detailsCardData = this.details.returnDetailsResultSet(
        params.params,
        this.context.getComplaintDetails()
      );
    });
  }

}
