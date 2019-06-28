import { SearchPane } from './search/search.config';

export enum SortDirection {
    asc="asc",
    desc="desc"
}

export interface ISortCol {
    name: string;
    direction?: SortDirection
}

export interface ITable {
    defaultSortmeasure: ISortCol; 
}

export interface IChart {
    mesureToPlot?: Array<string>;
    noParato?: boolean;
}

export interface IcustomDimensionRule  {
    dimenstions: Array<string>,
    mesure: string,
    rule: Function
}

interface IView {
    label: string;
    dimension: string,
    measures: Array<string>,
    table?: ITable;
    chart?: IChart;
    customDimension?: IcustomDimensionRule;
}

export interface ITMLViewConfig {
    views: Array<IView>
}


export interface ReportSearch {
    complaintGroupDesc?: string,
    viewConfig: ITMLViewConfig,
    searchParams: SearchPane
    activeView: string,
    redirection: boolean;
}
