import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  signup(SignupForm: User): boolean {
    const UsersArray = localStorage.getItem('UsersArray');

    if (!UsersArray) {
      localStorage.setItem('UsersArray', JSON.stringify([SignupForm]));
    } else if (UsersArray) {
      const array = JSON.parse(UsersArray);
      const { email } = SignupForm;
      const CheckUser = array.find((user: User) => user.email === email);

      if (CheckUser) {
        return false;
      } else {
        array.push(SignupForm);
        localStorage.setItem('UsersArray', JSON.stringify(array));
        return true;
      }
    }
    return false
  }

  login(SignupForm: User): User | Boolean {
    const UsersArray = localStorage.getItem('UsersArray');

    if (UsersArray) {
      const array = JSON.parse(UsersArray);
      const { email } = SignupForm;
      const {password} = SignupForm
      const CheckUser = array.find((user: User,) => user.email === email && user.password === password);

      if (CheckUser) {
        return SignupForm;
      }
    }
    return false;
  }
}
