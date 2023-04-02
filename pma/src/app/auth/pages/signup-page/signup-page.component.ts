import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pma-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  constructor(){
  }
  errorMessage = '';
  errorMessageShow = false;
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  ngOnInit(): void {

  }
  signupSubmit(){
if (this.signupForm.valid) {
  console.log(this.signupForm.value, 'signup----');
  this.errorMessageShow = false;
}else {
  this.errorMessageShow = true;
  this.errorMessage = 'All fields are required!'
}

  }
}
