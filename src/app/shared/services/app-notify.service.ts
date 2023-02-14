import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'

type IconNotify = 'success' | 'error' | 'warning' | 'info' | 'question';

@Injectable()
export class AppNotifyService {

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

	private static commonNotify = function (_text: string, _title: string, _icon: IconNotify): void {
		const Toast = Swal.mixin({
			toast: true,
			position: 'bottom-end',
			showConfirmButton: false,
			timer: 4000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		})

		Toast.fire({
			icon: _icon,
			title: _title || _text,
			text: _title ? _text : undefined,
		})
	}
}
