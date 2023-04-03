import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { ISignData } from 'src/app/models/api.model';
import { Router } from '@angular/router';
@Component({
  selector: 'pma-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  constructor(private service: ApiserviceService, private router: Router){
  }
  errorMessage = '';
  errorMessageShow = false;
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })
  ngOnInit(): void {

  }
  signupSubmit(){

if (this.signupForm.valid) {
  const data: ISignData = {
    name: this.signupForm.value.name!,
    login: this.signupForm.value.login!,
    password: this.signupForm.value.password!
  };
  this.errorMessageShow = false;
  this.service.signup(data).subscribe({
    next: () => {
      this.router.navigate(['/auth/board']);
    },
    error: (err)=> {
      console.error(err, 'signup error');
      this.errorMessageShow = true;
      this.errorMessage = 'Login already exists!';
    }
})
    } else {
      this.errorMessageShow = true;
      this.errorMessage = 'All fields are required!';
    }
  }
}
