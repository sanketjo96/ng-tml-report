import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private dataService: DataService, private router: Router) {

  }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.dataService.login(credentials).pipe(
        map(response => {
            if (response && response.data && response.data.token) {
                localStorage.setItem('access_token', response.data.token);
                return true;
            } else {
                return false;
            }
        })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

}
