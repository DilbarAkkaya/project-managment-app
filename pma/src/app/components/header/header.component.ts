import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { ModalCreateComponent } from 'src/app/auth/components/modal-create/modal-create.component';

@Component({
  selector: 'pma-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public apiservice: AuthserviceService, private dialog: MatDialog) {}

  openCreateDialog() {

    const dialogRef = this.dialog.open(ModalCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
