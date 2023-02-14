import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { SystemManagementService } from './../../../shared/service-proxies/system-management-service';
import { OrderCountDto, OrderDetailInputDto, WarehouseManagementService } from './../../../shared/service-proxies/warehouse-management-service';
import { FoundationFieldsService } from './../../../shared/service-proxies/foundation-management-service';
import { Component, OnInit} from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { BookingService } from 'src/app/shared/service-proxies/booking-service';
import * as moment from 'moment';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  constructor(
    private _breadcrumbsService : BreadcrumbService,
    private _footballFitelService: FoundationFieldsService,
    private _warehouseService: WarehouseManagementService,
    private _systemService: SystemManagementService,
       private _bookingService: BookingService,

  ) {
    this._breadcrumbsService.setBreadcrumb(["Trang chủ"]);
      this._breadcrumbsService.setNameButton("");
        this._breadcrumbsService.setNewButton("");
  }
  componentName ="BaseComponent";
  listFootballField:any;
  date : Date = new Date();
  tomorrow  : Date = new Date(this.date.getTime() + (24 * 60 * 60 * 1000));
  countSlotCoc:number = 0;
  countSlotThanhToan:number =0;
  test : any;
  objFilter = new OrderCountDto();
  listOrderDetail: any;
  totalOrder:number;
  totalProduct:number = 0;

  totalImport:number = 0;
  ngOnInit(): void {
    this.DataSlotByDate();
    this.DataOrderByDate();
    this.DataImportByMonth();
  }
  setFromDate(_date : Date) {
    var d = new Date(_date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  setToDate(_date: Date){
    _date.setHours(23, 59, 59, 0);;
    return _date;
  }
DataSlotByDate(){
 //Thống kê lịch đặt sân
    this._bookingService.getListBookingByDate(this.setFromDate(new Date())).subscribe(
      (result)=>{
         this.listFootballField = result;
         result.forEach(element => {
          element?.schedule?.content?.forEach(item => {
            if(item.status == '1'){
              this.countSlotCoc ++;
            }else{
              this.countSlotThanhToan ++;
            }
          });
         });


        }
    );
}


DataOrderByDate(){
    this.objFilter.fromDate = this.date;
    this.objFilter.toDate = this.date;
 this._warehouseService.getListOrderDetails(
      this.objFilter.customerName,
      this.objFilter.status = "2",
      this.objFilter.orderCode ,
      this.setFromDate(new Date()),
      this.setToDate(new Date()),
      this.objFilter.employeeName,
      this.objFilter.page = 0,
      this.objFilter.size = 1000,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        this.listOrderDetail = result['content'];

        result['content'].forEach(element => {
          element['saleOrderDetails'].forEach(item => {
            if(item.productId){
              this.totalProduct ++ ;
            }
          });
          this.totalOrder = result['totalElements'];
        });
      }
    );
}

DataImportByMonth(){
 this._warehouseService.getAllImportOfMonth(this.date.getFullYear()).subscribe(
      (result)=> {
        this.totalImport = result.object[0].count;

      }
    );
}


}
