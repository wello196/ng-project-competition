import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/user-service';
import { UserData } from '../../models/user-data';
import { LowerCasePipe } from '@angular/common';
import { FirstWordPipe } from '../../../shared/pipes/first-word-pipe';

@Component({
  imports: [RouterLink, FirstWordPipe],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  private userService=inject(UserService);;
  private router=inject(Router);
  dropDown=this.userService.isLoggedIn;
  userName=this.userService.userName;
  onLogout(){
    this.userService.onUserLogout();
    this.router.navigate(['/']);
    
  }


   
}
