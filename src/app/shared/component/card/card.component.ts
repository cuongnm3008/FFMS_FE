import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class AppCardComponent {

	@Input() classCard: string;

	@Input() classCardHeader: string;

	@Input() classCardTitler: string;

	@Input() classCardBody: string;
}

@NgModule({
	declarations: [
		AppCardComponent
	],
	exports: [
		AppCardComponent
	],
	imports: [
		CommonModule,
	]
})
export class AppCardModule { }
