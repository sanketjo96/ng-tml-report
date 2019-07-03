import { Injectable } from '@angular/core';
import { TMLChartData, IHighlight } from '../charts/chart.data';

@Injectable({
  providedIn: 'root'
})
export class InferanceService {

  constructor() { }

  getContributorsTableData(data: Array<TMLChartData>): Array<IHighlight> {
    let tableData: Array<IHighlight> = [];
    for(let chart of data) {
        if (chart.highlights  && chart.highlights.length) {
          const row: any = {};
          for(let contributor of chart.highlights) {
            if (contributor.tabularize) {
              row['Dimention'] = chart.title
              row['col-list'] = true;
              row[contributor.name] = contributor.matchedLabels;
            }
          }
          tableData.push(row);
        }
      }
    return tableData;
  }

}
