import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Taxetnb } from '../services/taxetnb';
import { Categorie } from '../services/categorie';
import { Proprietaire } from '../services/proprietaire';
import { Terrain } from '../services/terrain';
import { Taux } from '../services/taux';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tnb',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './tnb.component.html',
  styleUrl: './tnb.component.css'
})
export class TnbComponent {
  taxes : Taxetnb = new Taxetnb();
  taxe : Taxetnb[] | undefined;
  categorie : Categorie[] | undefined;
  proprietaire : Proprietaire[] | undefined;
  terrain : Terrain[] | undefined;
  taux : Taux[] | undefined;
  constructor(private http: HttpClient,private router : Router, private cookieService: CookieService){}

  ngOnInit() { // execute avant constructor ( charger une seule fois )
    
    if(!this.cookieService.check('jwt'))
    {
      this.router.navigate(['']);
    }

    this.http
    .get<any[]>('http://localhost:8082/api/category/findAll')
    .subscribe((data) => {
      this.categorie = data;
      console.log(this.categorie);
    });
  this.http
    .get<any[]>('http://localhost:8082/api/terrain/findAll')
    .subscribe((data) => {
      this.terrain = data;
    });
    this.http
    .get<any[]>('http://localhost:8082/api/redevable/findAll')
    .subscribe((data) => {
      this.proprietaire = data;
    });

    this.http
    .get<any[]>('http://localhost:8082/api/taux/findAll')
    .subscribe((data) => {
      this.taux = data;
    });

    this.http
    .get<any[]>('http://localhost:8082/api/taxeTnb/findAll')
    .subscribe((data) => {
      this.taxe = data;
    });
  }

    deleteTaxe(id : number|undefined){

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
          
          this.http.delete(`http://localhost:8082/api/taxeTnb/deleteById/${id}`).subscribe(data =>{ 
          Swal.fire({
            icon: 'success',
        title: 'Taxe Deleted Successfully!',
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
  
    calculateMontant(): void {
      if (this.taxes.taux && this.taxes.terrain && this.taxes.taux.montant !== undefined && this.taxes.terrain.surface !== undefined) {
        this.taxes.montantbase = this.taxes.taux.montant * this.taxes.terrain.surface;
      }
    }
    onSubmit(): void {
      this.calculateMontant(); // Call the calculateMontant method before saving
      this.http.post(`http://localhost:8082/api/taxeTnb/save`,this.taxes).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
        title: 'Taxe Created Successfully!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
          }).then((result)=>{
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
        title: 'Taxe not created!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
          }).then((result)=>{
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      );
    }
  
  
  
  }
  

   
