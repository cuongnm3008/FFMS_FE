import { OrderDetailDto, OrderTabDto } from 'src/app/shared/service-proxies/warehouse-management-service';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JWTAuthService } from "../services/auth/jwtauth.service";
import { BaseService } from "../services/base.service";
import { CustomerDto, FootballFielDto } from "./system-management-service";
import { isNullOrUndefinedOrEmpty } from '../utils/DataUtils';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  constructor(
    private baseService: BaseService,
    private jwtAuthService: JWTAuthService
  ) {

  }

  createOrEditBooking(_bookingDto?: BookingDto): Observable<any> {

    let eventSchedulerDTO ={
      customer : _bookingDto.customer,
      datePicker : _bookingDto.datePicker,
      description : _bookingDto.description,
      footballFieldId : _bookingDto.footballFielDto.id,
      price : _bookingDto.footballFielDto.price,
      deposit : _bookingDto.deposit,
      slot : _bookingDto.slotDto.id,
      status : _bookingDto.status
    }

    let data = JSON.stringify(eventSchedulerDTO);
    let params = {
    };

    return this.baseService.post(_bookingDto?.id > 0 ? ("api/v1/event/book/" + _bookingDto?.id) : "api/v1/event", data, params, this.jwtAuthService.getJwtToken());
  }

  cancelBooking(_bookingDto: BookingDto): Observable<any> {
    let params = {
    };
    let data = {
      reason: _bookingDto.reasonCancel,
      returnPrice: _bookingDto.returnPrice
    };
    return this.baseService.post("api/v1/event/cancel/"+_bookingDto.id, data, params, this.jwtAuthService.getJwtToken());
  }


  getListBookingByDate(_datePicker : Date): Observable<any[]> {
    let params  = {
      datePicker : _datePicker
    }

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/event", params, headers);
  }

  getListBookingByRangeDate(_fromDatePicker : Date, _toDatePicker : Date): Observable<any[]> {
    let params  = {
      fromDatePicker : _fromDatePicker,
      toDatePicker : _toDatePicker
    }

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/event", params, headers);
  }

  getDaysofWeek(_fromDatePicker : Date, _toDatePicker : Date, _lstFootballFields,_lstSlot,_lstType): Observable<any[]> {
    let params  = {
      fromDatePicker : _fromDatePicker,
      toDatePicker : _toDatePicker,
      lstFootballFields : _lstFootballFields,
      lstSlot : _lstSlot,
      lstType : _lstType
    }

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/event/dayOfWeek", params, headers);
  }


  getBookingById(bookingId : number): Observable<any[]> {
    let params  = {
    }
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/event/book/" + bookingId, params, headers);
  }

  approveOrder(_dataItem : SubmitOrderProductChangeDto){

    let params = {
    };
    let lstSuggestProducts = _dataItem;
    let data = JSON.stringify(lstSuggestProducts);
    return this.baseService.post("api/v1/pos/approve/accept", data, params, this.jwtAuthService.getJwtToken());

  }

  rejectOrder(_orderId:number,_reason : string){
    let params = {
      reason :  _reason
    };
    let data = null;
    return this.baseService.post("api/v1/pos/approve/reject/"+_orderId, data, params, this.jwtAuthService.getJwtToken());
  }

   getAllSlotOfMonth(_year:number): Observable<any>{
    let params = {
      year: _year?_year:""
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

      return this.baseService.get("api/v1/dashbroad/getSlotStatistics", params, headers);
  }

   getlstHistoryBooking(
    _customerName: string,
    _fromDatePicker: Date,
    _toDatePicker:Date,
    _fromCancelDate:Date,
    _toCancelDate:Date,
    // _footballFieldId?: number | null,
     _slot?: number | null,
     _status?:string,
     _page?: number,
      _size?: number,
      _sort?: string | null,
      _sortBy?: string | null,
     _textSearch?: string | null): Observable<[any]> {
      let params: BookingHistoryInputDto = {
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch ? _textSearch : "",
      customerName: _customerName ? _customerName:"",
      status:_status ? _status: "",
    }

    // if (!isNullOrUndefinedOrEmpty(_footballFieldId)) {
    //   params.footballFieldId = _footballFieldId;
    // }
 if (!isNullOrUndefinedOrEmpty(_slot)) {
      params.slot = _slot;
    }
    // if (!isNullOrUndefinedOrEmpty(_foundationId)) {
    //   params.foundationFieldId = _foundationId;
    // }

    if (!isNullOrUndefinedOrEmpty(_fromDatePicker)) {
      params.fromDatePicker = _fromDatePicker;
    }
    if (!isNullOrUndefinedOrEmpty(_toDatePicker)) {
      params.toDatePicker = _toDatePicker;
    }
    if (!isNullOrUndefinedOrEmpty(_fromCancelDate)) {
      params.fromCancelDate = _fromCancelDate;
    }
    if (!isNullOrUndefinedOrEmpty(_toCancelDate)) {
      params.toCancelDate = _toCancelDate;
    }

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/event/history", params, headers);
  }


}
export class BookingDto {
  id?: number;
  datePicker?: Date;
  slotDto?: SlotDto;
  customer?:CustomerDto;
  description?: string;
  footballFielDto?: FootballFielDto;
  status?: string;
  deposit?:number;
  reasonCancel?: string;
  returnPrice?: number;
}
export class BookingCustomerDto {
  id?: number;
  datePicker?: Date;
  slot?: string;
  // customer?:CustomerDto;
  description?: string;
  footballFielDto?: FootballFielDto;
  status?: string;
  deposit?:number;
  paymentStatus?:boolean = true;
  price?:number;
}
export class BookingHistoryInputDto {
  id?: number;
  fromDatePicker?: Date;
  toDatePicker?:Date;
  slotDto?: SlotDto;
  customer?:CustomerDto;
  customerName?:string;
  description?: string;
  footballFielDto?: FootballFielDto;
  footballField?: FootballFielDto;
  footballName?:string;
  status?: string;
  deposit?:number;
  returnPrice?:number;
  cancelDate?:number;
  paymentStatus?:boolean = true;
  footballFieldId?:number;
  slot?:number;
  datePicker?:Date;
  fromCancelDate?:Date;
  toCancelDate?:Date;

