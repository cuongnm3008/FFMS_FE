import { SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { CustomerDto } from './../../../../../shared/service-proxies/system-management-service';
import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css']
})
export class CustomerModalComponent extends AppModalComponentBase implements OnInit {

  constructor(injector: Injector,
    private  _customerManagementService : SystemManagementService,
    private _footballFieldService: FoundationFieldsService,
    )
  {
    super(injector);
  }

 lstStatus : any = [
      {
       id : "1",
       name : 'Khách hàng đang liên hệ'
     },
    {
     id : "0",
     name : 'Khách hàng không còn liên hệ'
   }]
   lstGender :any = [{
      id : 'M',
      name : 'Nam'
    },{
      id : 'F',
      name : 'Nữ'
    }
  ]
  @Input() dataItem  = new CustomerDto();
  @Input() isView : boolean;
  @Input() isEdit : boolean;

  listCategory :  any[];
  listUnit :  any[];

  listFoundation: any[];
  fileList : NzUploadFile[] = [];


  ngOnInit(): void {

      if(isNullOrUndefinedOrEmpty(this.dataItem.status)){
      this.dataItem.status = "1";
    }

       this._footballFieldService.getListCoSoCombobox().subscribe(
         (result)=> {
           this.listFoundation = result;
           this.dataItem.foundationId = Number(this.listFoundation[0]['id']);

         }
        );
        this.initFileImage();

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
    if (AppUtilityService.isNullValidateForm("modalCustomerInfor")) {
        AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
        return;
    }
    this.loading = true ;
      this._customerManagementService.createOrUpdateCustomer(this.dataItem).subscribe(
        ()=>{
          this.loading = false;
          AppMessageService.success("Thêm khách hàng thành công thành công!","");
          this.close(true);
        }
      );
    }
 update(){
    if (AppUtilityService.isNullValidateForm("modalCustomerInfor")) {
        AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
        return;
    }
    debugger;
    // this.loading = true ;
      // this.dataItem.foundationId = Number(this.listFoundation[0]['id']);
      this._customerManagementService.createOrUpdateCustomer(this.dataItem).subscribe(
        ()=>{
          this.loading = false;
          AppMessageService.success("Cập nhập khách hàng thành công thành công!","");
          this.close(true);
        }
      );
    }

}
