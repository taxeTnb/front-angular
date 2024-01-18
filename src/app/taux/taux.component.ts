import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Categorie } from '../services/categorie';
import { Taux } from '../services/taux';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taux',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './taux.component.html',
  styleUrl: './taux.component.css'
})
export class TauxComponent {

  taux : Taux[] | undefined;
  tauxs : Taux = new Taux();
  categorie : Categorie[] | undefined;

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
    .get<any[]>('http://localhost:8082/api/taux/findAll')
    .subscribe((data) => {
      this.taux = data;
    });
  }


  createTaux(){
    this.http.post(`http://localhost:8082/api/taux/save`,this.tauxs).subscribe(data=>{
      Swal.fire({
        icon: 'success',
    title: 'Taux Add Successfully!',
    showConfirmButton: true,
    confirmButtonText: 'OK'
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
  }

  onSubmit(){
    this.createTaux();
  }

  deleteTaux(id : number|undefined){
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
        
        this.http.delete(`http://localhost:8082/api/taux/deleteById/${id}`).subscribe(data =>{ // pour ecouter les emissions d'observable
        Swal.fire({
          icon: 'success',
      title: 'Taux Deleted Successfully!',
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

  updateTaux(id : number | undefined){
    this.router.navigate(['update-taux', id]);
      }


}
