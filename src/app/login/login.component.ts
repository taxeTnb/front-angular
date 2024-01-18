import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthentifService } from '../authentif.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private cookieService: CookieService,
    private cdr: ChangeDetectorRef,private http: HttpClient,private router: Router){

  }


  ngOnInit() {
    if (this.cookieService.check('jwt')) {
      this.router.navigate(['']);
    }
  }
  
  onSubmit() {
    this.http
      .post('http://localhost:8081/auth/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe((response: any) => {
        console.log(response);        
        this.cookieService.set('jwt', response.token);
        this.cookieService.set('username', response.user.username);
        this.cookieService.set('role', response.user.role);
        this.cookieService.set('cin', response.user.cin);
        Swal.fire({
          icon: 'success',
      title: 'Welcome !',
      showConfirmButton: true,
      confirmButtonText: 'OK'
        }).then((result)=>{
          if (result.isConfirmed) {
          location.reload();
                    }
        });
        
      },
      (error) => {
        console.error('Login failed', error);
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
