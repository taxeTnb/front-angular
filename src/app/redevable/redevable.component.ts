import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Proprietaire } from '../services/proprietaire';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-redevable',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './redevable.component.html',
  styleUrl: './redevable.component.css'
})
export class RedevableComponent {

  proprietaire : Proprietaire[] | undefined;
  proprietaires : Proprietaire = new Proprietaire();

  constructor(private http: HttpClient,private router : Router, private cookieService: CookieService){}


  ngOnInit() { // execute avant constructor ( charger une seule fois )
    
    if(!this.cookieService.check('jwt'))
    {
      this.router.navigate(['']);
    }

    this.http
    .get<any[]>('http://localhost:8082/api/redevable/findAll')
    .subscribe((data) => {
      this.proprietaire = data;
      console.log(this.proprietaire);
    });


    
  }


  deletePropr(id : number|undefined){
    this.http.delete(`http://localhost:8082/api/redevable/deleteById/${id}`).subscribe(data =>{ // pour ecouter les emissions d'observable
      console.log(data);
      Swal.fire({
        icon: 'success',
    title: 'Owner Deleted Successfully!',
    showConfirmButton: true,
    confirmButtonText: 'OK'
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

    });
  }

}
