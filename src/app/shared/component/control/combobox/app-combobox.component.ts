import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { ComboBoxBaseComponent } from './combo-box-base.component';

@Component({
	selector: 'app-combobox',
	template: `
        <nz-select
            [(ngModel)]="sModel"
            [nzAllowClear]="true"
            [nzPlaceHolder]="sPlaceHolder"
            (ngModelChange)="sChange($event)"
            (nzOnSearch)="search($event)"

            style="width:100%"
            [nzDisabled]="isDisabled"
            nzShowSearch
            nzServerSearch
        >
        <ng-container *ngIf="listData">
            <nz-option
                *ngFor="let option of listData"
                [nzValue]="option.id"
                [nzLabel]="option.name"
            ></nz-option>
        </ng-container>
        </nz-select>
    `,
})

export class AppComboBoxComponent extends ComboBoxBaseComponent implements OnInit {

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
		AppComboBoxComponent
	],
	exports: [
		AppComboBoxComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NzSelectModule,
	]
})
export class AppComboBoxModule { }
