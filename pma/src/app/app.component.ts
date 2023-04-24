import { Component, Input, OnInit } from '@angular/core';
import { AuthserviceService } from './auth/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
@Input() searchText: string = ''
@Input() user: string = '';

  constructor(private auth: AuthserviceService, private router: Router){

  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['./auth/main']);
    }
  }
  title = 'RMA';

}
