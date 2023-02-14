import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class AppUtilityService {

	static preloaderHidden = function (_renderer: Renderer2): void {
		var _htmlElement = document.getElementById('appPreloader');
		_renderer.addClass(_htmlElement, 'preloader-hidden-add');
		_renderer.addClass(_htmlElement, 'preloader-hidden-add-active');
		setTimeout(() => {
			_renderer.removeClass(_htmlElement, 'preloader')
			_renderer.removeClass(_htmlElement, 'preloader-hidden-add');
			_renderer.removeClass(_htmlElement, 'preloader-hidden-add-active');
			_renderer.addClass(_htmlElement, 'preloader-hidden');
		}, 300);
	}

	static isNullValidateForm = function (_htmlId: string): boolean {
		if(!(typeof _htmlId !== 'undefined' && _htmlId && _htmlId !== '')) return true;

		var _htmlElement = document.getElementById(_htmlId);
		if (!_htmlElement) return true;

		var _listElement = _htmlElement.querySelectorAll('.custom-warning-validate') as NodeListOf<HTMLElement>;
		if (_listElement != null && _listElement.length > 0) {
			_listElement.forEach((_element) => {
				_element.style.display = 'inline';
			});
		}

		var _listElement = _htmlElement.querySelectorAll('.custom-error-validate') as NodeListOf<HTMLElement>;
		if (_listElement != null && _listElement.length > 0) {
			_listElement.forEach((_element) => {
				_element.style.display = 'inline';
			});
			return true;
		} else {
			return false;
		}
	}

	static isHideMessgesValidate = function (_htmlId: string, _timeout: number = 50) {
    if(!(typeof _htmlId !== 'undefined' && _htmlId && _htmlId !== '')) return;

		var _htmlElement = document.getElementById(_htmlId);
		if (!_htmlElement) return;

		setTimeout(() => {
			var _listElement = _htmlElement?.querySelectorAll('.custom-warning-validate') as NodeListOf<HTMLElement>;
			if (_listElement != null && _listElement.length > 0) {
				_listElement.forEach((_element) => {
					_element.style.display = 'inline';
				});
			}

			var _listElement = _htmlElement?.querySelectorAll('.custom-error-validate') as NodeListOf<HTMLElement>;
			if (_listElement != null && _listElement.length > 0) {
				_listElement.forEach((_element) => {
					_element.style.display = 'none';
				});
			}
		}, _timeout);
	}

	static removeAllSpace(str: string): string {
		if (this.isNullOrEmpty(str)) {
			return str;
		}

		return str.replace(/\s/g, '');
	}

	static removeSignAndAllSpace(str: string): string {
		if (this.isNullOrEmpty(str)) {
			return str;
		}

		return this.removeSign(str.replace(/\s/g, ''));
	}

	static removeSign(str: string): string {
		if (this.isNullOrEmpty(str)) {
			return str;
		}
		str = str.toLowerCase();
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
		str = str.replace(/đ/g, 'd');
		str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
		str = str.replace(/ + /g, ' ');
		str = str.trim();
		return str;
	}

	static removeSignUrl(str: string): string {
		if (this.isNullOrEmpty(str)) {
			return str;
		}
		str = str.toLowerCase();
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
		str = str.replace(/đ/g, 'd');
		str = str.replace(/–|!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, '-');
		str = str.replace(/-+-/g, '-');
		str = str.replace(/^\-+|\-+$/g, '');
		str = str.trim();
		return str;
	}

	static numberCeiling(value: number, nearest: number): number {
		if (nearest <= 0 || nearest % 10 != 0) {
			throw new Error("Must round to a positive multiple of 10");
		}

		if (value <= nearest) return value;

		return Math.ceil(value / nearest) * nearest;
	}

	static isNullOrEmpty(input: any): boolean {
		return !(typeof input !== 'undefined' && input && input !== '');
	}

	static isNullOrWhitespace(input: any): boolean {
		if (typeof input === 'undefined' || !input || input === '') {
			return true;
		}

		if (typeof input === "string" && input.replace(/\s/g, '').length < 1) {
			return true;
		}

		return false;
	}

	static isEmail(email : any): boolean {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	static isNumber(number: any): boolean {
		var re = /^[0-9]{1,10}$/;
		return re.test(String(number).toLowerCase());
	}

	static isBoolean(value : any): boolean {
		return value !== null && value !== undefined && value !== "";
	}

	static isMoment(_dateTime : any): boolean {
		return _dateTime.isValid();
	}

	static getSession(_name: string): any {
		if (this.isNullOrEmpty(_name)) return null;
		var _session = sessionStorage.getItem(_name);
		return _session ? JSON.parse(_session) : null;
	}

	static setSession(_name: string, _data: any): any {
		if (!this.isNullOrEmpty(_name)) {
			sessionStorage.setItem(_name, JSON.stringify(_data));
		}
	}

	static removeItemSession(_name: string): any {
		if (!this.isNullOrEmpty(_name)) {
			sessionStorage.removeItem(_name);
		}
	}

	static getLocal(_name: string): any {
		if (this.isNullOrEmpty(_name)) return null;
		var _session = localStorage.getItem(_name);
		return _session ? JSON.parse(_session) : null;
	}

	static setLocal(_name: string, _data: any): any {
		if (!this.isNullOrEmpty(_name)) {
			localStorage.setItem(_name, JSON.stringify(_data));
		}
	}

	static removeItemLocal(_name: string): any {
		if (!this.isNullOrEmpty(_name)) {
			localStorage.removeItem(_name);
		}
	}

	// static loadStyle(callback: (loaded: boolean) => void) {
	// 	const _theme = AppUtilityService.getLocal("app_theme");

	// 	const setStyle = (_cssName: string) => {
	// 		const _idHtmlLink = `client-theme-${_cssName}`;
	// 		const _styleName = _theme === "dark" ? `theme-${_cssName}-dark.css` : `theme-${_cssName}-default.css`;
	// 		let _htmlLink = document.getElementById(_idHtmlLink) as HTMLLinkElement;
	// 		if (_htmlLink) {
	// 			_htmlLink.href = _styleName;
	// 		}
	// 		else {
	// 			_htmlLink = document.createElement('link');
	// 			_htmlLink.id = _idHtmlLink;
	// 			_htmlLink.rel = 'stylesheet';
	// 			_htmlLink.href = _styleName;

	// 			const _head = document.getElementsByTagName('head')[0];
	// 			_head.appendChild(_htmlLink);
	// 		}

	// 		_htmlLink.onerror = (error: any) => callback(false);
	// 		callback(true);
	// 	}

	// 	setStyle("ng-zorro");
	// 	setStyle("primeng");
	// 	setStyle("metronic");
	// }

  static viewsFileByBase64(_stringBase64: string, _htmlId: string): any {
		var obj = document.createElement('object');
		obj.style.width = '100%';
		obj.style.height = '100%';
		obj.type = 'application/pdf';
		obj.data = 'data:application/pdf;base64,' + _stringBase64;

		var elemEmentPdf = document.getElementById(_htmlId);
		elemEmentPdf.appendChild(obj);
	}

}
