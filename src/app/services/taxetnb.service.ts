import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Taxetnb } from './taxetnb';

@Injectable({
  providedIn: 'root'
})
export class TaxetnbService {

  constructor(private httpClient : HttpClient) { }

  private baseUrl = "http://localhost:9090/TaxeTnb";

  getTaxeList() : Observable<Taxetnb[]>{ // gerer les flux de donnee asynchrone
    return this.httpClient.get<Taxetnb[]>(`${this.baseUrl}/findAll`);
  }

  getTaxeById(id : number |undefined): Observable<Taxetnb>{
    return this.httpClient.get<Taxetnb>(`${this.baseUrl}/findById/${id}`)
    }

    deleteTaxe(id:number | undefined) : Observable<Object>{
      return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
      }

      createTaux(taxetnb : Taxetnb): Observable<Object>{
        return this.httpClient.post(`${this.baseUrl}/save`, taxetnb);
      }
}
