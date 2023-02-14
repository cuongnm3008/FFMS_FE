import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@Component({
  selector: 'app-paging',
  template: ` <nz-pagination [nzPageIndex]="sPageIndex" [nzTotal]="sTotal"></nz-pagination> `
})
export class PaginationComponent {

@Input() sPageIndex : number ;
@Input() sTotal : number ;

}

@NgModule({
	declarations: [
		PaginationComponent
	],
	exports: [
		PaginationComponent
	],
	imports: [
		CommonModule,
		FormsModule,
    NzPaginationModule
	]
})
export class PaginationModule { }

