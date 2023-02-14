import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { SupplierDto, WarehouseManagementService } from './../../../../../shared/service-proxies/warehouse-management-service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';

@Component({
  selector: 'app-supplier-modal',
  templateUrl: './supplier-modal.component.html',
})
export class SupplierModalComponent extends AppModalComponentBase implements OnInit {

  constructor(injector: Injector,
    private  _warehouseManagementService : WarehouseManagementService,
    )
  {
    super(injector);
  }


  lstStatus : any = [
    {
      id : "1",
      name : 'Hợp tác'
    },
   {
    id : "0",
    name : 'Dừng hợp tác'
  }]

  @Input() dataItem  = new SupplierDto();
  @Input() isView : boolean;
  @Input() isEdit : boolean;


  ngOnInit(): void {
    if(isNullOrUndefinedOrEmpty(this.dataItem.status)){
      this.dataItem.status = "1";
    }
  }

  save(){
    if (AppUtilityService.isNullValidateForm("modalSupplierInfor")) {
        AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
        return;
    }
    this.loading = true ;
      this._warehouseManagementService.createOrUpdateSupplier(this.dataItem).subscribe(
        ()=>{
          this.loading = false;
          AppMessageService.success("Thêm nhà cung cấp thành công thành công!","");
          this.close(true);
        }
      );
    }
  }

