import { Int32ItemObj } from './../../../service-proxies/system-management-service';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComboBoxBaseComponent } from './combo-box-base.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';

@Component({
  selector: 'foundation-get-id-combobox',
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
            [nzAllowClear]="true"
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
export class FoundationGetIdomboBoxComponent extends ComboBoxBaseComponent implements OnInit {

  constructor(private _foundationFields : FoundationFieldsService) {
    super();
  }

  ngOnInit() {
     this._foundationFields.getListCoSoCombobox().subscribe(res => {
      if(res){
        res.forEach(item => {
          let _comboboxObj = new Int32ItemObj();

          _comboboxObj.id = item["id"];
          _comboboxObj.name = item["name"];

          this.listData.push(_comboboxObj);
          this._listDataSeach.push(_comboboxObj);
        });
        // if(!this.sModel){
        //   console.log("Here");
        //   this.sModel =  this.listData[0].id  as string;
        // }
      }
    })
  }
}

@NgModule({
  declarations: [
    FoundationGetIdomboBoxComponent
  ],
  exports: [
    FoundationGetIdomboBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
  ]
})
export class FoundationGetIdComboBoxModule { }
