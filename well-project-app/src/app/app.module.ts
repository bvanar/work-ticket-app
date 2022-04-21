import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { LayoutComponent } from './components/layout/layout.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ContentComponent } from './components/layout/content/content.component';
import { AppRoutes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { CompanyService } from './services/company.service';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    NavBarComponent,
    FooterComponent,
    ContentComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutes,
    FormsModule
  ],
  providers: [UserService, TaskService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
