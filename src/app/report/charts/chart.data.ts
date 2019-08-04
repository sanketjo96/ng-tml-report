import { Contributors } from '../report.data';

export enum ChartType {
    line="line",
    bar="bar",
    pie="pie"
}

export interface IHighlight {
    name?: Contributors;
    data?: number;
    matchedLabels?: Array<string>;
    tabularize?: boolean;
}

export interface ISummary {
    ccode?: string;
    ccdes?: string;
    model?: string;
    charts?: Array<TMLChartData>;
}

export interface Dset {
    data?: Array<number>;
    backgroundColor?: Array<string>;
    label?: string;
    yAxisID?: string;
    type?: ChartType;
    fill?: boolean;
    showMesureOnTop?: boolean;
    borderWidth?: number;
} 

export interface TMLChartData {
    header?: string;
    title?: string;
    chartType?: ChartType;
    datasets?: Array<Dset>;
    labels?: Array<string>
    options?: Array<any>;
    legend?: boolean;
    highlights?: Array<IHighlight>;
    width?: string
}