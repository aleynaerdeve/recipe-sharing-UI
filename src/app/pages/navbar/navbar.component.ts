import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthServiceService } from '../../services/Auth/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatToolbarModule,MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  user:any=null

  constructor(public authService:AuthServiceService, private router:Router){}
  ngOnInit(){

    this.authService.authSubject.subscribe(
      (auth)=>{
        console.log("auth state ",auth)
        this.user=auth.user
      }
    )

  }

  handleLogout(){
    this.authService.logout()
    // this.router.navigate(["/"])
  }

}
 