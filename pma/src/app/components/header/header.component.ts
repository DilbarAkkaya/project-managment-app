import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { ModalCreateComponent } from 'src/app/auth/components/modal-create/modal-create.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { EditProfileComponent } from 'src/app/auth/components/edit-profile/edit-profile.component';

@Component({
  selector: 'pma-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /*   localeList: {code: string, label: string}[] = [
      {code: "en-US", label: "EN"},
      {code: "tr", label: "TR"}
    ] */
  searchText: string = '';
  usedLang: string = 'en';
  isUsedLangChose: boolean | null = false;
  constructor(public apiservice: AuthserviceService, private dialog: MatDialog, private router: Router, public translate: TranslateService,) {
    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('en');
  }
  ngOnInit() {

    const storageLang = localStorage.getItem('language');
    if (storageLang) {
      this.usedLang = storageLang;
      this.isUsedLangChose = storageLang === 'en';
    } else {
      localStorage.setItem('language', 'en');
      this.usedLang = 'en';
      this.isUsedLangChose = true;
    }
  }

  setLanguage() {
    if (this.isUsedLangChose) {
      this.usedLang = 'en';
    } else {
      this.usedLang = 'tr';
    }
    localStorage.setItem('language', this.usedLang);
    this.translate.use(this.usedLang);
    this.isUsedLangChose = false;
  }

  openCreateDialog() {
    this.router.navigate(['./auth/main']);
    const dialogRef = this.dialog.open(ModalCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  /*   onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
    console.log(this.searchText, '444444444444')

    } */
  openEditForm() {
    const dialogRef = this.dialog.open(EditProfileComponent)
    dialogRef.afterClosed().subscribe(() => {
      console.log("close")
    }
    )
  }

}
