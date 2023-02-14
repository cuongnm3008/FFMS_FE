import { WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { OrderDetailDto } from './../../../../../../shared/service-proxies/warehouse-management-service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { BookingService, BookingDto } from 'src/app/shared/service-proxies/booking-service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';

@Component({
  selector: 'app-order-detail-view',
  templateUrl: './order-detail-view.component.html',
  styleUrls: ['./order-detail-view.component.css']
})
export class OrderDetailViewComponent extends AppModalComponentBase implements OnInit {

  constructor(
   injector: Injector,
    private readonly _modalService: NzModalService,
    private _warehouseManagementService : WarehouseManagementService,
    private _bookingService: BookingService,
    )
    {
       super(injector);
    }

  @Input() dataItem = new  OrderDetailDto();
  @Input() typeView : string ;
  lstItem: any[];
  lstBooking: any[]=[];
  bookingDto : any;
  textReason : string;

  listSlot = [
    {
      id: 1,
      name: 'Ca 1',
      time: '7h30-9h'
    },
    {
      id: 2,
      name: 'Ca 2',
      time: '9h-10h'
    },
    {
      id: 3,
      name: 'Ca 3',
      time: '14h30-16h'
    },
    {
      id: 4,
      name: 'Ca 4',
      time: '16h-17h30'
    },
    {
      id: 5,
      name: 'Ca 5',
      time: '17h30-19h'
    },
    {
      id: 6,
      name: 'Ca 6',
      time: '19h-20h30'
    },
    {
      id: 7,
      name: 'Ca 7',
      time: '20h30-22h'
    }
  ]
  ngOnInit(): void {
    this._warehouseManagementService.getOrderDetailById(this.dataItem.id).subscribe(
       (result)=> {
          if(result){
            this.lstItem = result.content;
            this.fetchDataBooking(this.dataItem.eventSchedulerBookingId);
          }
         }
    );
  }

  fetchDataBooking(bookingId? :number){
    if(bookingId > 0){
    this._bookingService.getBookingById(bookingId).subscribe(
      result=>{
        if (result) {
          this.bookingDto = result;
        }
      }
    );
    }
  }


}
