import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
	selector: "button-icon",
	template: `
		<a (click)="sClick.emit()" [class.disabled]="isDisabled" class="btn btn-icon btn-light btn-hover-primary w-30px h-30px">
			<span class="svg-icon svg-icon-3">
				<ng-content></ng-content>
			</span>
		</a>
    `,
})
export class ButtonIconComponent implements OnInit {

	@Input() titleTooltip?: string;

	@Input() isDisabled?: boolean;

	@Output() sClick = new EventEmitter<boolean>();

	ngOnInit(): void {

	}
}

@NgModule({
	declarations: [
		ButtonIconComponent
	],
	exports: [
		ButtonIconComponent
	],
	imports: [
		CommonModule,
		FormsModule,
	]
})
export class AppButtonIconModule { }
