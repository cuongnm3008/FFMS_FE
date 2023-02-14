import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { AppTableColumnComponent } from './table-column.component';

@Component({
	selector: 'app-table-column-group',
	template: ``,
})
export class AppTableColumnGroupComponent {

	@Input() width: number;
	@Input() headerStyle: any;
	@Input() headerClass: any;
	@Input() title: string;

	@ContentChildren(AppTableColumnComponent) columns: QueryList<AppTableColumnComponent>;

}
