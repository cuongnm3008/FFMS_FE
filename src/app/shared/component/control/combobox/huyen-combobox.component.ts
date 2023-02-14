import { CommonModule} from '@angular/common';
import {Component,Input,NgModule,OnChanges,OnInit,SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Int32ItemObj } from 'src/app/shared/service-proxies/system-management-service';
import { AddressServiceService } from 'src/app/shared/services/address-service.service';
import { ComboBoxBaseComponent } from './combo-box-base.component';

@Component({
	selector: 'huyen-combobox',
	template: `
        <nz-select
            [(ngModel)]="sModel"
            nzAllowClear
            [nzPlaceHolder]="sPlaceHolder"
            (ngModelChange)="controlChange($event)"
            (nzOnSearch)="search($event)"
            style="width:100%"
            [nzDisabled]="isDisabled || isNotSelectedParent"
            nzShowSearch
            nzServerSearch
        >
            <nz-option
                *ngFor="let option of listData"
                [nzValue]="option.id"
                [nzLabel]="option.name"
            ></nz-option>
        </nz-select>
    `,
})
export class HuyenComboBoxComponent extends ComboBoxBaseComponent implements OnInit, OnChanges {

  constructor(private _addressServiceService: AddressServiceService) {
    super();
  }

  @Input() isNotSelectedParent = false;
	@Input() tinhId?: string;

	ngOnChanges(changes: SimpleChanges): void {
		setTimeout(() => {
			if (changes['tinhId'] && this._listDataAll) {
				if (this.tinhId) {
          this.listData =	this._listDataAll.filter(x => x.parentId == this.tinhId);
				}else {
					this.listData = this._listDataAll;
				}
				this._listDataSeach = this.listData;
				this.isNotSelectedParent = !this.tinhId;
				if (!this.tinhId || !this.listData.find(x => x.id == this.sModel)) {
					this.sChange(undefined);
				}
			}
		},500);
	}

	ngOnInit() {
    this._addressServiceService.getDistricts().subscribe((res)=>{
      if(res){
        res.forEach(item => {
          let _comboboxObj = new Int32ItemObj();
          _comboboxObj.id = item["code"];
          _comboboxObj.name = item["name"];
          _comboboxObj.parentId = item["parent_code"];
          this.listData.push(_comboboxObj);
          this._listDataAll.push(_comboboxObj);
          this._listDataSeach.push(_comboboxObj);
        });
      }
    });
	}
}

@NgModule({
	declarations: [
		HuyenComboBoxComponent
	],
	exports: [
		HuyenComboBoxComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NzSelectModule,
	]
})
export class HuyenComboBoxModule { }
