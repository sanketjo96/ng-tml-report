import { ITMLViewConfig, SortDirection } from '../report.data';
import { FormControl } from '@angular/forms';

export class SearchControl {
    instance: FormControl;
    data?: Array<any>;
    selectedVal?: any

    constructor(instance?, data?, predictionList?, selectedList?, selectedVal?) {
        this.instance = instance || new FormControl();
        this.data = (data && data.length) ? data : [];
        this.selectedVal = selectedVal || undefined;
    }
}

export class SearchPane {
    complaint: SearchControl;
    models: SearchControl;
    mis: SearchControl;
    from: SearchControl;
    to: SearchControl;

    constructor(complaint: SearchControl, models: SearchControl, mis: SearchControl, from: SearchControl, to: SearchControl) {
        this.complaint = complaint;
        this.models = models;
        this.mis = mis;
        this.from = from;
        this.to = to;
    }
}


export const reportConfig: ITMLViewConfig = {
    views: [
        {
            label: "Aggregate by Models",
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
            label: "Aggregate by Dealer",
            dimension: 'Dealer_Name',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            }
        },
        {
            label: "Aggregate by Deler's city",
            dimension: 'Dealer_City',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            }
        },
        {
            label: "Aggregate by Complaint Month",
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
            label: "Aggregate by Production Month",
            dimension: 'Production_Month',
            measures: ['No_of_Complaints', 'Total_Expenses'],
            table: {
                defaultSortmeasure: {
                    name: 'No_of_Complaints',
                    direction: SortDirection.desc
                }
            }
        }
    ]
}
