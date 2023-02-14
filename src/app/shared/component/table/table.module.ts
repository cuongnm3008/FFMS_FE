import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AppTableComponent } from './table.component';
import { AppTableColumnComponent } from './table-column.component';
import { AppTableColumnGroupComponent } from './table-column-group.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PaginatorModule } from 'primeng/paginator';
import { AppTableSubColumnComponent } from './table-sub-column.component';
import { AppTableButtonSubComponent } from './table-button-sub.component';

@NgModule({
	declarations: [
		AppTableComponent,
		AppTableColumnComponent,
		AppTableColumnGroupComponent,
		AppTableSubColumnComponent,
		AppTableButtonSubComponent
	],
	exports: [
		AppTableComponent,
		AppTableColumnComponent,
		AppTableColumnGroupComponent,
		AppTableSubColumnComponent,
		AppTableButtonSubComponent
	],
	imports: [
		CommonModule,
		//UtilsModule,
		TableModule,
		PaginatorModule,
		NzSpinModule
	]
})
export class AppTableModule { }
