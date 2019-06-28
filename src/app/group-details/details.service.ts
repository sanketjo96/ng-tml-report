import { Injectable } from '@angular/core';
import { Complaint } from '../models/complaint';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor() { }

  returnDetailsResultSet(filters, data?: Array<Complaint>) {
    if (!data || !data.length) return [];

    const key = Object.keys(filters)[0];
    return data.filter((item: Complaint) => {
      return item[key] === filters[key];
    })
  }
}
