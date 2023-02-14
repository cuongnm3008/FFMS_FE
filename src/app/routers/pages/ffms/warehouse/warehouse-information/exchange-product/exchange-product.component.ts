import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { ProductWarehouseDto } from 'src/app/shared/service-proxies/system-management-service';
import { WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';

@Component({
  selector: 'app-exchange-product',
  templateUrl: './exchange-product.component.html',
  styleUrls: ['./exchange-product.component.css']
})
export class ExchangeProductComponent extends AppModalComponentBase implements OnInit {

  constructor(injector: Injector,
    private  _warehouseManagementService : WarehouseManagementService,
    )
  {
    super(injector);
  }


  @Input() dataItem = new ProductWarehouseDto();
  returnNumber: number;

  ngOnInit(): void {
     this.dataItem.product.name = this.dataItem.product.name;
    this.returnNumber = this.dataItem.amount;
    this.dataItem.fromDate = new Date();
  }


  save(){
    if (AppUtilityService.isNullValidateForm("exchangeProduct")) {
        AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
        return;
    }
    if(this.returnNumber <= this.dataItem.amount && this.returnNumber > 0){
      AppMessageService.confirm("","Bạn có chắc chắn muốn đổi trả sản phẩm hay không",
          ()=>{
            this.loading = false;
            this.dataItem.amount = this.returnNumber;
          this._warehouseManagementService.returnPackageById(this.dataItem).subscribe(
      ()=>{
          this.loading = false;
        AppMessageService.success("Đổi trả sản phẩm thành công!","");
        this.close(true);
          }
            );
          }
        );
    }else{
      AppMessageService.warning("Số lượng đổi trả phải thấp hơn số lượng sản phẩm hiện tại !","");
    }
  }

}
