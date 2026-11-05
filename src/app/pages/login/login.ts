import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/Services/user-service';
import { Alert } from '../../shared/components/alert/alert';
import { Router, RouterLink } from '@angular/router';
import { UserData } from '../../core/models/user-data';
import { Cautious } from '../../shared/components/cautious/cautious';
import { delay } from 'rxjs';
import { Loader } from '../../shared/components/loader/loader';

@Component({
  imports: [ReactiveFormsModule, Alert, RouterLink, Cautious, Loader],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private userService=inject(UserService);
  whenLoading=signal(false);
  private formBuilder=inject(FormBuilder).nonNullable;
  private router=inject(Router);
  errMessage=signal('');
  form=this.formBuilder.group({
    email:[''],
    password:['']
  })

  onLogin(){
    if(this.form.invalid)
    {
      this.form.markAllAsTouched();
      return
    }
    const form=this.form.getRawValue();
     this.whenLoading.set(true);
    this.userService.onUserLogin(form).pipe(delay(2000)).subscribe({
      next: (response:UserData) => {
        this.whenLoading.set(false);
        this.userService.setToken(response.userId);
       
        this.router.navigate(['/home']);
        
        console.log('Login successful:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.whenLoading.set(false);
        this.errMessage.set('Wrong email or password');
      }
    });
    
  }
}
