import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ColumnGroupDto } from './table-column.component';

@Component({
	selector: 'app-table-sub-column',
	template: ``,
})
export class AppTableSubColumnComponent {

	@Input() rowIndex: number;
	@Input() dataItem: any;

	@Input() width: number;
	@Input() minWidth: number;
	@Input() headerStyle: any;
	@Input() headerClass: any;
	@Input() field: string;
	@Input() isSort = false;
	@Input() title: string;
	@Input() bodyStyle: any;
	@Input() bodyClass: any;
	@Input() colspan: number;

	groupDto: ColumnGroupDto;

	@ContentChild('tableCellTemplate') tableCellTemplate: TemplateRef<any>;

}
