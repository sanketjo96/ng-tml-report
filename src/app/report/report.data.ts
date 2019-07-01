import { SearchPane } from './search/search.data';

export enum Contributors {
    topContributer="Top Contributor",
    bottomContributor='Bottom Contributor',
    eightyPerContributors='80% Contribution',
    topThreeContributors='Top three Contributors',
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
    mesureToPlot?: Array<string>;
    noParato?: boolean;
    summary?: Summary;
}

interface IView {
    label: string;
    dimension: string,
    measures: Array<string>,
    table?: ITable;
    chart?: IChart;
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
