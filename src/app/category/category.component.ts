import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Categorie } from '../services/categorie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categorie : Categorie[] | undefined;
  categories : Categorie = new Categorie();

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
  }


  createCategorie(){
    this.http.post(`http://localhost:8082/api/category/save`,this.categories).subscribe(data=>{
      Swal.fire({
        icon: 'success',
    title: 'Category Add Successfully!',
    showConfirmButton: true,
    confirmButtonText: 'OK'
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
      }
      ngSubmit(){
        this.createCategorie();
      }

      

      deleteCategorie(id : number|undefined){
       

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
            
            this.http.delete(`http://localhost:8082/api/category/deleteById/${id}`).subscribe(data =>{ // pour ecouter les emissions d'observable
            Swal.fire({
              icon: 'success',
          title: 'Category Deleted Successfully!',
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



      updateCategorie(id : number | undefined){
        this.router.navigate(['update-categorie', id]);
          }
}


