import { IComplaintFinder } from '../models/complaint';

export enum GroupByTransform {
    toTMLDate="toTMLDate",
}

interface IReportGroup {
    label: string;
    groupBy: string;
    groupByTransform?: GroupByTransform;
    aggregateFields?: Array<string>;
    uniqueListFields?: Array<string>
}

export interface IReportConfig {
    groups: Array<IReportGroup>
}


export interface ReportSearch {
    colConfig: IReportConfig,
    complaintPrams: IComplaintFinder
    view: string
}
