import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  SignupForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/),
      ]),
      ConfirmPassword: new FormControl(),
      phonenumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.ValidateConfirmPassword] } as FormControlOptions
  );

  ValidateConfirmPassword(form: FormGroup): void {
    const password = form.get('password');
    const ConfirmPassword = form.get('ConfirmPassword');

    if (ConfirmPassword?.value === '') {
      ConfirmPassword.setErrors({ required: true });
    } else if (password?.value !== ConfirmPassword?.value) {
      ConfirmPassword?.setErrors({ notidentical: true });
    }
  }

  HandleSubmit(form: FormGroup) {
    if (form.valid) {
      const state =  this.authservice.signup(form.value);
if(state) {
  this.toast.success('signup has been successfully', '', {
    timeOut: 3000,
    positionClass: 'toast-top-right',
    progressBar: true,
    toastClass: 'toast-success ',
  });
  this.router.navigate(['./login']);
} else {
  this.toast.error('this user is already exists in database', '', {
    timeOut: 3000,
    positionClass: 'toast-top-right',
    progressBar: true,
    toastClass: 'toast-error',
   });
}
    }
    form.reset();
  }
}
