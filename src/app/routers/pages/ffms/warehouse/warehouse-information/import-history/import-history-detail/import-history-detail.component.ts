import { ImportProductDto } from './../../../../../../../shared/service-proxies/warehouse-management-service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';

@Component({
  selector: 'app-import-history-detail',
  templateUrl: './import-history-detail.component.html',
  styleUrls: ['./import-history-detail.component.css']
})
export class ImportHistoryDetailComponent extends AppModalComponentBase  implements OnInit {

   constructor(
   injector: Injector,
    private readonly _modalService: NzModalService,
    private  _systemManagementService : SystemManagementService,
    private _warehouseManagementService : WarehouseManagementService
    )
    {
       super(injector);
    }
 @Input() dataItem = new  ImportProductDto();
 lstItem : any[];

  ngOnInit(): void {
    this._warehouseManagementService.getProductByHistoryImport(
      this.dataItem.importCouponCode,
      this.dataItem.pageIndex =0,
      this.dataItem.pageSize =100,
      this.dataItem.sort,
      this.dataItem.sortBy,
      this.dataItem.textSearch
      ).subscribe(
       (result)=> {
           this.lstItem = result['content'];
          //  this.dataItem.foundationId = Number(this.listFoundation[0]['id']);
          // console.log(this.listFoundation[0]['id']);
         }
    );
  }

}
