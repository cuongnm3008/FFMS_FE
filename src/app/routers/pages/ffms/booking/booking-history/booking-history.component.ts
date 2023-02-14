import { BookingService, BookingDto, BookingHistoryInputDto, HISTORY_BOOKING_STATUS } from 'src/app/shared/service-proxies/booking-service';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { Component, Injector, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { FootballFieldInputDto, FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { FootballFielDto, SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { BookingHistoryModelComponent } from './booking-history-model/booking-history-model.component';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent extends AppComponentBase implements OnInit {

   constructor(
   injector: Injector,
    private readonly _modalService: NzModalService,
    private  _systemManagementService : SystemManagementService,
    private _breadcrumbsService : BreadcrumbService,
    private _footballFieldService: FoundationFieldsService,
    private _bookingService: BookingService
    )
    {
       super(injector);
    }

    objFilter =  new BookingHistoryInputDto();
        objFilterCount =  new BookingHistoryInputDto();
      objFilterCbx = new FootballFieldInputDto();

    lstHistoryBooking: any = [];
    listFootballField: FootballFielDto[] = [];
    lstFootball: any [] = [];

    currentTab : number ;
    lstStatus : any[] = [{
    id : "0",
    name : "Huỷ lịch sân"
  },{
    id : "1",
    name : "Đã cọc sân"
  }
  ,{
    id : "2",
    name : "Đã Thanh toán"
  }
    ];


     lstSlot = [
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


  HISTORY_BOOKING_STATUS = HISTORY_BOOKING_STATUS;
  countDaCoc: number;
  countDaThanhToan:number;
  countDaHuy:number;

  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý đặt sân","Lịch sử đặt sân"]);
    this._breadcrumbsService.setNameButton("");
    this._breadcrumbsService.setNewButton("Đặt lịch");


      this.objFilter.page = 0;
     this.objFilter.size = 10;
     this.objFilter.status = "1";
     this.getIntData();
     this.fetchData();
  }

    initFilter(): void {
     this.objFilter = new BookingHistoryInputDto();
     this.objFilter.page = 0;
     this.objFilter.size = 10;
     this.objFilter.sort = "";
     this.objFilter.sortBy = "";
     this.objFilter.textSearch = "";
     this.objFilter.status = "1";
     this.fetchData();
  }



  getIntData(){
    this._footballFieldService
     .getListFootballField(
        this.objFilterCbx.status,
        this.objFilterCbx.name,
        this.objFilterCbx.pageIndex = 0,
        this.objFilterCbx.pageSize = 100,
        this.objFilterCbx.sort,
        this.objFilterCbx.sortBy,
        this.objFilterCbx.foundationType,
        this.objFilterCbx.foundationId = 1,
        this.objFilterCbx.textSearch
      )
      .subscribe((result) => {
        this.listFootballField = result['content'];
        this.listFootballField = this.listFootballField.filter((s) => s.status != '0');
        if(this.listFootballField){
          this.listFootballField.forEach(element => {
            this.lstFootball.push({
              id:element.id,
              name:element.name
            })
          });
        }
      }
      );
}

  connt(){
    this._bookingService.getlstHistoryBooking(
      this.objFilter.customerName,
      this.objFilter.fromDatePicker,
      this.objFilter.toDatePicker,
      this.objFilter.fromCancelDate,
      this.objFilter.toCancelDate,
      // this.objFilter.footballFieldId,
      this.objFilter.slot ,
      this.objFilterCount.status = "1",
      this.objFilterCount.page = 0,
      this.objFilterCount.size =200,
      this.objFilter.sort ,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        this.countDaCoc = result['totalElements'];
        this.loading = false;
      }
    );

     this._bookingService.getlstHistoryBooking(
         this.objFilter.customerName,
      this.objFilter.fromDatePicker,
      this.objFilter.toDatePicker,
      this.objFilter.fromCancelDate,
      this.objFilter.toCancelDate,
      // this.objFilter.footballFieldId,
      this.objFilter.slot ,
      this.objFilterCount.status = "2",
      this.objFilterCount.page = 0,
      this.objFilterCount.size =200,
      this.objFilter.sort ,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        this.countDaThanhToan = result['totalElements'];
        this.loading = false;
      }
    );

    this._bookingService.getlstHistoryBooking(
         this.objFilter.customerName,
      this.objFilter.fromDatePicker,
      this.objFilter.toDatePicker,
      this.objFilter.fromCancelDate,
      this.objFilter.toCancelDate,
      // this.objFilter.footballFieldId,
      this.objFilter.slot ,
      this.objFilterCount.status = "0",
      this.objFilterCount.page = 0,
      this.objFilterCount.size =200,
      this.objFilter.sort ,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        this.countDaHuy = result['totalElements'];
        this.loading = false;
      }
    );
  }

   fetchData() {
          this.connt();
   this.loading = true;

    this._bookingService.getlstHistoryBooking(
      this.objFilter.customerName,
      this.objFilter.fromDatePicker,
      this.objFilter.toDatePicker,
      this.objFilter.fromCancelDate,
      this.objFilter.toCancelDate,
      // this.objFilter.footballFieldId,
      this.objFilter.slot ,
      this.objFilter.status,
      this.objFilter.page ,
      this.objFilter.size ,
      this.objFilter.sort ,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
         result['content'].forEach(element => {
            element.pageSize = this.objFilter.size;
            element.pageIndex = this.objFilter.page;
        });
        this.lstHistoryBooking = result['content'];
        this.objFilter.total = result['totalElements'];
        this.loading = false;
      }
    );

            //  this.loading = false;

   }

    view(_dataItem?: BookingHistoryInputDto, _isView? : boolean) {
    const _modal = this._modalService.create({
      nzTitle: "Thông tin lịch sử đặt sân",
      nzContent: BookingHistoryModelComponent,
      nzWidth: window.innerWidth > 800 ? 600 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new BookingHistoryInputDto(),
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }

    onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.page = _params.pageIndex;
    this.objFilter.size = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
      this.objFilter.sort = objSort[0]?.key == "datePicker" ? "date_picker" : objSort[0]?.key;
      this.objFilter.sort = objSort[0]?.key == "cancelDate" ? "cancel_date" : objSort[0]?.key;
      this.objFilter.sortBy = objSort[0]?.value == "ascend"? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }
    this.objFilter.sort = isNullOrUndefinedOrEmpty(this.objFilter.sort) ?   "" : this.objFilter.sort;
    this.objFilter.sortBy = isNullOrUndefinedOrEmpty(this.objFilter.sortBy) ?   "" : this.objFilter.sortBy;
    this.objFilter.textSearch = isNullOrUndefinedOrEmpty(this.objFilter.textSearch) ?   "" : this.objFilter.textSearch;

    if(_params.pageIndex > 0){
      this.objFilter.page =  this.objFilter.page -1;
    }
    this.fetchData();
  }

  tabChangeHandle(){
    // debugger;
    if(this.currentTab == 0){
      this.objFilter.status = HISTORY_BOOKING_STATUS.DA_COC_SAN;
      this.objFilter.page =0;

      // this.footballFieldStatus ="2";
    }
    if(this.currentTab == 1){
      this.objFilter.status = HISTORY_BOOKING_STATUS.DA_THANH_TOAN;
            this.objFilter.page =0;

      // this.footballFieldStatus ="1";
    }
    if(this.currentTab == 2){
      this.objFilter.status = HISTORY_BOOKING_STATUS.DA_HUY_SAN;
            this.objFilter.page =0;

      // this.footballFieldStatus ="0";
    }
    // debugger;
    this.fetchData();
  }

  timer;
  searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }
}
