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

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ListboxModule} from 'primeng/listbox';
import { AdminComponent } from './components/admin/admin.component';
import { CompanyAdminComponent } from './components/admin/company-admin/company-admin.component';
import { JobAdminComponent } from './components/admin/job-admin/job-admin.component';
import { UserAdminComponent } from './components/admin/user-admin/user-admin.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    NavBarComponent,
    FooterComponent,
    ContentComponent,
    TasksComponent,
    AdminComponent,
    CompanyAdminComponent,
    JobAdminComponent,
    UserAdminComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutes,
    FormsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    CheckboxModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    SelectButtonModule,
    ListboxModule
  ],
  providers: [UserService, TaskService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
