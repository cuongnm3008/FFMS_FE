import { Injector } from '@angular/core';
import { AppTableHelper } from '../component/table/table-helper';

export abstract class AppComponentBase {

	loading = false;

	tableHelper: AppTableHelper;

	protected constructor(injector: Injector) {
		this.tableHelper = new AppTableHelper();
	}

}
