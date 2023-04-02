import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTodoFormComponent } from './components/add-todo-form/add-todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { BoardPageComponent } from './auth/pages/board-page/board-page.component';
import { SelectedBoardPageComponent } from './auth/pages/selected-board-page/selected-board-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    AddTodoFormComponent,
    TodoListComponent,
    TodoItemComponent,
    HeaderComponent,
    WelcomePageComponent,
    BoardPageComponent,
    SelectedBoardPageComponent,
  ],
  imports: [
    BrowserModule, FormsModule, MatToolbarModule, MatButtonToggleModule, MatButtonModule, AppRoutingModule, ReactiveFormsModule, BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
