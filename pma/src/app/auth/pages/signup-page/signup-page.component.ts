import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'pma-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl(''),
    login: new FormControl(''),
    password: new FormControl('')
  })
  constructor(){

  }
  ngOnInit(): void {

  }
  signupSubmit(){
    console.log(this.signupForm.value, 'signup----')
  }
}
