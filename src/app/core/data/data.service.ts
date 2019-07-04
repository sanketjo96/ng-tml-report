import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ComplaintFinder, Complaint } from 'src/app/models/complaint';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private base_url = "https://tml-report.herokuapp.com";

  constructor(private http: HttpClient, private util: UtilService) { }

  getModels(): Observable<Array<string>> {
    return this.http.get(`${this.base_url}/getModels/`).pipe(
      map((data: any) => <Array<string>> data.data )
    );
  }

  findComplaints(finder: ComplaintFinder): Observable<Array<Complaint>> {
    const complaintGroupCode = finder.complaintGroupCode;
    let processedFinder: any = {
      models: finder.models ? finder.models.join(',') : undefined,
      mis: finder.mis ? finder.mis.toString() : undefined,
      from: finder.from ? this.util.getTMLDateFormat(finder.from) : undefined,
      to: finder.to ? this.util.getTMLDateFormat(finder.to) : undefined
    };

    const params: HttpParams = this.util.getOptionalParamsForRequest(processedFinder);
    return this.http.get(`${this.base_url}/getcomplaints/${complaintGroupCode}`, {params}).pipe(
      map((data: any) => <Array<Complaint>> data.data )
    );
  }

  searchComplaintGroup(search: string) {
    return this.http.get(`${this.base_url}/qsearch`,{ 
      params: new HttpParams()
        .set('cdesc', search)
    })
  }
}
