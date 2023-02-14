import { Int32ItemObj } from './../../../service-proxies/system-management-service';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboBoxBaseComponent } from './combo-box-base.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';

@Component({
  selector: 'unit-combobox',
  template: `
        <nz-select
            [(ngModel)]="sModel"
            nzAllowClear
            [nzPlaceHolder]="sPlaceHolder"
            (ngModelChange)="controlChange($event)"
            (nzOnSearch)="search($event)"
            style="width:100%"
            [nzDisabled]="isDisabled"
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
export class UnitComboBoxComponent extends ComboBoxBaseComponent implements OnInit {
  constructor(    private  _warehouseManagementService : WarehouseManagementService) {
    super();
  }

  ngOnInit() {
     this._warehouseManagementService.getListUnit().subscribe(res => {
      if(res){
        res.forEach(item => {
          let _comboboxObj = new Int32ItemObj();

          _comboboxObj.id = item["code"];
          _comboboxObj.name = item["name"];

          this.listData.push(_comboboxObj);
          this._listDataSeach.push(_comboboxObj);
        });
      }
    })
  }
}

@NgModule({
  declarations: [
    UnitComboBoxComponent
  ],
  exports: [
    UnitComboBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
  ]
})
export class UnitComboBoxModule { }
