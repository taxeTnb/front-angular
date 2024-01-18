import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Terrain } from '../services/terrain';
import { CategorieService } from '../services/categorie.service';
import { ProprietaireService } from '../services/proprietaire.service';
import { TerrainService } from '../services/terrain.service';
import { Router } from '@angular/router';
import { Proprietaire } from '../services/proprietaire';
import { Categorie } from '../services/categorie';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-terrain',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './terrain.component.html',
  styleUrl: './terrain.component.css'
})
export class TerrainComponent {
  terrains : Terrain[] | undefined;
  terrain : Terrain = new Terrain();
  categories : Categorie[] | undefined;
  proprietaires : Proprietaire[] | undefined;
  proprietaire : Proprietaire = new Proprietaire();
  terrainsSearch: any[] = [];
  cinToSearch: string = '';
  cin: string = "";
  showAllData: boolean = true;


  constructor(private http: HttpClient,private router : Router, private cookieService: CookieService){}

  searchTerrainByCin(): void {
    const cinToSearch = this.cinToSearch.trim();

    if (cinToSearch !== "") {
      console.log('CIN to search:', cinToSearch);

      this.http.get<any[]>(`http://localhost:8082/api/terrain/findByCIN/${cinToSearch}`).subscribe(
        (response) => {
          this.terrainsSearch = response;
          this.showAllData = false;
          console.log('Search Result:', response);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Error: CinToSearch is null or an empty string');
    }
  }





  ngOnInit() { // execute avant constructor ( charger une seule fois )
    
    if(!this.cookieService.check('jwt'))
    {
      this.router.navigate(['']);
    }
    else
    {
      this.cin = this.cookieService.get('cin')
    }
    
    this.http
    .get<any[]>('http://localhost:8082/api/category/findAll')
    .subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  this.http
    .get<any[]>('http://localhost:8082/api/terrain/findAll')
    .subscribe((data) => {
      this.terrains = data;
    });
    this.http
    .get<any[]>('http://localhost:8082/api/redevable/findAll')
    .subscribe((data) => {
      this.proprietaires = data;
    });
   
  }




  createTerrain() {

  const proprietaireId = this.terrain.redevable?.id;
  const categoryId = this.terrain.category?.id;

    if (proprietaireId !== undefined && categoryId !== undefined) {
    

      console.log("hqsdsqdqsdqsdqsdqsdq");
      const terrainData: Terrain = {
        id: this.terrain.id,
        surface: this.terrain.surface,
        description: this.terrain.description,
        nom: this.terrain.nom,
        redevable: { id: proprietaireId, nom: '', prenom: '', cin: '', password: '' },
        category: { id: categoryId, label: '',description: '',},
      };

      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

       this.http.post(`http://localhost:8082/api/terrain/save`, terrainData, { headers }).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
        title: 'Terrain Created Successfully!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
          }).then((result)=>{
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
        title: 'Terrain didn\'t created!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
          }).then((result)=>{
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      );
    } else {
      console.error('Error: ProprietaireId or CategoryId is undefined');
    }
  }

  deleteTerrain(id : number|undefined){

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete it! ${id}`
    }).then((result) => {
      if (result.isConfirmed) {
        
            this.http.delete(`http://localhost:8082/api/terrain/deleteById/${id}`).subscribe(data =>{ // pour ecouter les emissions d'observable
              Swal.fire({
                icon: 'success',
            title: 'Terrain Deleted Successfully!',
            showConfirmButton: true,
            confirmButtonText: 'OK'
              }).then((result)=>{
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            });
      }
    });
  }




  ngSubmit(){
        this.createTerrain();
      }

      updateTerrain(id : number | undefined){
        this.router.navigate(['update-terrain', id]);
          }
}
