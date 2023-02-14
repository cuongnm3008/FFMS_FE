import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { ImportProductDto } from './../../../../../../../../shared/service-proxies/warehouse-management-service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';

@Component({
  selector: 'app-import-history-model',
  templateUrl: './import-history-model.component.html',
  styleUrls: ['./import-history-model.component.css']
})
export class ImportHistoryModelComponent extends AppModalComponentBase implements OnInit {

  constructor(
    injector: Injector,
  private  _customerManagementService : SystemManagementService,
    )

  {    super(injector); }

  @Input() dataItem  = new ImportProductDto();
 @Input() isView : boolean;
  @Input() isEdit : boolean;

  ngOnInit(): void {
  }

  save(){
    if (AppUtilityService.isNullValidateForm("modalImportHistory")) {
        AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
        return;
    }
    this.loading = true ;
      this._customerManagementService.EditImportHistory(this.dataItem).subscribe(
        ()=>{
          this.loading = false;
          AppMessageService.success("Cập nhật thông tin nhập hàng " +this.dataItem.importCouponCode+" thành công thành công!","");
          this.close(true);
        }
      );
    }
}
