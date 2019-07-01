export enum ChartType {
    line="line",
    bar="bar",
    pie="pie"
}

export interface Dset {
    data?: Array<number>;
    label?: string;
    yAxisID?: string;
    type?: ChartType;
    fill?: boolean;
} 

export interface TMLChartData {
    title?: string;
    chartType?: ChartType;
    datasets?: Array<Dset>;
    labels?: Array<string>
    options?: Array<any>;
    legend?: boolean;
    summary?: Array<any>;
}