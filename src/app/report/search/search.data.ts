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