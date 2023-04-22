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
import { ColumnFormComponent } from './components/column-form/column-form.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { TranslateModule } from '@ngx-translate/core';
import { FilterPipe } from '../pipes/filter.pipe';
import { SearchComponent } from '../components/search/search.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';


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
    ColumnFormComponent,
    SelectedBoardPageComponent,
    TaskComponent,
    TaskFormComponent,
    TaskUpdateComponent,
    FilterPipe,
    SearchComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children: [
          { path: '', redirectTo: './auth/login', pathMatch: 'full'},
          { path: 'login', component: LoginPageComponent},
          { path: 'signup', component: SignupPageComponent},
          { path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
          { path: 'selected-board/:id', component: SelectedBoardPageComponent, canActivate:[AuthGuard]},
        ]
      }
    ])
  ],
  providers: [AuthGuard]
})
export class AuthModule { }
