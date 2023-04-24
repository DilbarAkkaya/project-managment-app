import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { IAuthData } from 'src/app/models/api.model';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'pma-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  errorMessage = '';
  errorMessageShow = false;
  isSubmited = false;
  @Output() userLogin = new EventEmitter<string>();
  constructor(public service: AuthserviceService, private userService: UserService, private router: Router, private translateService: TranslateService) { }
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  ngOnInit(): void {
  }
  loginSubmit() {
    this.isSubmited = true;
    const data: IAuthData = {
      login: this.loginForm.value.login!,
      password: this.loginForm.value.password!
    };
    if (this.loginForm.valid) {
      this.service.login(data).subscribe(() => {
       localStorage.setItem('user', data.login)
      //localStorage.getItem('user') as string;
        this.userLogin.emit(data.login);
        this.userService.setUser(data.login);
        this.loginForm.reset();
        this.router.navigate(['/auth/main']);
        this.isSubmited = false;
      }, () => {
        this.isSubmited = false;
      })
    } else {
      this.errorMessageShow = true;
      this.errorMessage = 'All field required!'
    }
  }
  getErrorMessage(text: string, params: { length: number }): string {
    return this.translateService.instant(text, params)
  }
}
