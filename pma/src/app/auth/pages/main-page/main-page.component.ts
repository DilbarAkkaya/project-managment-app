import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pma-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  errorMessage = '';
  errorMessageShow = false;
  isSubmited = false;

  ngOnInit(): void {

  }

}
