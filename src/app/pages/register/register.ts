import { Component, inject, signal } from '@angular/core';
import {   FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Alert } from '../../shared/components/alert/alert';
import { NoNumber } from '../../core/validators/no-number.validator';
import { PasswordMatch } from '../../core/validators/password-match.validator';
import { UserService } from '../../core/Services/user-service';
import { Router, RouterLink } from '@angular/router';
import { UserData } from '../../core/models/user-data';
import { Cautious } from '../../shared/components/cautious/cautious';
import { Loader } from '../../shared/components/loader/loader';
import { Login } from '../login/login';



@Component({
  imports: [Alert, ReactiveFormsModule, RouterLink, Cautious, Loader],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private formBuilder = inject(FormBuilder).nonNullable;
  private userService=inject(UserService);
  private router=inject(Router);
  
  errMessage=signal('');
  whenLoading=signal(false)
  form = this.formBuilder.group({
    fullName:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20),NoNumber.noNumber]],
    email:['',[Validators.required,Validators.email]],
    passwordGroup: this.formBuilder.group({
      password:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword:[''],
    },{validators:PasswordMatch.checkPasswordMatch('password','confirmPassword')}),
    
    collegeName:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20),NoNumber.noNumber]],
    role:['',[Validators.required]]
  });


  get fullName(){
    return this.form.get('fullName');
  }
  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('passwordGroup.password');
  }
  get passwordGroup() {
  return this.form.get('passwordGroup');
}
  get collegeName(){
    return this.form.get('collegeName');
  }
  get role(){
    return this.form.get('role');
  }

 onRegister(){
  if(this.form.invalid)
  {
   this.form.markAllAsTouched();
    return
  }
  this.whenLoading.set(true);
     
  const data = this.form.getRawValue();
  const payload={
    fullName:data.fullName,
    email:data.email,
    password:data.passwordGroup.password,
    collegeName:data.collegeName,
    role:data.role
  }
    this.userService.onUserRegister(payload).subscribe({
      next: (response:UserData) => {
         console.log('Registration successful:', response);
        this.userService.onUserLogin({email:payload.email,password:payload.password}).subscribe({
          next: (response:UserData) => {
            this.userService.setToken(response.userId);
            this.router.navigate(['/home']);
            this.whenLoading.set(false);
            console.log('Login successful:', response);
          }
        })
        
        this.form.reset();
      },
      error: (error) => {
        console.error('Registration failed:', error);
        if(error.status==409){
          this.errMessage.set('Email already exists');
        }
        else{
          this.errMessage.set('Something went wrong');
        }
        this.whenLoading.set(false);
      }
    });
 

 }
  
}
