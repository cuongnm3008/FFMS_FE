import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AppTableColumnGroupComponent } from './table-column-group.component';
import { ColumnGroupDto, AppTableColumnComponent } from './table-column.component';
import { AppTableHelper } from './table-helper';
import { AppTableSubColumnComponent } from './table-sub-column.component';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styles: [`
		/* .table-responsive .table thead th{
			min-width: 0;
			text-overflow: ellipsis;
			white-space: nowrap;
			-ms-flex-negative: 1;
			flex-shrink: 1;
			overflow: hidden;
		} */
	`]
})
export class AppTableComponent implements OnInit, AfterContentInit {

	@Output() getDataGrids = new EventEmitter<LazyLoadEvent>();

	@Input() tableHelper = new AppTableHelper();

	@Input() type: 'custom' | 'default' = 'default';

	@Input() class: any;

	@Input() classBody: any;

	@Input() height: number;

	@Input() pageLinkSize = 5;

	@ContentChildren(AppTableColumnComponent, { descendants: true }) columns: QueryList<AppTableColumnComponent>;

	@ContentChildren(AppTableSubColumnComponent, { descendants: true }) subColumns: QueryList<AppTableSubColumnComponent>;

	@ContentChildren(AppTableColumnGroupComponent) columnGroups: QueryList<AppTableColumnGroupComponent>;

	ngOnInit(): void {
		//this.height = this.height || 10000;
		if (this.type == 'custom') {
			this.getDataGrids.emit();
		}
	}

	ngAfterContentInit() {
		if (this.columnGroups && this.columnGroups.length > 0) {
			this.columns.forEach(item => {
				item.groupDto = item.groupDto || new ColumnGroupDto();
				item.groupDto = this.getColumnGroupDto(item);
			});
		}
	}

	private getColumnGroupDto(_column: AppTableColumnComponent): ColumnGroupDto {
		let _title = undefined;
		let _rowSpan = 0;
		let _colSpan = 0;
		let _isSort = false;
		let _headerStyle = undefined;
		let _headerClass = undefined;
		let _isShowColumnTop = false;
		let _isShowColumnBottom = false;

		var _columnGroup = this.columnGroups.find(x => {
			return x.columns.some(a => a.title == _column.title
				&& a.field == _column.field
				&& a.width == _column.width
				&& a.headerClass == _column.headerClass
				&& a.headerStyle == _column.headerStyle);
		});

		if (_columnGroup) {
			_isShowColumnBottom = true;
			if (_columnGroup.columns.first == _column) {
				_title = _columnGroup.title;
				_isSort = false;
				_rowSpan = 1;
				_colSpan = _columnGroup.columns.length;
				_headerStyle = _columnGroup.headerStyle;
				_headerClass = _columnGroup.headerClass;
				_isShowColumnTop = true;
			}
		}
		else {
			_title = _column.title;
			_colSpan = 1;
			_rowSpan = 2;
			_isSort = _column.isSort;
			_headerClass = _column.headerClass;
			_headerStyle = _column.headerStyle;
			_isShowColumnTop = true;
			_isShowColumnBottom = false;
		}

		let _columnGroupDto = new ColumnGroupDto();
		_columnGroupDto.title = _title;
		_columnGroupDto.colSpan = _colSpan;
		_columnGroupDto.rowSpan = _rowSpan;
		_columnGroupDto.isSort = _isSort;
		_columnGroupDto.headerClass = _headerClass;
		_columnGroupDto.headerStyle = _headerStyle;
		_columnGroupDto.isShowColumnTop = _isShowColumnTop;
		_columnGroupDto.isShowColumnBottom = _isShowColumnBottom;

		return _columnGroupDto;
	}

}
