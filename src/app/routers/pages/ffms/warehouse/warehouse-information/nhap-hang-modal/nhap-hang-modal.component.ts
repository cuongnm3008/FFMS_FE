import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { ProductWarehouseDto, ProductDto } from 'src/app/shared/service-proxies/system-management-service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';

@Component({
  selector: 'app-nhap-hang-modal',
  templateUrl: './nhap-hang-modal.component.html',
  styleUrls: ['./nhap-hang-modal.component.css']
})
export class NhapHangModalComponent extends AppModalComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private  _warehouseManagementService : WarehouseManagementService,
    )
  {
    super(injector);
  }

  @Input() dataItem = new  ProductWarehouseDto;
  @Input() cateogryId : number ;
  @Input() isView : boolean ;
  switchValue : boolean = false;
  products : ProductDto[];
  unitName : string ;

  ngOnInit(): void {
    console.log(this.dataItem);

    this.unitName = this.dataItem.product.unitName;
    this.dataItem.totalPrice = this.dataItem.price * this.dataItem.amount;
  }

  save(){
   if (AppUtilityService.isNullValidateForm("modalNhapHang")) {
      AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
      return;
    }
    this._warehouseManagementService.updateProductWarehouse(this.dataItem).subscribe(
      ()=>{
        AppMessageService.success("Xử lý thành công!","");
        this.close(true);
      }
    );
  }
}
