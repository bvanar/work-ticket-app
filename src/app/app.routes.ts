import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { TasksComponent } from "./components/tasks/tasks.component";

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'tasks', component: TasksComponent}
];

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true });
