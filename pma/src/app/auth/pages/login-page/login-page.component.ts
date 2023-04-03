import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pma-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  errorMessage = '';
  errorMessageShow = false;
  constructor(){}
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  ngOnInit(): void {
  }
  loginSubmit(){
    if (this.loginForm.valid) {
 console.log(this.loginForm.value)
    }else {
      this.errorMessageShow = true;
      this.errorMessage = 'All field required!'
    }
  }
  getErrorMessage() {
    return (this.loginForm.value.password!.length < 7) ? 'Password is required and should be min 7 chars' : '';
  }
}
