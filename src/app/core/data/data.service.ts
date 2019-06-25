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

  getAllComplaints(limit: number = 30, skip: number = 0) {
    return this.http.get(`${this.base_url}/getallcomplaints`,{ 
      params: new HttpParams()
        .set('limit', limit.toString())
        .set('skip', skip.toString())
    })
  }

  findComplaints(finder: IComplaintFinder): Observable<Array<IComplaint>> {
    const complaintGroupCode = finder.complaintGroupCode;
    return this.http.get(`${this.base_url}/getcomplaints/${complaintGroupCode}`).pipe(
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
