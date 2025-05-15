import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
const UserData = localStorage.getItem("UserData")
const router = inject(Router)

if(UserData) {
  return true;
}
router.navigate(["login"])
  return false
};
