import { IReportConfig, GroupByTransform } from '../report.data';

export const reportConfig: IReportConfig = {
    groups: [
        {
            label: "Aggregate by Complaint Month",
            groupBy: 'Complaint_Month',
            groupByTransform: GroupByTransform.toTMLDate,
            aggregateFields: ['No_of_Complaints', 'Total_Expenses']
        },
        {
            label: "Aggregate by Models",
            groupBy: 'Model',
            aggregateFields: ['No_of_Complaints', 'Total_Expenses']
        },
        {
            label: "Aggregate by Production Month",
            groupBy: 'Production_Month',
            aggregateFields: ['No_of_Complaints', 'Total_Expenses']
        },
        {
            label: "Aggregate by Sale Month",
            groupBy: 'Sale_Month',
            aggregateFields: ['No_of_Complaints', 'Total_Expenses']
        },
        {
            label: "Aggregate by Dealer",
            groupBy: 'Dealer_Code_Description',
            aggregateFields: ['No_of_Complaints', 'Total_Expenses'],
        },
        {
            label: "Aggregate by Deler's city",
            groupBy: 'Dealer_City',
            aggregateFields: ['No_of_Complaints', 'Total_Expenses']
        }
    ]
}
