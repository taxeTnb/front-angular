import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proprietaire } from './proprietaire';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {
  private baseUrl = "http://localhost:9090/proprietaire";
  constructor(private httpClient : HttpClient) { }

  getProprietairesList() : Observable<Proprietaire[]>{ // gerer les flux de donnee asynchrone
    return this.httpClient.get<Proprietaire[]>(`${this.baseUrl}/findAll`);
  }

  deleteProprietaire(id : number | undefined) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/deleteById/${id}`);
  }

  createProprietaire(proprietaire : Proprietaire): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/save`, proprietaire);
    }

    updateProprietaire(id:number|undefined, proprietaire : Proprietaire): Observable<Object>{
      return this.httpClient.put(`${this.baseUrl}/update/${id}`,proprietaire);

      }

      getProprietaireById(id : number |undefined): Observable<Proprietaire>{
        return this.httpClient.get<Proprietaire>(`${this.baseUrl}/findById/${id}`)
        }


}
