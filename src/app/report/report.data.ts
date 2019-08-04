import { SearchPane } from './search/search.data';
import { ComplaintFinder } from '../models/complaint';

export enum Contributors {
    topContributer="Top Contributor",
    eightyPerContributors='80% Contribution',
    bottomContributor='Bottom Contributor',
    repeatContributor='Repeat Contributor',
}

export interface ICustomMesure {
    name: string,
    rule?: {
        primaryMesure: string;
        condition: {
            mesure: string
            value: string
        }
    }
}

export interface Summary {
    contributors: Array<Contributors>;
} 

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
    mesureToPlot: Array<ICustomMesure>;
    noParato?: boolean;
    summary?: Summary;
}


interface IView {
    label: string;
    dimension: string,
    measures: Array<ICustomMesure>,
    table?: ITable;
    chart?: IChart;
}

export interface ITMLViewConfig {
    views: Array<IView>
}


export interface ReportSearch {
    complaintGroupDesc?: string,
    viewConfig: ITMLViewConfig,
    apiparams: ComplaintFinder,
    activeView: string
}
