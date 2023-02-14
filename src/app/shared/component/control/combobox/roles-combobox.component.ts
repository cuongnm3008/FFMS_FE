import { Int32ItemObj } from './../../../service-proxies/system-management-service';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboBoxBaseComponent } from './combo-box-base.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AddressServiceService } from 'src/app/shared/services/address-service.service';
import { RoleDTO, RoleService } from 'src/app/shared/services/role/role.service';

@Component({
  selector: 'role-combobox',
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
export class RoleComboBoxComponent extends ComboBoxBaseComponent implements OnInit {

  constructor(private _roleService: RoleService) {
    super();
  }

  ngOnInit() {
    let body : RoleDTO = {
      offset :  0,
      limit: 1000
  }

  this._roleService.getLstRole(body).subscribe((res) => {
      if(res){
        res.content.forEach(item => {
          let _comboboxObj = new Int32ItemObj();
          _comboboxObj.id = item["roleCode"];
          _comboboxObj.name = item["roleName"];
          this.listData.push(_comboboxObj);
          this._listDataSeach.push(_comboboxObj);
        });
      }
    });
  }
}

@NgModule({
  declarations: [
    RoleComboBoxComponent
  ],
  exports: [
    RoleComboBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
  ]
})
export class RoleComboBoxModule { }
