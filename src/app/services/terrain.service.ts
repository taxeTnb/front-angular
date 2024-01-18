import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terrain } from './terrain';
import { Observable, catchError, throwError } from 'rxjs'; // Reactive Extension JavaScript
import { Proprietaire } from './proprietaire';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private baseUrl = "http://localhost:9090/Terrain";

  constructor(private httpClient : HttpClient) { }

  getTerrainsList() : Observable<Terrain[]>{ // gerer les flux de donnee asynchrone
    return this.httpClient.get<Terrain[]>(`${this.baseUrl}/findAll`);
  }

  getTerrainById(id : number |undefined): Observable<Terrain>{
    return this.httpClient.get<Terrain>(`${this.baseUrl}/findById/${id}`)
    }

    getNomProprietaireById(terrainId : number|undefined):Observable<Proprietaire[]>{
      return this.httpClient.get<Proprietaire[]>(`${this.baseUrl}/${terrainId}/details`);
    }

    createTerrain(terrain: Terrain): Observable<Object> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      return this.httpClient.post(`${this.baseUrl}/save`, terrain, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error saving terrain:', error);
          return throwError('Error occurred while saving terrain.');
        })
      );
    }

    deleteTerrain(id:number | undefined) : Observable<Object>{
      return this.httpClient.delete(`${this.baseUrl}/daleteById/${id}`);
      }

      updateTerrain(id:number|undefined, terrain : Terrain): Observable<Object>{
        return this.httpClient.put(`${this.baseUrl}/update/${id}`,terrain);
        }

        searchTerrainByProprietaireCin(cin: String): Observable<any> {
          return this.httpClient.get(`${this.baseUrl}/findByProprietaireCIN/${cin}`);
        }

}
