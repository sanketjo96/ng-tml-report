import { Injectable } from '@angular/core';
import { IComplaint } from '../models/complaint';
import { IReportConfig, GroupByTransform } from './report.data';
import { UtilService } from '../core/util/util.service';
import { Dset, TMLChartData, ChartType } from './charts/chart.data';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    groupedData: any;
    dataCategories: Array<string> = [];
    constructor(private util: UtilService) { }

    getGroupedData(data: Array<IComplaint>, reportConfig: IReportConfig) {
        this.groupedData = data.reduce((acc, item: IComplaint) => {
            for (let i = 0; i < reportConfig.groups.length; i++) {
                const group = reportConfig.groups[i].groupBy;
                acc[group] = acc[group] || {}

                let groupKey = item[group];
                if (reportConfig.groups[i].groupByTransform) {
                    groupKey = this.groupByTransform(reportConfig.groups[i].groupByTransform, groupKey)
                }
                acc[group][groupKey] = acc[group][groupKey] || {};

                const aggregateFields = reportConfig.groups[i].aggregateFields
                if (aggregateFields && aggregateFields.length) {
                    for (let j = 0; j < aggregateFields.length; j++) {
                        acc[group][groupKey][aggregateFields[j]] = acc[group][groupKey][aggregateFields[j]] || 0;
                        acc[group][groupKey][aggregateFields[j]] += parseInt(item[aggregateFields[j]], 10);
                    }
                }
            }
            return acc;
        }, {});
        this.dataCategories = Object.keys(this.groupedData);
    }

    groupByTransform(name: GroupByTransform, value) {
        let transformedGroupName;
        switch (name) {
            case GroupByTransform.toTMLDate: {
                const date = new Date(parseInt(value, 10));
                const year = date.getFullYear();
                const month = this.util.getMonthFromIndex(date.getMonth());
                transformedGroupName = `${month}-${year}`;
                break;
            }
        }
        return transformedGroupName;
    }

    getTableSetCols(data: IReportConfig) {
        const tablescol = [];
        for (let k=0; k< data.groups.length; k++) {
            const col = [];
            col.push(data.groups[k].groupBy);
            const updatedCol = col.concat(data.groups[k].aggregateFields);
            tablescol.push(updatedCol);
        }
        return tablescol;
    }

    getTablesDataSet(): Array<Array<any>> {
        const tables = [];
        const tableNames = this.dataCategories;
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

    getChartsDataSet(data: IReportConfig): Array<TMLChartData> {
        let charts: Array<TMLChartData> = [];
        for (let k=0; k< data.groups.length; k++) {
            let chart: TMLChartData = {};
            const group = data.groups[k];
            chart.chartType = ChartType.bar;
            chart.title = group.label;
            chart.legend = true;
            chart.datasets = [];

            const chartData = this.groupedData[group.groupBy];
            const valueField = group.aggregateFields;
            for(let j=0; j < 1; j++) {
                let dataset: Dset = {};
                dataset.label = valueField[j];
                const sorted = this.getSortedChartData(chartData, dataset.label);
                const sets = sorted.reduce((acc, chunk) => {
                    acc[0].push(chunk[0]);
                    acc[1].push(chunk[1]);
                    return acc;
                }, [[], []]);
  
                dataset.data = sets[1];
                chart.datasets.push(dataset);
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
}
