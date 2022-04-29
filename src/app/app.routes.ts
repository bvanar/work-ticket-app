import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { CompanyAdminComponent } from "./components/admin/company-admin/company-admin.component";
import { JobAdminComponent } from "./components/admin/job-admin/job-admin.component";
import { UserAdminComponent } from "./components/admin/user-admin/user-admin.component";
import { LoginComponent } from "./components/login/login.component";
import { TasksComponent } from "./components/tasks/tasks.component";

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'tasks', component: TasksComponent},
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'company',
        component: CompanyAdminComponent
      },
      {
        path: 'job',
        component: JobAdminComponent
      },
      {
        path: 'user',
        component: UserAdminComponent
      }
    ]
  }
];

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true });
