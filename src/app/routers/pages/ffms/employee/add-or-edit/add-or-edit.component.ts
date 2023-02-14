import {SystemManagementService, UserDto } from 'src/app/shared/service-proxies/system-management-service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddressServiceService } from 'src/app/shared/services/address-service.service';
import { first } from 'rxjs';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { RoleDTO, RoleService } from 'src/app/shared/services/role/role.service';
import { Constants } from 'src/app/shared/common/Constant';
import { ValidatorResponseDTO } from 'src/app/shared/model/validation-dto';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.css'],

})
export class AddOrEditEmployeeComponent extends AppModalComponentBase implements OnInit {
  timeout: any = null;

  cities: any = [];
  districts: any = [];
  percincts: any = [];
  lstRoles : any = [];
  isEdit = false;
  cities1: any = [];
  districts1: any = [];
  percincts1: any = [];
  validaorRes : ValidatorResponseDTO = new ValidatorResponseDTO();
  lstCoSo : any = [];


   currentDate = new Date();

  data : UserDto;
  rePassword :string;
  @Input() isView : boolean = false;
@Input() _disDisabled : boolean = false;
    lstStatus : any = [
     {
       id : "1",
       name : 'Đang làm việc'
     },
    {
     id : "0",
     name : 'Đã nghỉ việc'
   }]
  rolePicked : any = 6;

  fileList : NzUploadFile[] = [];

  constructor(
    injector: Injector,
    private  _modalService: NzModalService,
    private  _systemManagementService : SystemManagementService,
    private _roleService: RoleService,
    private addressService: AddressServiceService,
    private _foundationFields : FoundationFieldsService
  ) {
    super(injector);
  }

 @Input() _dataItem = new  UserDto();

  lstGender :any = [{
      id : 'M',
      name : 'Nam'
    },{
      id : 'F',
      name : 'Nữ'
    }
  ]
  ngOnInit(): void {
     this._dataItem.foundationCode = "CS_DD_I";
      this._dataItem.enable = "1";

    this._dataItem.phones.push(
    {
      id: null,
      userId: null,
      phone: ""
    },
    {
      id: null,
      userId: null,
      phone: ""
    });
    // this.dataItem.status = "1";
    this._dataItem.addresses.push({
      province : "",
      district : "",
      percinct : "",
      addressDetail : "",
      type : "1"
    },
    {
      province : "",
      district : "",
      percinct : "",
      addressDetail : "",
      type : "2"
    });

    // this.dataItem.password = "Ffms@2022113";
    let cities: any = [];
    const data = this.addressService.getCities().pipe(first()).subscribe((citiesRes) => {
      if (citiesRes != null) {
        citiesRes.forEach((city: any) => {
          cities.push({
            name: city.name,
            id : city.code,
          })
        })
        this.cities = [...cities];
      }
    })
    this.getAllRole();
    this.getLstFoundation();
    // this.intAddress();
    this.initFileImage()
    if(!this.isView&&this.isEdit){
      this.rolePicked = (this._dataItem.role.length > 0) ? this._dataItem.role[0].id : null;
    }
  }

  initFileImage(){
    this.fileList.push({
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: this._dataItem.image
    })
  }

  // intAddress(){
  //   this.onChangeCities(this._dataItem.addresses[0].province, 0);
  //   this.onChangeDistrict(this._dataItem.addresses[0].district, 0);
  //   this.onChangeCities(this._dataItem.addresses[1].province, 1);
  //   this.onChangeDistrict(this._dataItem.addresses[1].district, 1);
  // }

  getAllRole(){
    this.lstRoles = [];
    let body : RoleDTO = {
      offset :  0,
      limit: 1000
    }
    this._roleService.getLstRole(body).subscribe(data => {
        data.content.forEach(res => {
          this.lstRoles.push({
            id : res.id,
            name : res.roleName
          })
        })
    });
  }


  getLstFoundation(){
    this._foundationFields.getListCoSoCombobox().subscribe(e => {
      e.forEach(data => {
        this.lstCoSo.push({
          id : data.foundationCode,
          name : data.name
        });
      })
    })
  }

  validate(type: string){
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      $this._systemManagementService.validate({value: $this._dataItem.username, type: Constants.USERNAME}).subscribe(e => {
        $this.validaorRes = {
          status : e.status,
          message : e.message,
          suggestUsername : e.suggestUsername,
          type : e.type
        }
      })
    }, 500);
  }

  save(){
    // if (AppUtilityService.isNullValidateForm("modalEmpoloyeeInfor")){
    //   const modal = this._modalService.warning({
    //     nzTitle: 'Lưu ý',
    //     nzContent: 'Nhập đầy đủ thông tin các trường',
    //   });
    //   setTimeout(() => modal.destroy(), 1000);
    // }

    if (AppUtilityService.isNullValidateForm("modalEmpoloyeeInfor")) {
       AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
       return;
    }

    if(this.rePassword != this._dataItem.password){
       AppMessageService.error("","Nhập lại mật khẩu không khớp !!!");
       return;
    }
    this._dataItem.lstRoles = new Array();
    this._dataItem.lstRoles.push(this.rolePicked);
    this._systemManagementService.createOrEditEmployee(this._dataItem).subscribe(data => {
      if(!isNullOrUndefinedOrEmpty(data)){
        this.loading = false;
         AppMessageService.success("Thêm nhân viên thành công!","");
        this.close(true);
      }
    });
  }

  update(){
    if (AppUtilityService.isNullValidateForm("modalEmpoloyeeInfor")){
      const modal = this._modalService.warning({
        nzTitle: 'Lưu ý',
        nzContent: 'Nhập đầy đủ thông tin các trường',
      });
      setTimeout(() => modal.destroy(), 1000);
    }
    var a = formatDate(this._dataItem.birthDate, 'yyyy-MM-dd hh:mm:ssZZZZZ', 'en_US');
    var b = new Date(a);
    this._dataItem.birthDate = b;
    this._dataItem.addresses = this._dataItem.addresses.filter(e => !isNullOrUndefinedOrEmpty(e.province)
     && !isNullOrUndefinedOrEmpty(e.district) && !isNullOrUndefinedOrEmpty(e.percinct));
    if(this._dataItem.addresses.length <= 1){
      this._dataItem.addresses.push({
          province : "",
          district : "",
          percinct : "",
          addressDetail : "",
          type : "2"
      })
    }
    // this.dataItem.birthDate | Date 'yyyy-MM-dd hh:mm:ssZZZZZ';
    // this.dataItem.birthDate = formatDate(new)
    this._dataItem.addresses.splice(2,2);
    this._dataItem.lstRoles = new Array();
    this._dataItem.lstRoles.push(this.rolePicked)
    this._systemManagementService.updateEditEmployee(this._dataItem).subscribe(data => {
      if(!isNullOrUndefinedOrEmpty(data)){
          AppMessageService.success("Cập nhập nhân viên thành công!","");
        this.close(true);
      }
    });
  }
  onChangePasswordInput($event){
    console.log($event);
  }

}
