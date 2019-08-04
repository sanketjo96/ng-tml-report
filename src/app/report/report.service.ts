import { Injectable } from '@angular/core';
import { Complaint, ComplainList } from '../models/complaint';
import { ITMLViewConfig, Contributors, ReportSearch, ICustomMesure } from './report.data';
import { UtilService } from '../core/util/util.service';
import { Dset, TMLChartData, ChartType, IHighlight } from './charts/chart.data';

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
                acc[dimension][dimensionVal] = acc[dimension][dimensionVal] || {};

                // Aggregating mesures values according to
                // match
                const measures = view.measures;
                if (measures && measures.length) {
                    for (let j = 0; j < measures.length; j++) {
                        let currentMesure = measures[j];
                        let mesureName = currentMesure.name;
                        let rule = currentMesure.rule;
                        acc[dimension][dimensionVal][mesureName] = acc[dimension][dimensionVal][mesureName] || 0;
                        acc[dimension][dimensionVal][mesureName] += (rule && Object.keys(rule).length)
                            ? this.getCustomMesureValue(item, rule)
                            : parseInt(item[mesureName], 10)
                            ;
                    }
                }
            }
            return acc;
        }, {});
    }

    /**
     * 
     * @param config 
     */
    getCustomMesureValue(data, rule) {
        let mesureValue = 0;
        let conditionalMesure = rule.condition.mesure;
        let conditionalMesureVal = rule.condition.value;
        if (
            conditionalMesure
            && conditionalMesureVal === data[conditionalMesure]
        ) {
            mesureValue = data[rule.primaryMesure];
        }

        return mesureValue;
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
        for (let k = 0; k < viewsLength; k++) {
            const col = [];
            const view = views[k];
            col.push(view.dimension);
            const updatedCol = col.concat(view.measures.map((item) => item.name));
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

    getChartDataSetObject(type: ChartType, label, fill: boolean, yAxisID?, data?: any): Dset {
        let dataset: Dset = {};
        dataset.type = type;
        dataset.fill = fill;
        dataset.data = data ? data : [];
        dataset.label = label ? label : '';
        dataset.yAxisID = yAxisID ? yAxisID : '';
        return dataset;
    }


    getChartsDataSet(config: ITMLViewConfig): Array<TMLChartData> {
        let charts: Array<TMLChartData> = [];
        for (let k = 0; k < config.views.length; k++) {
            const view = config.views[k];
            const mesuresToPlot: Array<ICustomMesure> = (view.chart && view.chart.mesureToPlot)
                ? view.chart.mesureToPlot
                : [view.measures[0]]
            ;

            for (let mesure of mesuresToPlot) {
                let chart: TMLChartData = {};
                chart.chartType = ChartType.bar;
                chart.title = '';
                chart.header = `${mesure.name} - ${view.label}`;
                chart.legend = true;
                chart.datasets = [];

                const dimension = view.dimension;
                const currentDimData = this.groupedData[dimension];

                let dataset = this.getChartDataSetObject(
                    ChartType.bar,
                    mesure.name,
                    true,
                    'left'
                );

                const sorted = this.sortDecendingByMesure(currentDimData, mesure.name);
                let paratoData: Dset;
                let closestParatoIndex;
                if ((!view.chart || !view.chart.noParato) && sorted.data.length > 1) {
                    paratoData = this.getParatoDataSet(sorted.data);
                    const closestParatoData = this.util.getClosestNumber(paratoData.data, 80);
                    closestParatoIndex = paratoData.data.indexOf(closestParatoData);
                    paratoData.borderWidth = 1;
                    // Push line chart data here.
                    chart.datasets.push(paratoData);
                }

                // Push bar chart data with coloring info here.
                dataset.data = sorted.data;
                const fillIndex = closestParatoIndex ? (closestParatoIndex + 1) : dataset.data.length;
                dataset.backgroundColor = new Array(dataset.data.length).fill('rgba(0, 0, 255, 0.4)', 0, fillIndex);
                dataset.showMesureOnTop = true;
                chart.datasets.push(dataset);
                chart.labels = sorted.labels;
                const estimateWidth = (chart.labels.length * 50);
                chart.width = (estimateWidth <= 600) ? '600px' : (estimateWidth + 'px');

                // If user selects a single model, app provides
                // quick summary with highlights 
                if (
                    view.chart
                    && view.chart.summary
                    && view.chart.summary.contributors
                    && view.chart.summary.contributors.length
                ) {
                    chart.highlights = this.getSummary(
                        view.chart.summary.contributors,
                        chart.labels,
                        dataset.data,
                        closestParatoIndex ? closestParatoIndex : undefined
                    );
                }
                charts.push(chart);
            }
        }
        return charts;
    }

    getSummary(criterias: Array<Contributors>, labels: Array<string>, data: any, closestParatoIndex: number): Array<IHighlight> {
        const higlights: Array<IHighlight> = [];
        for (let criteria of criterias) {
            const indicator: IHighlight = {};
            indicator.name = criteria;
            indicator.tabularize = true;

            switch (criteria) {
                case Contributors.topContributer: {
                    const topData = data[0];
                    indicator.data = topData;
                    indicator.matchedLabels = this.findPossibleLabelsForMesure(data, labels, topData);
                    break;
                }
                case Contributors.bottomContributor: {
                    const botData = data[data.length - 1];
                    indicator.data = botData;
                    indicator.matchedLabels = this.findPossibleLabelsForMesure(data, labels, botData);
                    break;
                }
                case Contributors.eightyPerContributors: {
                    if (closestParatoIndex) {
                        indicator.matchedLabels = this.findPossibleLabelsForMesure(data, labels, null, closestParatoIndex);
                    }
                    break;
                }
                case Contributors.repeatContributor: {
                    const firstIndexWhereMesureValIsOne = data.indexOf(1);
                    indicator.matchedLabels = this.findPossibleLabelsForMesure(data, labels, null, firstIndexWhereMesureValIsOne - 1);
                    break;
                }
            }
            higlights.push(indicator);
        }
        return higlights;
    }

    findPossibleLabelsForMesure(data: any, labels: any, mesureVal: number, upToIndex?: number) {
        return data.map((value, index) => {
            if (
                value === mesureVal
                || (upToIndex && upToIndex >= index)
            ) {
                let label = labels[index];
                const mesure = mesureVal ? mesureVal : value;
                label += ` (${mesure} complaints)`;
                return label;
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

        const sorted = unsorted.sort(function (a, b) {
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

    isOnlyViewSettingChanged(oldParams: ReportSearch, newParams: ReportSearch): boolean {
        let oldVal: ReportSearch = JSON.parse(JSON.stringify(oldParams));
        let newVal: ReportSearch = JSON.parse(JSON.stringify(newParams));
        oldVal.activeView = '';
        newVal.activeView = '';
        return JSON.stringify(oldVal) === JSON.stringify(newVal);
    }
}