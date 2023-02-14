import { CustomerDto, CustomerInputDto, SystemManagementService } from './../../../../../shared/service-proxies/system-management-service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { FootballFielDto } from 'src/app/shared/service-proxies/system-management-service';
import { FootballFieldInputDto, FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { Router } from '@angular/router';
import { BookingDto, BookingService, BOOKING_ENUM } from 'src/app/shared/service-proxies/booking-service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent extends AppModalComponentBase<BookingDto> implements OnInit {
  constructor(injector: Injector,
    private _footballFieldFields: FoundationFieldsService,
    private _systemManagementService : SystemManagementService,
    private _bookingService: BookingService,
    private _router: Router,
    )
  {
    super(injector);
  }
  isCancel : boolean = false;
  isView : boolean = false;
  @Input() formView : string;
  @Input() dataItem = new  BookingDto();
  @Input() type: boolean;
  objFilter = new FootballFieldInputDto();
  objCustomerFilter = new CustomerInputDto();
  listFootballField : any[] = [];
  listCustomer : any[] ;
  listCustomerAllAtt : any[] ;
  message : string ;
  datePicker : Date ;
  listBooking : any[];
  slotMessage : string ;

  ngOnInit(): void {
    this.dataItem.customer = this.dataItem.customer ? this.dataItem.customer : new CustomerDto();
    this.dataItem.footballFielDto = this.dataItem.footballFielDto ? this.dataItem.footballFielDto : new FootballFielDto();
    this.dataItem.deposit = this.dataItem.deposit ? this.dataItem.deposit : (this.dataItem.footballFielDto.price ? (this.dataItem.footballFielDto.price / 2) : 0);
    this.dataItem.returnPrice = this.dataItem.deposit;
    let foundationId = 1 ;
    let footballFieldStatus = null;
    this.objFilter.pageIndex = 0;
    this.objFilter.pageSize = 100;
    this.objFilter.sort = "";
    this.objFilter.sortBy = "";
    this.objFilter.textSearch = "";

    this._footballFieldFields.getListFootballField(
      footballFieldStatus,
      this.objFilter.name,
      this.objFilter.pageIndex,
      this.objFilter.pageSize,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.foundationType,
      foundationId,
      this.objFilter.textSearch
    )
   .subscribe(
     (result) => {
      result['content'].filter(x=>x.status != '0').forEach(res => {
          this.listFootballField.push({
            id : res.id,
            name : res.name,
            status : res.status
          })
        })
     this.objFilter.total = result['totalElements'];
     if(this.dataItem.footballFielDto.status == '2')
        this.message = "Sân đang có sự cố, có thể không đá được"
      else
        this.message = "";
   });


   this.listCustomer = this.listCustomer || [];

   this.objCustomerFilter = new CustomerInputDto();
   this.objCustomerFilter.page = 0;
   this.objCustomerFilter.size = 100;
   this.objCustomerFilter.sort = "";
   this.objCustomerFilter.sortBy = "";
   this.objCustomerFilter.textSearch = "";
   this.objCustomerFilter.status = "1";

   this._systemManagementService.getCustomer(
    this.objCustomerFilter.foundationId,
    this.objCustomerFilter.customerCode,
    this.objCustomerFilter.page ,
    this.objCustomerFilter.size ,
    this.objCustomerFilter.address,
    this.objCustomerFilter.fullName ,
    this.objCustomerFilter.sort,
    this.objCustomerFilter.sortBy,
    this.objCustomerFilter.status,
    this.objCustomerFilter.birthDate,
    this.objCustomerFilter.textSearch
    )
  .subscribe(
    (result)=> {
      this.listCustomerAllAtt =  result['content'];
      result['content'].forEach(res => {
        this.listCustomer.push({
          id : res.id,
          name : res.fullName +" - "+ res.phone
        })
      })
    }
  );

   if(this.dataItem.customer.id > 0){
    this.isView = true;
    if(this.dataItem.status == '1') {
      this.formView = 'deposit'
    }
    if(this.dataItem.status == '2') {
      this.formView = 'paid'
    }
   }else{
    this.formView = 'formAdd'
   }

 }



  listSlot = [
    {
      id: 1,
      name: 'Ca 1 - 7h30-9h',
      time: '7h30-9h'
    },
    {
      id: 2,
      name: 'Ca 2 - 9h-10h',
      time: '9h-10h'
    },
    {
      id: 3,
      name: 'Ca 3 - 14h30-16h',
      time: '14h30-16h'
    },
    {
      id: 4,
      name: 'Ca 4 - 16h-17h30',
      time: '16h-17h30'
    },
    {
      id: 5,
      name: 'Ca 5 - 17h30-19h',
      time: '17h30-19h'
    },
    {
      id: 6,
      name: 'Ca 6 - 19h-20h30',
      time: '19h-20h30'
    },
    {
      id: 7,
      name: 'Ca 7 - 20h30-22h',
      time: '20h30-22h'
    }
  ]

  save(){
    if (AppUtilityService.isNullValidateForm("modalBooking")) {
      AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
      return;
   }
   this._bookingService.createOrEditBooking(this.dataItem);
   this.dataItem.datePicker = this.datePicker;

  //  if(this.dataItem.status == '3'){
  //   this.dataItem.status = '1';
  //  }

   if (this.dataItem.status == undefined) {
    this.dataItem.status = '1';
   }

  // if (this.radioValue) {
  //   this.dataItem.status = '1';
  // } else {
  //   this.dataItem.status = '3';
  // }


    this._bookingService.createOrEditBooking(this.dataItem).subscribe(
     ()=>{
       AppMessageService.success( this.formView == 'formAdd' ? "Thêm lịch thành công" : "Cập nhật thành công!","");
       this.close(this.dataItem);
     }
   );
  }

  payment(){
    const _url = `/sale/${encodeURIComponent(this.dataItem.id)}/payment_slot`;
    // window.open(_url, "_blank");
    this._router.navigate([`/sale/${encodeURIComponent(this.dataItem.id)}/payment_slot`]);
    this.close();
  }

  payNow(){
    AppMessageService.confirm("","Thanh toán ca đá",
    ()=>{
      this.dataItem.status = '2';

      this._bookingService.createOrEditBooking(this.dataItem).subscribe(
        ()=>{
          AppMessageService.success("Xử lý thành công!","");
          this.close(this.dataItem);
        }
      );
    });
  }

  customerChange(customerId :number ){
    this.dataItem.customer = this.listCustomerAllAtt.find(x=>x.id == customerId);
  }

  edit(){
    this.formView = 'formEdit';
    this.isView = false;
  }

  cancel(){
    if (AppUtilityService.isNullValidateForm("modalBooking")) {
      AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
      return;
   }
    this.formView = 'formCancel';
    AppMessageService.confirm("","Bạn muốn hủy lịch đặt",
    ()=>{
      this._bookingService.cancelBooking(this.dataItem).subscribe(
        ()=>{
          AppMessageService.success("Hủy lịch thành công!","");
          this.close(new BookingDto());
        }
      );
    }
    );
  }

  footballFieldChange(footballFieldId : number){
    if (footballFieldId) {
      this._footballFieldFields.getFootballById(footballFieldId).subscribe(
        result =>{
          this.dataItem.footballFielDto.price = result.price;
        }
      );
    }
  }

  slotChange(slotId : number){
    this._bookingService.getListBookingByDate(this.datePicker).subscribe(
      (listBooking)=>{
        let listSchedule = listBooking.find(x=>x.footballFieldId == this.dataItem.footballFielDto.id)?.schedule;
        let bookingObj = listSchedule.find(x=>x.slot == slotId);

        if (bookingObj?.status == '1') {
          this.slotMessage = "Ca đá đã được đặt cọc";
        }
        else if(bookingObj?.status == '2') {
          this.slotMessage = "Ca đá đã được thanh toán";
        }
        else{
          this.slotMessage = "";
        }
      }
    );
  }

  radioChange(_dataItem : boolean){

  }

}
