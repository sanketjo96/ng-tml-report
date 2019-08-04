import { SortDirection, ITMLViewConfig, Contributors } from '../report/report.data';

const commonMesures = [
    {
        name: 'No_of_Complaints',
    },
    {
        name: 'Total_Expenses'
    },
    {
        name: 'Regular Claim Expenses',
        rule: {
            primaryMesure: 'Total_Expenses',
            condition: {
                mesure: 'Claims_Indicator',
                value: 'Regular Claims'
            }
        }
    },
    {
        name: 'Labour_Claims_Expenses',
        rule: {
            primaryMesure: 'Total_Expenses',
            condition: {
                mesure: 'Claims_Indicator',
                value: 'Labour Only Claims'
            }
        }
    }
];
const commonMesuresToPlot = [
    {
        name: 'No_of_Complaints'
    },
]
export const reportConfig: ITMLViewConfig = {
    views: [
        {
            label: "MIS wise",
            dimension: 'mis',
            measures: commonMesures,
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                mesureToPlot: [
                    {
                        name: 'No_of_Complaints'
                    },
                    {
                        name: 'Total_Expenses'
                    }
                ],
                noParato: true,
            },
        },
        {
            label: "Models wise",
            dimension: 'Model',
            measures: commonMesures,
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                mesureToPlot: [
                    {
                        name: 'No_of_Complaints'
                    },
                    {
                        name: 'Total_Expenses'
                    }
                ],
            }
        },
        {
            label: "Kms wise",
            dimension: 'km_buckets',
            measures: commonMesures,
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                mesureToPlot: commonMesuresToPlot,
                summary: {
                    contributors: [
                        Contributors.topContributer,
                    ]
                }
            }
        },
        {
            label: "Chassis_No wise",
            dimension: 'Chassis_No',
            measures: commonMesures,
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                mesureToPlot: commonMesuresToPlot,
                summary: {
                    contributors: [
                        Contributors.topContributer,
                        Contributors.eightyPerContributors
                    ]
                }
            }
        },
        {
            label: "Dealer wise",
            dimension: 'Dealer_Name',
            measures: commonMesures,
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                mesureToPlot: commonMesuresToPlot,
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
            measures: commonMesures,
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                mesureToPlot: commonMesuresToPlot,
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
            measures: commonMesures,
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                mesureToPlot: commonMesuresToPlot,
            }
        },
        {
            label: "Production Month wise",
            dimension: 'Production_Month',
            measures: commonMesures,
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            },
            chart: {
                mesureToPlot: commonMesuresToPlot,
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