import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'app-table-column',
	template: ``,
})
export class AppTableColumnComponent {

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

	groupDto: ColumnGroupDto;

	@ContentChild('tableCellTemplate') tableCellTemplate: TemplateRef<any>;

}

export class ColumnGroupDto {
	title!: string | undefined;
	rowSpan!: number;
	colSpan!: number;
	isSort!: boolean;
	headerStyle!: string | undefined;
	headerClass!: string | undefined;
	isShowColumnTop!: boolean;
	isShowColumnBottom!: boolean;
}
