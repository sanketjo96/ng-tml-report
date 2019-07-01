import { SortDirection, ITMLViewConfig, Contributors } from '../report/report.data';

export const reportConfig: ITMLViewConfig = {
    views: [
        {
            label: "MIS wise",
            dimension: 'mis',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                noParato: true,
            },
        },
        {
            label: "Models wise",
            dimension: 'Model',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            }
        },
        {
            label: "Kms wise",
            dimension: 'km_buckets',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
            }
        },
        {
            label: "Chassis_No wise",
            dimension: 'Chassis_No',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
            }
        },
        {
            label: "Dealer wise",
            dimension: 'Dealer_Name',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                summary: {
                    contributors: [
                        Contributors.topContributer,
                        Contributors.eightyPerContributors
                    ]
                }
            }
        },
        {
            label: "Deler's city wise",
            dimension: 'Dealer_City',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                summary: {
                    contributors: [
                        Contributors.topContributer,
                        Contributors.eightyPerContributors
                    ]
                }
            }
        },
        {
            label: "Complaint Month wise",
            dimension: 'Complaint_Month',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            }
        },
        {
            label: "Production Month wise",
            dimension: 'Production_Month',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                summary: {
                    contributors: [
                        Contributors.topContributer,
                        Contributors.eightyPerContributors
                    ]
                }
            }
        }
    ]
}