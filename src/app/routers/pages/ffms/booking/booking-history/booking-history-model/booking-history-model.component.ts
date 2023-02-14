import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { BookingHistoryInputDto } from 'src/app/shared/service-proxies/booking-service';

@Component({
  selector: 'app-booking-history-model',
  templateUrl: './booking-history-model.component.html',
  styleUrls: ['./booking-history-model.component.css']
})
export class BookingHistoryModelComponent extends AppModalComponentBase implements OnInit {

  	constructor(injector: Injector) {
		super(injector);
	}
status:string;
     @Input() dataItem  = new BookingHistoryInputDto();

  ngOnInit(): void {
    if(this.dataItem.status == "0"){
      this.status = "Huỷ lịch sân"
    }
    if(this.dataItem.status == "1"){
      this.status ="Đã cọc sân"
    }else{
      this.status ="Đã thanh toán"
    }
  }

}
