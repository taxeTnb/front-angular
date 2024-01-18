import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  standalone:true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  cin: string = '';
  constructor(
    private cdr: ChangeDetectorRef,private http: HttpClient,private router: Router){
  }

  ngOnInit() {

  }
  
  onSubmit() {
    this.http
      .post('http://localhost:8081/auth/register', {
        username: this.username,
        password: this.password,
        cin: this.cin
      })
      .subscribe((response: any) => {
        console.log(response);        
        Swal.fire({
          icon: 'success',
      title: 'Welcome !',
      showConfirmButton: true,
      confirmButtonText: 'OK'
        }).then((result)=>{
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
        
      },
      (error) => {
        console.error('register failed', error);
        Swal.fire({
          icon: 'error',
      title: 'You don\'t have the access!',
      showConfirmButton: true,
      confirmButtonText: 'OK'
        }).then((result)=>{
          if (result.isConfirmed) {
            console.log('sorry');
          }
        });
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Response body:', error.error);
        }
      }
      
      );
  }




}
