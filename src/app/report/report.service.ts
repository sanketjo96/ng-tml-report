import { Injectable } from '@angular/core';
import { Complaint, ComplainList } from '../models/complaint';
import { ITMLViewConfig } from './report.data';
import { UtilService } from '../core/util/util.service';
import { Dset, TMLChartData, ChartType } from './charts/chart.data';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    rawData: Array<Complaint> = [];
    groupedData: any;

    constructor(private util: UtilService) { }

    getGroupedData(data: Array<Complaint>, reportConfig: ITMLViewConfig) {
        this.rawData = this.rawData.length ? this.rawData : new ComplainList(data, this.util).list;
        
        this.groupedData = this.rawData.reduce((acc, item: Complaint) => {
            for (let i = 0; i < reportConfig.views.length; i++) {
                // Adding dimention as a master key to object
                // example: Complaint_Month
                const view = reportConfig.views[i];
                const dimension =view.dimension;
                acc[dimension] = acc[dimension] || {}

                // Adding various dimention values as a sub key to object
                // example: Complaint_Month > JSN, FEB, MAR
                let dimensionVal = item[dimension];
                acc[dimension][dimensionVal] =  acc[dimension][dimensionVal] || {};

                // Aggregating mesures values according to
                // match
                const measures =view.measures;
                if (measures && measures.length) {
                    for (let j = 0; j < measures.length; j++) {
                        acc[dimension][dimensionVal][measures[j]] = acc[dimension][dimensionVal][measures[j]] || 0;
                        acc[dimension][dimensionVal][measures[j]] += parseInt(item[measures[j]], 10);
                    }
                }
            }
            return acc;
        }, {});
    }

    getTableSetCols(config: ITMLViewConfig) {
        const tablescol = [];
        for (let k=0; k< config.views.length; k++) {
            const col = [];
            const view = config.views[k]; 
            col.push(view.dimension);
            const updatedCol = col.concat(view.measures);
            tablescol.push(updatedCol);
        }
        return tablescol;
    }

    getTablesDataSet(): Array<Array<any>> {
        const tables = [];
        const tableNames = Object.keys(this.groupedData);
        for (let i = 0; i < tableNames.length; i++) {
            const table = this.groupedData[tableNames[i]];
            const tablePrimaryCol = Object.keys(table);
            const tablerows = []
            for (let j = 0; j < tablePrimaryCol.length; j++) {
                const row = table[tablePrimaryCol[j]];
                row[tableNames[i]] = tablePrimaryCol[j];
                tablerows.push(row)
            }
            tables.push(tablerows)
        }
        return tables;
    }

    getChartsDataSet(config: ITMLViewConfig): Array<TMLChartData> {
        let charts: Array<TMLChartData> = [];
        for (let k=0; k< config.views.length; k++) {
            let chart: TMLChartData = {};
            const view = config.views[k];
            chart.chartType = ChartType.bar;
            chart.title = view.label;
            chart.legend = true;
            chart.datasets = [];

            const dimension = view.dimension;
            const mesures = view.measures;
            const currentDimData = this.groupedData[dimension];
  
            for(let j=0; j < 1; j++) {
                let dataset: Dset = {};
                dataset.label = mesures[j];
                const sorted = this.getSortedChartData(currentDimData, dataset.label);
                const sets = sorted.reduce((acc, chunk) => {
                    acc[0].push(chunk[0]);
                    acc[1].push(chunk[1]);
                    return acc;
                }, [[], []]);
  
                dataset.data = sets[1];
                dataset.yAxisID = 'left';
                chart.datasets.push(dataset);

                // Add parato data set
                chart.datasets.push(this.getParatoDataSet(dataset.data));

                chart.labels = sets[0];
            }
            charts.push(chart);
        }
        return charts;
    }

    getSortedChartData(chartData: any, sortOn: string) {
        const unsorted = [];
        for (var key in chartData) {
            unsorted.push([key, chartData[key][sortOn]]);
        }

       return unsorted.sort(function(a, b) {
            return b[1] - a[1];
        });
    }

    getParatoDataSet(baseData: Array<number>): Dset {
        let paratoDataset: Dset = {};
        paratoDataset.type = ChartType.line;
        paratoDataset.yAxisID = 'right';
        paratoDataset.label = 'Parato indicator';
        const sum = baseData.reduce((acc, number) => {
            acc += number;
            return acc;
        }, 0);
        paratoDataset.data = this.getCumulativePercentage(baseData, sum);
        return paratoDataset;
    }

    getCumulativePercentage(list: Array<number>, sum: number): Array<number> {
        const cumPer = [];
        list.reduce((acc, number) => {
            acc += number;
            cumPer.push((acc / sum) * 100);
            return acc;
        }, 0);

        return cumPer;
    }
}