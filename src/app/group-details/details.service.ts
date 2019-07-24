import { Injectable } from '@angular/core';
import { Complaint } from '../models/complaint';
import { cardSections } from '../configs/detailsview';
import { IComplaintCard, IsectionFeild } from '../shared/tml-card/complaint-card.data';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  sections = cardSections;

  constructor() { }

  returnDetailsResultSet(filters, data?: Array<Complaint>) {
    if (!data || !data.length) return [];

    const primaryfilter = Object.keys(filters)[0];

    const sectionKeyMap = this.sections.keysectionmap;
    const sectionkeys = Object.keys(sectionKeyMap);
    const complaints = [];
  
    for (let i=0; i < data.length; i++) {
      const card: IComplaintCard = {
        header: '',
        sections: [],
        additionalSection: []
      }; 
      const complaint = data[i];
      
      card.header = this.sections.header.map(headerkey => {
        return complaint[headerkey]
      }).join(' - ');

      if (complaint[primaryfilter] === filters[primaryfilter]) {
        for (let j=0; j < sectionkeys.length; j++) {
          const key = sectionkeys[j];
          const keyPosInSection = sectionKeyMap[key];
          const cardFeild: IsectionFeild = {
            name: key.replace('_', ' '),
            value: complaint[key]
          };
          
          // If key value has been configured as -1
          // consider key eligiblity for additional
          // collapsible section during showing details
          // cards
          if (keyPosInSection >= 0) {
            card.sections[keyPosInSection] = card.sections[keyPosInSection] || [];
            card.sections[keyPosInSection].push(cardFeild);
          } else {
            card.additionalSection.push(cardFeild);
          }
        }
      }

      if (card.sections && card.sections.length) {
        complaints.push(card);
      }
    }  
    return complaints;
  }
}
