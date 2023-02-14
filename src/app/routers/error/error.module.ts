import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorRoutingModule } from './error-routing.module';
import { Error404Component } from './404/404.component';

@NgModule({
	declarations: [
		Error404Component,
	],
	imports: [
		CommonModule,
		ErrorRoutingModule
	],
})
export class ErrorModule { }
