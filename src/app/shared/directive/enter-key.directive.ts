import { Directive, EventEmitter, HostListener, Input, NgModule, Output } from '@angular/core';

@Directive({
	selector: '[enterKey]'
})
export class EnterKeyDirective {

	isMouseover = false;

	@Input() isFullScreen = false;

	@Output() enterKeyEvent = new EventEmitter();

	@HostListener('mouseenter', ['$event'])
	onEnter(e: MouseEvent) {
		this.isMouseover = this.isFullScreen || true;
	}

	@HostListener('mouseleave', ['$event'])
	onLeave(e: MouseEvent) {
		this.isMouseover = this.isFullScreen || false;
	}

	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (event.keyCode === 13 && this.isMouseover) { // 13 = enter
			this.enterKeyEvent.emit();
		}
	}
}

@NgModule({
	declarations: [
		EnterKeyDirective
	],
	exports: [
		EnterKeyDirective
	],
})
export class EnterKeyModule { }
