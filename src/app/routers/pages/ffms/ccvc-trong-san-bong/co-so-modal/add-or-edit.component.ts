import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { first } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { AddressDTO, CoSoSanBongDto, FootballFielDto, SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { AddressServiceService } from 'src/app/shared/services/address-service.service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.css']
})
export class AddOrEditCoSoSanBongComponent extends AppModalComponentBase implements OnInit {
  cities: any = [];
  districts: any = [];
  percincts: any = [];
  fileList : NzUploadFile[] = [];


  constructor(
		injector: Injector,
    private  _systemManagementService : SystemManagementService,
    private _foundationFields : FoundationFieldsService,
    private addressService: AddressServiceService,
    private  _modalService: NzModalService,

	) {
		super(injector);
	}
  @Input() dataItem = new CoSoSanBongDto();
    @Input() _dataItem = new CoSoSanBongDto();



  listTrangThaiCoSo = [
    {
      id : "1",
      name: "Đang kinh doanh"
    },
    {
      id : "2",
      name: "Ngừng kinh doanh"
    },
    {
      id : "3",
      name: "Bảo trì"
    },

   ];


  ngOnInit(): void {
    // console.log("listTrangThaiCoSo", JSON.stringify(this.dataItem));

    //  this.dataItem.address = new AddressDTO();
    //   this.dataItem.address.type ="1";
    //   this.dataItem.address.province ="";
    //   this.dataItem.address.district ="";
    //    this.dataItem.address.percinct ="";
    //   this.dataItem.address.addressDetail ="";



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
        this.dataItem.address = this.dataItem.address ? this.dataItem.address : new AddressDTO();
      }
    })
     this.initFileImage();
    // this.onChangeCities(this.dataItem.address.province);
     this.onChangeDistrict(this.dataItem.address.district);
  }

 initFileImage(){
    this.fileList.push({
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: this.dataItem.image
    })
  }

  save(){
    if (AppUtilityService.isNullValidateForm("modalCoSoSanBong")){
      const modal = this._modalService.warning({
        nzTitle: 'Lưu ý',
        nzContent: 'Nhập đầy đủ thông tin các trường',
      });
      debugger;
      setTimeout(() => modal.destroy(), 1000);
    }
    this.dataItem.address = new AddressDTO();
    this.dataItem.address.addressDetail = this.dataItem.addressDetail;
    this.dataItem.address.district = this.dataItem.district;
    this.dataItem.address.province =this.dataItem.province;
    this.dataItem.address.percinct = this.dataItem.percinct;
  //    this.dataItem.address.addressDetail = "";
  //   this.dataItem.address.district = "1";
  //   this.dataItem.address.province ="1";
  //  this.dataItem.address.percinct = "1";
    this.dataItem.latitude = 1600206358621;
    this.dataItem.longtitude = 12312344;
    this.dataItem.name = this._dataItem.name;
    this.dataItem.foundationCode = this._dataItem.foundationCode;
    this.dataItem.description = this._dataItem.description;
    this.dataItem.status = this._dataItem.status;
    this.dataItem.id = this._dataItem.id;
    debugger;
    // if(isNullOrUndefinedOrEmpty(this._dataItem.id)){
      this._foundationFields.update(this.dataItem).subscribe(data => {
        if(data){
          this.close();
        }
      });
    // }
    // if(isNullOrUndefinedOrEmpty(this.dataItem.id)){
    //   this._foundationFields.create(this.dataItem).subscribe(data => {
    //     if(data){
    //       this.close(this.dataItem);
    //     }
    //   });
    // }else{
    //   this._foundationFields.update(this.dataItem).subscribe(data => {
    //     if(data){
    //       this.close(this.dataItem);
    //     }
    //   });
    // }
  }

  //  initFileImage(){
  //   this.fileList.push({s
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: this.dataItem.image
  //   })
  // }

  onChangeCities(data: any) {
    this.dataItem.address.province= data;
    this.districts = [];
    this.addressService.getDistricts().subscribe((districtsRes) => {
      if (districtsRes != null) {
        districtsRes.forEach((district: any) => {
          if(district.parent_code === data){
            this.districts.push({
              name: district.name,
              id: district.code,
              parent_code: district.parent_code
            })
          }
        })
      }
    })
  }

  onChangeDistrict(data: any) {
    this.dataItem.address.district = data;
    this.percincts = [];
    this.addressService.getWards().subscribe((element) => {
      if (element != null) {
        element.forEach((wards: any) => {
          if(wards.parent_code === data){
            this.percincts.push({
              name: wards.name,
              id: wards.code,
              parent_code: wards.parent_code
            })
          }
        })
      }
    })
  }
}
