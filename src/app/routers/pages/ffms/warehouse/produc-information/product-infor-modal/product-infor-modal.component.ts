import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { ProductDto } from 'src/app/shared/service-proxies/system-management-service';
import { WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-infor-modal.component.html',
})
export class ProductInforModalComponent extends AppModalComponentBase implements OnInit {

  constructor(injector: Injector,
    private  _warehouseManagementService : WarehouseManagementService,
    )
  {
    super(injector);
  }

  listCategory :  any[];
  listUnit :  any[];
  @Input() dataItem = new ProductDto();
  @Input() isView : boolean;
  fileList : NzUploadFile[] = [];



  ngOnInit(): void {
    this.listCategory = this._warehouseManagementService.getListCategory();
    this._warehouseManagementService.getListUnit().subscribe((result)=>{
      if(result){
      this.listUnit = this.listUnit || [];
        result.forEach(res => {
          this.listUnit.push({
            id : + res.code,
            name : res.name
          })
        });
      }
    });

    if (this.dataItem.image) {
      this.fileList.push({
        uid: '1',
        name: 'image.png',
        status: 'done',
        url: this.dataItem.image
      })
    }
  }

  save(){
    if (AppUtilityService.isNullValidateForm("modalProductInfor")) {
       AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
       return;
    }
    this.loading = true ;
    this.dataItem.lstFoundationId =  this.dataItem.lstFoundationId|| [];
    this.dataItem.lstFoundationId.push(1);
    this._warehouseManagementService.createOrEditProduct(this.dataItem).subscribe(
      ()=>{
        this.loading = false;
        AppMessageService.success("Xử lý thành công!","");
        this.close(true);
      }
    );
   }


}
