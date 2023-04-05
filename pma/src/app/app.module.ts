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
import { MainPageComponent } from './auth/pages/main-page/main-page.component';
import { SelectedBoardPageComponent } from './auth/pages/selected-board-page/selected-board-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    AddTodoFormComponent,
    TodoListComponent,
    TodoItemComponent,
    HeaderComponent,
    WelcomePageComponent,
    MainPageComponent,
    SelectedBoardPageComponent,
  ],
  imports: [
    BrowserModule, FormsModule, MatToolbarModule, MatButtonToggleModule, MatButtonModule, AppRoutingModule, ReactiveFormsModule, BrowserAnimationsModule,
  HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
