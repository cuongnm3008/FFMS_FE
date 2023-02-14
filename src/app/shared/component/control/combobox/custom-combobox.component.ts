import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ComboBoxBaseComponent } from './combo-box-base.component';

@Component({
	selector: 'custom-combobox',
	template: `
        <nz-select
            [(ngModel)]="selectdId"
            [nzAllowClear]="true"
            [nzPlaceHolder]="sPlaceHolder"
            (ngModelChange)="sChange($event)"
            (nzOnSearch)="search($event)"
            style="width:100%"
            [nzDisabled]="isDisabled"
            [nzShowSearch]="true"
            nzServerSearch
        >
            <nz-option
                *ngFor="let option of datas"
                [nzValue]="option.id"
                [nzLabel]="option.name"
            ></nz-option>
        </nz-select>
    `,
})

export class CustomComboBoxComponent extends ComboBoxBaseComponent<number> implements OnInit {

  @Input() selectdId;

	constructor() {
		super();
	}

  @Input() datas : any[];

	ngOnInit() {
    this._listDataSeach = this.datas;
    this.listData = this.datas;
	}
}


@NgModule({
	declarations: [
		CustomComboBoxComponent
	],
	exports: [
		CustomComboBoxComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NzSelectModule,
	]
})
export class CustomComboBoxModule { }
