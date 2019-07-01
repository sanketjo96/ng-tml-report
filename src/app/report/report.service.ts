import { Injectable } from '@angular/core';
import { Complaint, ComplainList } from '../models/complaint';
import { ITMLViewConfig, Summary, Contributors } from './report.data';
import { UtilService } from '../core/util/util.service';
import { Dset, TMLChartData, ChartType } from './charts/chart.data';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    rawData: Array<Complaint> = [];
    groupedData: any;

    constructor(private util: UtilService) { }

    /**
     * Group the data (of aggregate messures) according to
     * dimesions provided in reportConfig
     */
    getGroupedData(data: Array<Complaint>, reportConfig: ITMLViewConfig) {
        this.rawData = new ComplainList(data, this.util).list;

        this.groupedData = this.rawData.reduce((acc, item: Complaint) => {
            for (let i = 0; i < reportConfig.views.length; i++) {
                // Adding dimention as a master key to object
                // example: Complaint_Month
                const view = reportConfig.views[i];
                const dimension = view.dimension;
                acc[dimension] = acc[dimension] || {}

                // Adding various dimention values as a sub key to object
                // example: Complaint_Month > JSN, FEB, MAR
                let dimensionVal = item[dimension];
                acc[dimension][dimensionVal] =  acc[dimension][dimensionVal] || {};

                // Aggregating mesures values according to
                // match
                const measures = view.measures;
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

    /**
     * 
     * Retunrs possible coloumns for required
     * tables. Table info has been specified in
     * ITMLViewConfig
     */
    getTableSetCols(config: ITMLViewConfig) {
        const tablescol = [];
        const views = config.views;
        const viewsLength = views.length;
        for (let k=0; k < viewsLength; k++) {
            const col = [];
            const view = views[k]; 
            col.push(view.dimension);
            const updatedCol = col.concat(view.measures);
            tablescol.push(updatedCol);
        }
        return tablescol;
    }

    /**
     * Material table needs the data in a specific way
     * transforming grouped data for table view
     */
    getTablesDataSet(): Array<Array<any>> {
        const tables = [];
        for (let dimention in this.groupedData) {
            const tableData = this.groupedData[dimention];
            
            const table = []
            for (let dimensionVal in tableData) {
                const mesures = tableData[dimensionVal];
                
                // Constructing table row by adding
                // dim and mesures
                const tableRow = {
                    [dimention]: dimensionVal,
                    ...mesures
                };
                table.push(tableRow);
            }
            tables.push(table);
        }

        return tables;
    }

    getChartDataSetObject(type: ChartType, label, fill: boolean, yAxisID?, data?: any) {
        let dataset: Dset = {};
        dataset.type = type;
        dataset.fill = fill;
        dataset.data = data ? data : [];
        dataset.label = label ? label : '';
        dataset.yAxisID = yAxisID ? yAxisID: '';
        return dataset;
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
            const currentDimData = this.groupedData[dimension];
            const mesuresToPlot = (view.chart && view.chart.mesureToPlot) 
                ? view.chart.mesureToPlot 
                : [view.measures[0]]
            ;

            for (let mesure of mesuresToPlot) {
                let dataset = this.getChartDataSetObject(
                    ChartType.bar,
                    mesure,
                    true,
                    'left'
                );

                const sorted = this.sortDecendingByMesure(currentDimData, mesure);
                dataset.data = sorted.data;
                chart.datasets.push(dataset);

                let paratoData;
                if (!view.chart || !view.chart.noParato) {
                    paratoData = this.getParatoDataSet(dataset.data);
                    chart.datasets.push(paratoData);
                }
                chart.labels = sorted.labels;
                
                if (
                    view.chart 
                    && view.chart.summary 
                    && view.chart.summary.contributors
                    && view.chart.summary.contributors.length
                ) {
                    chart.summary = this.getSummary(
                        view.chart.summary.contributors,
                        chart.labels,
                        dataset.data,
                        paratoData && paratoData.data ? paratoData.data : null
                    );
                }

            }
            charts.push(chart);
        }
        return charts;
    }

    getSummary(criterias: Array<Contributors>, labels: any, data: any, paratoData: any): Array<any> {
        var summary = [];
        for (let criteria of criterias) {
            const indicator: any = {};
            indicator.name = criteria; 
 
            switch (criteria) {
                case Contributors.topContributer: {
                    const topData = data[0];
                    indicator.data = topData;
                    indicator.matchedLabels = this.getAllLabelsForMesures(labels, topData, data);
                    break;
                }
                case Contributors.bottomContributor: {
                    const botData = data[data.length - 1];
                    indicator.data = botData;
                    indicator.matchedLabels = this.getAllLabelsForMesures(labels, botData, data); 
                    break;
                }
                case Contributors.eightyPerContributors: {
                    if (paratoData) {
                        const closestParatoData = this.util.getClosestNumber(paratoData, 80);
                        const closestParatoIndex = paratoData.indexOf(closestParatoData);
                        const eightyPerData = data[closestParatoIndex];
                        indicator.matchedLabels = this.getAllLabelsForMesures(labels, eightyPerData, data, true, closestParatoIndex);
                    }
                    break;
 
                }
            }
            summary.push(indicator);
        }
        return summary;
    }

    getAllLabelsForMesures(labels: any, mesureVal: number, data: any, lte: boolean = false, upToIndex?: number) {
        return data.map((item, index) => {
            if (
                item === mesureVal
                || (lte && item >= mesureVal)
            ) {
                if(
                    !upToIndex
                    || (upToIndex >= index)
                ) {
                    let label = labels[index];
                    if (!lte) {
                        label += ` (${mesureVal} complaints)`;
                    }
                    return label; 
                }
            }
        }).filter(data => data);
    }

    /**
     * Sort chart data descedingly by
     * given mesure
     */
    sortDecendingByMesure(chartData: any, mesure: string) {
        const unsorted = [];

        for (let dimensionVal in chartData) {
            unsorted.push([dimensionVal, chartData[dimensionVal][mesure]]);
        }

       const sorted = unsorted.sort(function(a, b) {
            return b[1] - a[1];
        });

        const sortedData = {
            labels: [],
            data: []
        }

        return sorted.reduce((acc, chunk) => {
            acc.labels.push(chunk[0]);
            acc.data.push(chunk[1]);
            return acc;
        }, sortedData);
    }

    /**
     * Generates points for parato plotting
     */
    getParatoDataSet(baseData: Array<number>): Dset {
        let paratoDataset = this.getChartDataSetObject(
            ChartType.line,
            'Parato indicator',
            false,
            'right',
        );
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