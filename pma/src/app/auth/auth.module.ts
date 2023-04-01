import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { SelectedBoardPageComponent } from './pages/selected-board-page/selected-board-page.component';


@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children: [
          { path: '', redirectTo: './auth/login', pathMatch: 'full'},
          { path: 'login', component: LoginPageComponent},
          {path: 'board', component: BoardPageComponent},
          {path: 'selected-board/:id', component: SelectedBoardPageComponent},
        ]
      }
    ])
  ]
})
export class AuthModule { }
