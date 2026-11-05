import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterPayload } from '../models/register-payload';
import { LoginPayload } from '../models/login-payload';
import { UserData } from '../models/user-data';
import { API_CONFIG } from '../constants/Api.constant';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    private httpClient=inject(HttpClient);
    
     tokenId=signal<number|null|string>(localStorage.getItem('userId'));
     isLoggedIn=signal<boolean>(Boolean(localStorage.getItem('userId')));
     userName=signal('');
     constructor(){
        if(this.tokenId()){
            this.getUser().subscribe()
        }
     }

    setToken(userId:number){
        const idStr=userId.toString();
        localStorage.setItem('userId',idStr);
        this.tokenId.set(idStr);
        this.isLoggedIn.set(true);
        this.getUser().subscribe();

    }
   
    onUserLogin(value:LoginPayload){
        return this.httpClient.post<UserData>(`${API_CONFIG.API}/login`,value)
    }

    onUserRegister(value:RegisterPayload){
        return this.httpClient.post<UserData>(`${API_CONFIG.API}/register`,value)

    }
    onUserLogout(){
        localStorage.removeItem('userId');
        this.isLoggedIn.set(false);
    }

    getUser(){
      return this.httpClient.get<UserData>(`${API_CONFIG.API}/user/${this.tokenId()}`).pipe(tap(userData=>this.userName.set(userData.fullName)));
    }

   
}
