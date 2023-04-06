import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { IAuthData } from 'src/app/models/api.model';

@Component({
  selector: 'pma-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  errorMessage = '';
  errorMessageShow = false;
  isSubmited = false;

  constructor(public service: AuthserviceService, private router: Router ){}
    loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  ngOnInit(): void {
  }
  loginSubmit(){
    this.isSubmited = true;
    const data: IAuthData = {
      login: this.loginForm.value.login!,
      password: this.loginForm.value.password!
    };
    if (this.loginForm.valid) {
      this.service.login(data).subscribe(()=> {
        this.loginForm.reset();
        this.router.navigate(['/auth/main']);
        this.isSubmited = false;
      }, ()=> {
        this.isSubmited = false;
      })
    }else {
      this.errorMessageShow = true;
      this.errorMessage = 'All field required!'
    }
  }
  getErrorMessage() {
    return (this.loginForm.value.password!.length < 7) ? 'Password is required and should be min 7 chars' : '';
  }
}
