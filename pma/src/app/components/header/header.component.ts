import { Component } from '@angular/core';
import { ApiserviceService } from 'src/app/auth/apiservice.service';

@Component({
  selector: 'pma-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public apiservice: ApiserviceService) {}
}
