import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ComplaintFinder, Complaint } from 'src/app/models/complaint';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UtilService } from '../util/util.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private base_url = environment.apibaseurl;

  constructor(private http: HttpClient, private util: UtilService) { }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.base_url}/users/login`, credentials);
  }

  getModels(): Observable<Array<string>> {
    return this.http.get(`${this.base_url}/getModels`).pipe(
      map((data: any) => <Array<string>> data.data )
    );
  }

  findComplaints(finder: ComplaintFinder): Observable<Array<Complaint>> {
    const complaintGroupCode = finder.complaintGroupCode;
    let processedFinder: any = {
      models: finder.models ? finder.models.join(',') : undefined,
      mis: finder.mis ? finder.mis.toString() : undefined,
      from: finder.from ? new Date(finder.from).getFullYear() : undefined,
      to: finder.to ? new Date(finder.to).getFullYear() : undefined
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
