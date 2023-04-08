import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SelectedBoardPageComponent } from './pages/selected-board-page/selected-board-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatCardModule} from '@angular/material/card';
import { AuthGuard } from './auth.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalCreateComponent } from './components/modal-create/modal-create.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor} from './interceptor/auth.interceptor';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { ColumnComponent } from './components/column/column.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    SignupPageComponent,
    MainPageComponent,
    ModalCreateComponent,
    BoardItemComponent,
    BoardListComponent,
    ColumnComponent,

  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children: [
          { path: '', redirectTo: './auth/login', pathMatch: 'full'},
          { path: 'login', component: LoginPageComponent},
          { path: 'signup', component: SignupPageComponent},
          {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
          {path: 'selected-board/:id', component: SelectedBoardPageComponent, canActivate:[AuthGuard]},
        ]
      }
    ])
  ],
  providers: [AuthGuard]
})
export class AuthModule { }
