import {Injectable } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';



@Injectable()
export class FFMSNotifyService {


  constructor(private notification: NzNotificationService) {}

	static success = function (_text: string, _title: string = undefined): void {
		this.commonNotify(_text, _title, 'success');
	}

	static error = function (_text: string, _title: string = undefined): void {
		this.commonNotify(_text, _title, 'error');
	}

	static warning = function (_text: string, _title: string = undefined): void {
		this.commonNotify(_text, _title, 'warning');
	}

	static info = function (_text: string, _title: string = undefined): void {
		this.commonNotify(_text, _title, 'info');
	}

	static question = function (_text: string, _title: string = undefined): void {
		this.commonNotify(_text, _title, 'question');
	}

	commonNotify (_text: string, _title: string, _type: string): void {
    this.notification.create( _type, _title,_text)
	}
}


