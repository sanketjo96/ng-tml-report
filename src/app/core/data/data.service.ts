import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IComplaintFinder, IComplaint } from 'src/app/models/complaint';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private base_url = "http://localhost:3001";

  constructor(private http: HttpClient) { }

  getModels(): Observable<Array<string>> {
    return this.http.get(`${this.base_url}/getModels/`).pipe(
      map((data: any) => <Array<string>> data.data )
    );
  }

  findComplaints(finder: IComplaintFinder): Observable<Array<IComplaint>> {
    const complaintGroupCode = finder.complaintGroupCode;
    return this.http.get(`${this.base_url}/getcomplaints/${complaintGroupCode}`, { 
      params: new HttpParams()
        .set('models', finder.models.join(','))
    }).pipe(
      map((data: any) => <Array<IComplaint>> data.data )
    );
  }

  searchComplaintGroup(search: string) {
    return this.http.get(`${this.base_url}/qsearch`,{ 
      params: new HttpParams()
        .set('cdesc', search)
    })
  }
}
