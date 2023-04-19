import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { ISignData } from 'src/app/models/api.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'pma-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  constructor(private service: AuthserviceService, private router: Router, private translateService:TranslateService){
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
      this.router.navigate(['/auth/login']);
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
  getErrorMessage(text: string, params: { length: number }): string {
    return this.translateService.instant(text, params)
    //return (this.signupForm.value.password!.length < 7) ? 'Your password should be min 7 chars' : '';
  }
}
