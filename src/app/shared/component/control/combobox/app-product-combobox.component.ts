import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { ComboBoxBaseComponent } from './combo-box-base.component';

@Component({
	selector: 'app-product-combobox',
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
				        nzCustomContent
                [nzValue]="option.id"
                [nzLabel]="option.name">
					      <div class="d-flex align-items-center custom-filter-media">
                <span class="fw-bold"></span>{{option.importCouponCode}}<br>
                <span class="fw-bold"></span>{{option.productCode}}<br>
                <span class="fw-bold"></span>{{option.supplier}}<br>
                <span class="fw-bold"></span>{{option.amount}}
					    </div>
			</nz-option>
        </ng-container>
        </nz-select>
    `,
})

export class AppProductComboBoxComponent extends ComboBoxBaseComponent implements OnInit {

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
		AppProductComboBoxComponent
	],
	exports: [
		AppProductComboBoxComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NzSelectModule,
	]
})
export class AppProductComboBoxModule { }
