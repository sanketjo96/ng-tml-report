import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    children: [
      {
        path: 'table',
        component: TableComponent,
      },
      {
        path: 'chart',
        component: ChartComponent,
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
