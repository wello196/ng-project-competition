import { Routes } from '@angular/router';
import { adminGuard, alreadyLoggedIn, authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=>import('./pages/home/home').then(m=>m.Home)},
    {path:'login',loadComponent:()=>import('./pages/login/login').then(m=>m.Login),canActivate:[alreadyLoggedIn]},
    {path:'register',loadComponent:()=>import('./pages/register/register').then(m=>m.Register),canActivate:[alreadyLoggedIn]},
    {path:'students',loadComponent:()=>import('./pages/students/students').then(m=>m.Students)},
    {path:'dashboard',loadComponent:()=>import('./pages/dashboard/dashboard').then(m=>m.Dashboard),canActivate:[adminGuard]},
    {path:'projects',loadComponent:()=>import('./pages/projects/projects').then(m=>m.Projects)},
    {path:'competitions',loadComponent:()=>import('./pages/competition/competition').then(m=>m.Competition),canActivate:[adminGuard]},
    {path: 'competitions/submit-project/:competitionId',loadComponent: () => import('./pages/submit-project/submit-project').then(m => m.SubmitProject),canActivate:[authGuard]},
    {path:'unauthorized',loadComponent:()=>import('./pages/unauthorized/unauthorized').then(m=>m.Unauthorized)},
    
   
];
