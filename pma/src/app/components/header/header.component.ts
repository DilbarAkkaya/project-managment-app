import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { ModalCreateComponent } from 'src/app/auth/components/modal-create/modal-create.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EditProfileComponent } from 'src/app/auth/components/edit-profile/edit-profile.component';
import { UserService } from 'src/app/auth/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pma-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchText: string = '';
  usedLang: string = 'en';
  isUsedLangChose: boolean | null = false;
  user: string | null = '';
  constructor(public apiservice: AuthserviceService, private snackBar: MatSnackBar, private userService: UserService, private dialog: MatDialog, private router: Router, public translate: TranslateService,) {
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
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
    const user = localStorage.getItem('user');
    if (user) {
      this.user = user;
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
    dialogRef.afterClosed().subscribe(() => {});
  }
  openEditForm(event: Event) {
    event?.preventDefault();
    const dialogRef = this.dialog.open(EditProfileComponent)
    dialogRef.afterClosed().subscribe(() => {})
  }
}
