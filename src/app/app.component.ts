import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taxefront';
  hasToken: boolean = false;
  role: string ="";
  username : string = "";
  constructor(
    private cookieService: CookieService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.hasToken = this.cookieService.check('jwt');
    if (this.hasToken) {
      this.username = this.cookieService.get('username');
      this.role = this.cookieService.get('role');
    }
  }

  logout() {
    this.cookieService.delete('jwt');
    this.cookieService.delete('username');
    this.cookieService.delete('role');
    this.cookieService.delete('cin');
    location.reload();
}
}
