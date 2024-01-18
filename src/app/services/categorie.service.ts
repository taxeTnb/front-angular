import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from './categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = "http://localhost:9090/Categorie";

  constructor(private httpClient : HttpClient) { }

  getCategoriesList() : Observable<Categorie[]>{ // gerer les flux de donnee asynchrone
    return this.httpClient.get<Categorie[]>(`${this.baseUrl}/findAll`);
  }
  createCategorie(categorie : Categorie): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/save`, categorie);
    }

    deleteCategorie(id:number | undefined) : Observable<Object>{
      return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
      }

      updateCategorie(id:number|undefined, categorie : Categorie): Observable<Object>{
        return this.httpClient.put(`${this.baseUrl}/update/${id}`,categorie);
        }

        getCategorieById(id : number |undefined): Observable<Categorie>{
          return this.httpClient.get<Categorie>(`${this.baseUrl}/findById/${id}`)
          }
}
