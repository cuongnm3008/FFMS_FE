import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-table-button-sub',
	template: `
	<button (click)="clickButton()" [class.active]="dataItem.isShowSub" class="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-25px w-25px">
		<span class="svg-icon svg-icon-3 m-0 toggle-off">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<rect opacity="0.5" x="11" y="18" width="12" height="2" rx="1" transform="rotate(-90 11 18)" fill="currentColor"></rect>
				<rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor"></rect>
			</svg>
		</span>
		<span class="svg-icon svg-icon-3 m-0 toggle-on">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor"></rect>
			</svg>
		</span>
	</button>
	`,
})
export class AppTableButtonSubComponent {

	@Input() dataItem: any;

	@Output() onClick = new EventEmitter<any>();

	clickButton(): void {
		this.dataItem.isShowSub = !this.dataItem.isShowSub;
		this.onClick.emit(this.dataItem);
	}
}
