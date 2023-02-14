import { Component, inject, Injector, Input, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ValidatorResponseDTO } from 'src/app/shared/model/validation-dto';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { SystemManagementService, UserDto } from 'src/app/shared/service-proxies/system-management-service';
import { AddressServiceService } from 'src/app/shared/services/address-service.service';
import { RoleService } from 'src/app/shared/services/role/role.service';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent extends AppModalComponentBase{

  constructor(
    private _addressServiceService: AddressServiceService,
    injector: Injector,
  ) {
    super(injector);
  }
 result :any;
 addrest1 :string;
 test :string;
 @Input() dataItem = new  UserDto();

 provineName : any;
 districtName : any;
 percentName : any;

ngOnInit(): void {
    this.result = JSON.stringify(this.dataItem.role);
    this.test = this.result[0].roleName;
    this.addrest1 = JSON.stringify(this.dataItem.foundationCode);
    this._addressServiceService.getCities().subscribe((res) => {
      if(res){
        this.provineName = res.filter(r => r.code+"" == this.dataItem.addresses[0].province)[0];
        this._addressServiceService.getDistricts().subscribe((res1)=>{
          this.districtName = res1.filter(r => r.code+"" == this.dataItem.addresses[0].district)[0];
          this._addressServiceService.getWards().subscribe((res2) => {
            this.percentName = res2.filter(r => r.code+"" == this.dataItem.addresses[0].percinct)[0];
          })
        })
      }
    })
  }


}
