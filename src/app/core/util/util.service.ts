import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  monthLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  constructor() { }

  getMonthFromIndex(index): string {
    return this.monthLabels[index];
  }

  getTMLDateFormat(date: Date): string {
    return `${this.getMonthFromIndex(date.getMonth())}-${date.getFullYear()}`;
  }

  getOptionalParamsForRequest(params: any): HttpParams {
    let optionalPramas = new HttpParams();
    for (let key in params) {
      if (params[key]) {
        optionalPramas = optionalPramas.append(key, params[key]);
      }
    }

    return optionalPramas;
  }

  getClosestNumber(data, goal) {
   return data.reduce(function(prev, curr) {
      return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
  }

  masterSort(data, keyName: string, isAsc: boolean) {
    const pattern = new RegExp('month', 'ig');
    const stringToMatch = pattern.test(keyName) ? 'Month' : keyName;

    return data.sort((a, b) => {
      switch (stringToMatch) {
        case 'No_of_Complaints': return compare(+a[keyName], +b[keyName], isAsc);
        case 'Total_Expenses': return compare(+a[keyName], +b[keyName], isAsc);
        case 'Month': return compare(+parseTMLDate(a[keyName]), +parseTMLDate(b[keyName]), isAsc);
        default: return ('' + a[keyName]).localeCompare('' + b[keyName]) * (isAsc ? 1 : -1);
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function parseTMLDate(date: string) {
  return Date.parse(date);
}
