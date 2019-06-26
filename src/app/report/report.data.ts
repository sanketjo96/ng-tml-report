import { IComplaintFinder } from '../models/complaint';

interface IReportGroup {
    label: string;
    groupBy: string;
    aggregateFields: Array<string>;
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
