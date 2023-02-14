import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';

export class AppTableHelper {

	predefinedRecordsCountPerPage = [10, 25, 50, 250];

	defaultRecordsCountPerPage: number = 10  ;

	currentPage = 0;

	isResponsive = true;

	scrollable = false;

	resizableColumns = true;

	currentPageReportTemplate = window.innerWidth > 800 ? "Hiển thị từ {first} đến {last} trong {totalRecords} bản ghi" : "Tổng {totalRecords} bản ghi";

	totalRecordsCount = 0;

	records: any[];

	isLoading = false;

	skipCount = 0 ;

	sorting: string ;

	lazyLoadEvent: LazyLoadEvent | undefined;

	getChangeAllValue(_event?: LazyLoadEvent): void {
		this.lazyLoadEvent = _event;
		if (_event) {
			this.getSorting(_event);
			this.skipCount = _event.first == undefined ? 0 : _event.first;
			this.defaultRecordsCountPerPage = _event.rows == undefined ? 0 : _event.rows;
		}
		else {
			this.currentPage = 0;
			this.skipCount = 0;
		}
	}

	showLoadingIndicator(): void {
		setTimeout(() => {
			this.isLoading = true;
		}, 0);
	}

	hideLoadingIndicator(): void {
		setTimeout(() => {
			this.isLoading = false;
		}, 0);
	}

	getSorting(table: Table | LazyLoadEvent): string {
		this.sorting;
		if (table.sortField) {
			this.sorting = table.sortField;
			if (table.sortOrder === 1) {
				this.sorting += ' ASC';
			} else if (table.sortOrder === -1) {
				this.sorting += ' DESC';
			}
		}

		return this.sorting;
	}

	getMaxResultCount(paginator: Paginator, event: LazyLoadEvent): number {
		if (paginator.rows) {
			return paginator.rows;
		}

		if (!event) {
			return 0;
		}

		return event.rows == undefined ? 0 : event.rows ;
	}

	getSkipCount(paginator: Paginator, event: LazyLoadEvent): number {
		if (paginator.first) {
			return paginator.first;
		}

		if (!event) {
			return 0;
		}

		return event.first  == undefined ? 0 : event.first;
	}

	shouldResetPaging(event: LazyLoadEvent): boolean {
		if (!event /*|| event.sortField*/) { // if you want to reset after sorting, comment out parameter
			return true;
		}

		return false;
	}
}
