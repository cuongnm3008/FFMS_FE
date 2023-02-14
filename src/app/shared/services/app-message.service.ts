import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'

type IconMessage = 'success' | 'error' | 'warning' | 'info' | 'question';

@Injectable()
export class AppMessageService {

	static success = function (_text: string, _title: string = undefined): void {
		this.commonMessage(_text, _title, 'success');
	}

	static error = function (_text: string, _title: string = undefined): void {
		this.commonMessage(_text, _title, 'error');
	}

	static warning = function (_text: string, _title: string = undefined): void {
		this.commonMessage(_text, _title, 'warning');
	}

	static info = function (_text: string, _title: string = undefined): void {
		this.commonMessage(_text, _title, 'info');
	}

	static question = function (_text: string, _title: string = undefined): void {
		this.commonMessage(_text, _title, 'question');
	}

	static confirm = function (_text: string, _title: string, callback?: () => void): void {
		Swal.fire({
			icon: 'question',
			title: _title || _text,
			html: _title ? _text : undefined,
			showCloseButton: true,
			showCancelButton: true,
			focusConfirm: false,
			focusCancel: true,
			confirmButtonText: 'Đồng ý',
			cancelButtonText: 'Đóng',
		}).then((result: { isConfirmed: any; }) => {
			if (callback && result.isConfirmed) callback();
		})
	}

	static confirmSuccess = function (_text: string, _title: string, callback?: () => void): void {
		Swal.fire({
			icon: 'success',
			title: _title || _text,
			html: _title ? _text : undefined,
			showCloseButton: true,
			showCancelButton: true,
			focusConfirm: false,
			focusCancel: true,
			confirmButtonText: 'Đồng ý',
			cancelButtonText: 'Đóng',
		}).then((result: { isConfirmed: any; }) => {
			if (callback && result.isConfirmed) callback();
		})
	}

	// static confirmAndInput = function (_title: string, _inputPlaceholder: string, callback?: (_value: any) => void): void {
	// 	Swal.fire({
	// 		title: `<div class="fs-2 text-gray-800" style="margin-top: 25px">${_title}</div>`,
	// 		input: 'text',
	// 		inputPlaceholder: _inputPlaceholder,
	// 		inputValidator: (value: any) => {
	// 			if (!value) return 'Không được để trống!'
	// 		},
	// 		inputAttributes: {
	// 			autocapitalize: 'off'
	// 		},
	// 		showCloseButton: true,
	// 		showCancelButton: true,
	// 		confirmButtonText: 'Xác nhận',
	// 		cancelButtonText: 'Đóng',
	// 		showLoaderOnConfirm: true,
	// 		preConfirm: (value: any) => value,
	// 		allowOutsideClick: () => !Swal.isLoading()
	// 	}).then((result: { isConfirmed: any; value: any; }) => {
	// 		if (callback && result.isConfirmed) callback(result.value);
	// 	})
	// }

	private static commonMessage = function (_text: string, _title: string, _icon: IconMessage): void {
		Swal.fire({
			icon: _icon,
			title: _title || _text,
			text: _title ? _text : undefined,
		})
	}
}
