import { Component, EventEmitter, Output } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUpdateUser } from 'src/app/models/api.model';
import { UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

@Component({
  selector: 'pma-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  @Output() userDeleted = new EventEmitter<string>();
  userId: string = '';
  errorMessage = '';
  errorMessageShow = false;
  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })
  constructor(private dialogRef: MatDialogRef<ModalCreateComponent>, private service: UserService, private router: Router, private translateService: TranslateService, private dialogservice: ConfirmDialogService) {
  }
  ngOnInit(): void {
    this.resetForm();
  }
  editSubmit() {
    if (this.editForm.valid) {
      const data: IUpdateUser = {
        name: this.editForm.value.name!,
        login: this.editForm.value.login!,
        password: this.editForm.value.password!
      };
      this.errorMessageShow = false;
      this.userId = localStorage.getItem('owner')!;
      this.service.updateUser(this.userId, data).subscribe({
        next: () => {
          this.router.navigate(['/auth/main']);
        }
      })
    } else {
      this.errorMessageShow = true;
      this.errorMessage = 'All fields are required!';
    }
    this.dialogRef.close();
  }
  resetForm() {
    this.editForm.setValue({
      name: '',
      login: '',
      password: ''
    });
  }
  getErrorMessage(text: string, params: { length: number }): string {
    return this.translateService.instant(text, params)
  }
  deleteUser(event: Event) {
    event.stopPropagation();
    this.dialogservice.openConfirm().afterClosed().subscribe(response => {
      if (response) {
        this.service.deleteUser(this.userId!).subscribe(() => {
          this.userDeleted.emit(this.userId);
          this.router.navigate([`./auth/login`]);
        })
      }
    })
  }
  closeEdit() {
    this.dialogRef.close(false);
  }
}
