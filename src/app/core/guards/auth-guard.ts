import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('userId')) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

export const alreadyLoggedIn: CanActivateFn = (route, state) => {
  const router=inject(Router);
  if(!localStorage.getItem('userId'))
  {
    return true;
  }
  else
  {
    router.navigate(['home']);
    return false;
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('userId')=='1021'||localStorage.getItem('userId')=='1022') {
    return true;
  } else {
    router.navigate(['unauthorized']);
    return false;
  }
};
