import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupDetailsRoutingModule } from './group-details-routing.module';
import { DetailsComponent } from './details/details.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    GroupDetailsRoutingModule
  ],
  exports: [DetailsComponent]
})
export class GroupDetailsModule { }
