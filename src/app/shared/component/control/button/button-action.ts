import { CommonModule } from "@angular/common";
import { Component, ContentChildren, EventEmitter, Input, NgModule, OnInit, Output, QueryList } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";

@Component({
	selector: "app-button-action",
	template: `<ng-content></ng-content>`,
})
export class ButtonActionComponent {

	@Input() title: string;

	@Input() class: string;

	@Output() onClick = new EventEmitter();

}

@Component({
	selector: "app-button-actions",
	template: `
		<ng-container [ngSwitch]="type">
			<span *ngSwitchCase="'icon-action'">
				<button class="btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end">
					<span class="svg-icon svg-icon-1" nz-dropdown [nzDropdownMenu]="menuAction" [nzPlacement]="position" nzTrigger="click">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="4" fill="currentColor"></rect>
							<rect x="11" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor"></rect>
							<rect x="15" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor"></rect>
							<rect x="7" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor"></rect>
						</svg>
					</span>
				</button>
			</span>
			<ng-container *ngSwitchDefault>
				<a class="btn btn-sm btn-light btn-active-light-primary btn-action" nz-dropdown [nzDropdownMenu]="menuAction" [nzPlacement]="position" nzTrigger="click"><i class="fas fa-ellipsis-v"></i>
					<!-- <span class="svg-icon svg-icon-5 m-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="currentColor"></path>
						</svg>
					</span> -->
				</a>
			</ng-container>
		</ng-container>
		<nz-dropdown-menu #menuAction="nzDropdownMenu">
			<ul *ngIf="listButton && listButton.length" nz-menu nzSelectable style="min-width: 160px;">
				<li nz-menu-item *ngFor="let item of listButton" (click)="item.onClick.emit()">
					<a><i [class]="item.class" class="me-2"></i> {{item.title}}</a>
				</li>
			</ul>
		</nz-dropdown-menu>
    `,
})
export class ButtonActionsComponent implements OnInit {

	@Input() type: "icon-action";

	@Input() position: "bottomLeft" | "bottomCenter" | "bottomRight" | "topLeft" | "topCenter" | "topRight" = "bottomLeft";

	@ContentChildren(ButtonActionComponent) listButton: QueryList<ButtonActionComponent>;

	ngOnInit(): void { }
}

@NgModule({
	declarations: [
		ButtonActionComponent,
		ButtonActionsComponent
	],
	exports: [
		ButtonActionComponent,
		ButtonActionsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NzDropDownModule,
	]
})
export class AppButtonActionModule { }
