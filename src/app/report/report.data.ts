import { IComplaintFinder } from '../models/complaint';

interface IReportGroup {
    label: string;
    groupBy: string;
    aggregateFields: Array<string>;
    uniqueListFields?: Array<string>
}

export interface IReportRequirements {
    groups: Array<IReportGroup>
}


export interface ReportSearch {
    colConfig: IReportRequirements,
    complaintPrams: IComplaintFinder
    view: string
}

export enum ReportMap {
    Dealer_City="Dealer City",
    Dealer_Code_Description="Dealer Name",
    Model="Model",
    Sale_Month="Sale Month"
}