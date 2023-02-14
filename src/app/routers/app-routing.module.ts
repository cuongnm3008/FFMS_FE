
import { AdminRoutingModule } from './pages/admin/admin-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboadRoutingModule } from './dashboard/dashboard-routing.module';
import { FFMSRoutingModule } from './pages/ffms/ffsm-routing.module';
import { LoginComponent } from './account/login/login.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { Error404Component } from './error/404/404.component';
import { ErrorRoutingModule } from './error/error-routing.module';
const routes: Routes = [
  {
    path:'**',
    component : Error404Component,
  },
];

@NgModule({
	imports:
  [
    AdminRoutingModule,
    RouterModule.forRoot(routes),
    FFMSRoutingModule,
    ErrorRoutingModule,
    DashboadRoutingModule,
  ],
	exports: [
    RouterModule
  ],


})
export class AppRoutingModule { }