   page?: number ;
  size?: number ;
  sort?: string ;
  sortBy?: string ;
  fromDate?: Date ;
  textSearch?: string ;
  total?: number;
}
export class SlotDto {
  id: number;
  name: string;
  time: string;
  value?:Date;
}

export enum HISTORY_BOOKING_STATUS {
  DA_HUY_SAN = "0",
  DA_COC_SAN = "1",
  DA_THANH_TOAN = "2",
}
export class DailyCalendarDto {
  bookingDate?: Date;
  listBooking?: BookingDto[];
}

export class DayDto {
  pickerDate?: Date;
  listBooking?: BookingDto[];
  amountDeposit? : number =0;
  amountPaid? : number =0;
  amountEmpty? : number=0;
}


export class OrderProductDto {
  id?: number;
  listProductWarehouse : OrderProductWarehouse[];
  pwChange  = new OrderProductWarehouse();
  productName?:string;
  productCode?: string;
  lstProductImportHistories?: ProductImportHistoryDto[];
  amount?: number;
  messageAmount? : string;
}


export class OrderProductWarehouse {
  id?: number;
  productCode?: string;
  name?:string;
  importCouponCode?:string;
  productId?:number;
  supplierId?:number;
  status?: string;
  amount?: number;
  price?: number;
}

export class ProductImportHistoryDto{
  id?:number;
  importCouponCode?: string;
  productCode?: string;
  amount?: number;
}

export class SubmitOrderProductChangeDto{
  lstSuggestProducts = new Array<any>();
  orderId : string;
  type: string;
}

// export class SuggestProductDto{
//   lstIdSuggestProducts =  new Array<number>();
//   lstProductWarehoue =  new Array<any>();
// }


export enum BOOKING_ENUM {
  HUY = '0',
  COC = '1',
  SAN = '2',
}

export class ObjFilterWeekInput{
  startDate!: Date ;
  endDate!: Date ;
}

