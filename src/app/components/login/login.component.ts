import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authservice: AuthService, private router: Router, private toast: ToastrService) {}

  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl([
      '',
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/),
    ]),
  });

  HandleLogin(form: FormGroup) {
    const UserData = this.authservice.login(form.value);

    if(UserData) {
      localStorage.setItem("UserData", JSON.stringify(UserData))
      this.router.navigate(['/home'])
      this.toast.success('logged in successfully', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        toastClass: 'toast-added ',
      });
    } else {
      this.toast.error('user dose not exist', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        toastClass: 'toast-error',
       });
    }

    form.reset()
  }
}
