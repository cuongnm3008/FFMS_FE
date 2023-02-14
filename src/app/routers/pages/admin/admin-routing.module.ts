import { LoginComponent } from './../../account/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleManagementComponent } from './role-management/role-management.component';


const routes: Routes = [
  {
    path : "login",
    component : LoginComponent
  },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule { }
