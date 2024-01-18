import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentifService {

  constructor(private httpClient : HttpClient, private router : Router) { }


  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.httpClient.post(`${this.baseUrl}/login`, loginData, { responseType: 'text' })
      .pipe(
        map(response => {
          if (response.includes('Request triggered successfully!')) {
            console.log('Login successful');
            this.router.navigate(['/terrain']);
            return { success: true };
          } else {
            return { success: false };
          }
        }),
        catchError(error => {
          console.error('Login failed', error);
          return throwError(error);
        })
      );
  }










  private baseUrl = "http://localhost:8081/auth";

}
