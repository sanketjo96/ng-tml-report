import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  monthLabels =  [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
  constructor() { }

  getMonthFromIndex(index) {
    return this.monthLabels[index];
  }
}
