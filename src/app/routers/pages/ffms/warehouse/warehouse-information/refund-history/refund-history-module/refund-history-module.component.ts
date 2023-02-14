import { ReturnProductDto } from 'src/app/shared/service-proxies/warehouse-management-service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';

@Component({
  selector: 'app-refund-history-module',
  templateUrl: './refund-history-module.component.html',
  styleUrls: ['./refund-history-module.component.css']
})
export class RefundHistoryModuleComponent extends  AppModalComponentBase implements OnInit {

  constructor(
    injector: Injector,
  ) {
   super(injector);
  }

   @Input() dataItem  = new ReturnProductDto();
  status:string;
    ngOnInit(): void {
      if(this.dataItem.status == "3"){
        this.status = "Đổi trả thành công";
      }else{
        this.status = "Đổi trả thất bại";
      }
  }

}
