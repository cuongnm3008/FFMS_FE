import { BaseComponent } from './base/base.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';


const routes: Routes = [

  // {
	// 	path: '',
	// 	component: LayoutComponent,
	// 	children: [
  //     {
  //       path: '',
  //       component : BaseComponent,
  //       data: { preload: true },
  //     },
  //     {
  //       path: 'dashboard',
  //       component : BaseComponent,
  //       data: { preload: true },
  //     }
	// 	],
	// },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboadRoutingModule { }
