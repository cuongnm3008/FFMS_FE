import { Injector } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AppComponentBase } from './AppComponentBase';

export abstract class AppModalComponentBase<TypeDto = boolean> extends AppComponentBase {

	constructor(injector: Injector) {
		super(injector);
		this._modal = injector.get(NzModalRef);
	}

	_modal: NzModalRef;

  // loading = false;
	override loading = false;

	close(_dataPram?: TypeDto): void {
		this._modal.close(_dataPram);
	}
}
