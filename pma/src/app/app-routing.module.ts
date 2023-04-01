import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { SelectedBoardPageComponent } from './pages/selected-board-page/selected-board-page.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'board', component: BoardPageComponent},
  {path: 'selected-board', component: SelectedBoardPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
