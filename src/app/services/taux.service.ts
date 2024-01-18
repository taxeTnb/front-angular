import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taux } from './taux';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TauxService {

  constructor(private httpClient : HttpClient) { }

  private baseUrl = "http://localhost:9090/Taux";

  getTauxList() : Observable<Taux[]>{ // gerer les flux de donnee asynchrone
    return this.httpClient.get<Taux[]>(`${this.baseUrl}/findAll`);
  }

  getTauxById(id : number |undefined): Observable<Taux>{
    return this.httpClient.get<Taux>(`${this.baseUrl}/findById/${id}`)
    }

    createTaux(taux : Taux): Observable<Object>{
      console.log('Taux object:', taux);
      return this.httpClient.post(`${this.baseUrl}/save`, taux);
    }

    deleteTaux(id:number | undefined) : Observable<Object>{
      return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
      }

      updateTaux(id:number|undefined, taux : Taux): Observable<Object>{
        return this.httpClient.put(`${this.baseUrl}/update/${id}`,taux);
        }




}
