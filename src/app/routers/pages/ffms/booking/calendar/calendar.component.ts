import { DayDto } from './../../../../../shared/service-proxies/booking-service';
import { BookingModalComponent } from './../booking-modal/booking-modal.component';
import { Component, Injector, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { FootballFieldInputDto, FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { FootballFielDto } from 'src/app/shared/service-proxies/system-management-service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { BookingDto, BookingService, ObjFilterWeekInput, SlotDto } from 'src/app/shared/service-proxies/booking-service';
import { DatePipe } from '@angular/common';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
// import { BookingService } from 'src/app/shared/service-proxies/booking-service';
import * as cloneDeep from 'lodash/cloneDeep';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private readonly _modalService: NzModalService,
    private _footballFieldFields: FoundationFieldsService,
    private _breadcrumbsService : BreadcrumbService,
    private _bookingService: BookingService,
  ) {
    super(injector);
  }

  objFilter = new FootballFieldInputDto();
  listFootballField : FootballFielDto[] = [];
  listFootballFieldClone : FootballFielDto[] = [];

  dailyCalendar: any[][] = [
  ];

  week : any;
  listDayOfWeek : any[];
  fromDate : Date ;
  toDate : Date;
  datePicker: Date;
  currentTab : number ;
  objFilterWeekInput = new ObjFilterWeekInput();
  datePipe : DatePipe;
  daysCalender : any[][] = [
  ]
  dateFromToArr = Array<Date>();

  listFootballSelected : any[];
  listSlotSelected : any[];
  bookingCategorySelected = Array<any>();
  footballCategorySelected = Array<any>();
  footballSelects = Array<any>();

  isbookingDeposit : boolean ;
  isbookingPaid : boolean ;
  isbookingEmpty : boolean ;


  ngOnInit(): void {
    this.dailyCalendar = [];
    this._breadcrumbsService.setBreadcrumb(["Quản lý đặt sân","Quản lý lịch sân"]);
    // this._breadcrumbsService.setNameButton("lịch");
    this._breadcrumbsService.setNameButton("");

    this.listDayOfWeek =  this.dates(new Date());
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
      this.objFilter.pageSize = 100,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.foundationType,
      foundationId,
      this.objFilter.textSearch
    )
    .subscribe(
      (result) => {
        this.listFootballField = result['content'];
        this.listFootballField = this.listFootballField.filter(x=> x.status != '0' );
        this.listFootballFieldClone = this.listFootballField.filter(x=> x.status != '0' );
        this.listFootballField.forEach(item=> {this.footballSelects.push({
            id : item.id,
            name : item.name,
            type : item.type
        });});
        for (let i = 0; i < this.listSlot.length; i++) {
          this.dailyCalendar.push([]);
          for (let j = 0; j < this.listFootballField.length; j++) {
              let obj = new BookingDto();
              obj.slotDto = this.listSlot[i];
              obj.footballFielDto = this.listFootballField[j];
              this.dailyCalendar[i][j] = obj;
          }
        }
        this.datePicker = new Date();
        this.initParam();
    });
  }

  initParam(){
    this.week = new Date();
    this.listDayOfWeek =  this.dates(new Date());
    this.bookingCategorySelected = [1,2];

    this.footballCategorySelected = [];
    this.listFoodballCategory.forEach(
      item=>{
        this.footballCategorySelected.push(+item.id);
    });

    this.listFootballSelected=[];
    this.listFootballFieldClone.forEach(
      item=>{
        if(this.footballCategorySelected.includes(+item.type)){
          this.listFootballSelected.push(+item.id);
        }
    });

    this.listFootballField = this.listFootballFieldClone.filter(x=> this.listFootballSelected.includes(x.id));
    this.listFootballField.sort((a, b) => (+a.type) - (+b.type));

    this.listSlotSelected = [];
    this.listSlotClone.forEach(
      item=>{
        this.listSlotSelected.push(+item.id);
    });


    this.dateFromToArr = new Array<Date>();
    this.dateFromToArr.push(this.fromDate);
    this.dateFromToArr.push(this.toDate);

    this.fetchDaysofWeek(this.fromDate,this.toDate);
    this.setCollapseActive();
  }

  setTimeSlot(house : number, minute : number){
    let date = new Date();
    date = this.withoutTime(new Date());
    date.setHours(house);
    date.setMinutes(minute);
    return date;
  }

 getWeekOfMonth(date : Date) {
  const startWeekDayIndex = 1; // 1 MonthDay 0 Sundays
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = firstDate.getDay();

  let weekNumber = Math.ceil((date.getDate() + firstDay) / 7);
  if (startWeekDayIndex === 1) {
    if (date.getDay() === 0 && date.getDate() > 1) {
      weekNumber -= 1;
    }

    if (firstDate.getDate() === 1 && firstDay === 0 && date.getDate() > 1) {
      weekNumber += 1;
    }
  }
  return weekNumber;
}

 dates(current) {
  var week= new Array();
  // Starting Monday not Sunday
  current.setDate((current.getDate() - current.getDay() +1));
  for (var i = 0; i < 7; i++) {
      week.push(
          new Date(current)
      );
      current.setDate(current.getDate() +1);
  }
  this.fromDate = week[0];
  this.toDate = week[6];
  return week;
}

listSlot = [
  {
    id: 1,
    name: '1',
    time: '7h30-9h',
    value : this.setTimeSlot(9,0)
  },
  {
    id: 2,
    name: '2',
    time: '9h-10h30',
    value : this.setTimeSlot(10,30)
  },
  {
    id: 3,
    name: '3',
    time: '14h30-16h',
    value : this.setTimeSlot(16,0)
  },
  {
    id: 4,
    name: '4',
    time: '16h-17h30',
    value : this.setTimeSlot(17,30)
  },
  {
    id: 5,
    name: '5',
    time: '17h30-19h',
    value : this.setTimeSlot(19,0)
  },
  {
    id: 6,
    name: '6',
    time: '19h-20h30',
    value : this.setTimeSlot(20,30)
  },
  {
    id: 7,
    name: '7',
    time: '20h30-22h',
    value : this.setTimeSlot(22,0)
  }
]


  listSlotClone = [
    {
      id: 1,
      name: '1',
      time: '7h30-9h',
      value : this.setTimeSlot(9,0)
    },
    {
      id: 2,
      name: '2',
      time: '9h-10h30',
      value : this.setTimeSlot(10,30)
    },
    {
      id: 3,
      name: '3',
      time: '14h30-16h',
      value : this.setTimeSlot(16,0)
    },
    {
      id: 4,
      name: '4',
      time: '16h-17h30',
      value : this.setTimeSlot(17,30)
    },
    {
      id: 5,
      name: '5',
      time: '17h30-19h',
      value : this.setTimeSlot(19,0)
    },
    {
      id: 6,
      name: '6',
      time: '19h-20h30',
      value : this.setTimeSlot(20,30)
    },
    {
      id: 7,
      name: '7',
      time: '20h30-22h',
      value : this.setTimeSlot(22,0)
    }
  ]

  bookingCategory = [
    {
      id : 1,
      name : "Đã cọc"
    },
    {
      id : 2,
      name : "Đã thanh toán"
    },
    {
      id : 3,
      name : "Lịch trống"
    },
  ]


  listFoodballCategory = [
    {
      id : 1,
      name : "Sân 5"
    },
    {
      id : 2,
      name : "Sân 7"
    },
    {
      id : 3,
      name : "Sân 11"
    },
  ]


  listSlotSlectBox = [
    {
      id: 1,
      name: 'Ca 1 (7h30-9h)',
    },
    {
      id: 2,
      name: 'Ca 2 (9h-10h30)',
    },
    {
      id: 3,
      name: 'Ca 3 (14h30-16h)',
    },
    {
      id: 4,
      name: 'Ca 4 (16h-17h30)',
    },
    {
      id: 5,
      name: 'Ca 5 (17h30-19h)',
    },
    {
      id: 6,
      name: 'Ca 6 (19h-20h30)',
    },
    {
      id: 7,
      name: 'Ca 7 (20h30-22h)',
    }
  ]

  setCollapseActive(){
    this.isbookingDeposit = false ;
    this.isbookingPaid = false ;
    this.isbookingEmpty = false ;
      this.bookingCategorySelected.forEach(
        item=>{
          if (item == 1) {
            this.isbookingDeposit = true;
          }
          if (item == 2) {
            this.isbookingPaid = true;
          }
          if (item == 3) {
            this.isbookingEmpty = true;
          }
        }
      );

  }


  fetchDaysofWeek(fromDate : Date,toDate : Date){
    this.daysCalender = [];
    for (let i = 0; i < this.listDayOfWeek.length; i++) {
      this.daysCalender.push([]);
      for (let j = 0; j < this.listFootballField.length; j++) {
        let obj = new DayDto();
        this.daysCalender[i][j] = obj;
      }
    }
    this._bookingService.getDaysofWeek(fromDate,toDate,this.listFootballSelected,this.listSlotSelected,this.bookingCategorySelected).subscribe(
      (result)=>{
        this.setCollapseActive();
        for (let i = 0; i < this.listDayOfWeek.length; i++) {
          for (let j = 0; j < this.listFootballField.length; j++) {
            let obj = new DayDto();
            obj.pickerDate = this.withoutTime(this.listDayOfWeek[i]);
            let schedule = result.filter(x=>(this.withoutTime(new Date(x.datePicker)).getTime() === obj.pickerDate.getTime()) && (x.footballFieldId == this.listFootballField[j].id))[0]?.schedule;
            let content = schedule?.content;
            obj.amountDeposit = schedule?.amountDeposit;
            obj.amountPaid = schedule?.amountPaid;
            obj.amountEmpty = schedule?.amountEmpty;
            if (content) {
              obj.listBooking = obj.listBooking || [];
              content.forEach(
                booking=>{
                  let bookingObj = new BookingDto();
                  bookingObj.id = booking.id;
                  bookingObj.customer = booking.customer;
                  bookingObj.footballFielDto = booking['footballField'];
                  bookingObj.datePicker =  obj.pickerDate;
                  bookingObj.status = booking.status;
                  bookingObj.deposit = booking.deposit;
                  bookingObj.slotDto = this.getSlotByID(booking.slot);
                  obj.listBooking.push(bookingObj);
                }
              );
            }
            this.daysCalender[i][j] = obj;
          }
        }
      }
    );
  }


  addOrEditModal(_slot? : SlotDto, _footballFielDto? : FootballFielDto) {
    let _bookingDto =  new BookingDto();
    _bookingDto.slotDto = new SlotDto();
    _bookingDto.footballFielDto = new FootballFielDto();
    const _modal = this._modalService.create({
      nzTitle:  "Thêm lịch mới",
      nzContent: BookingModalComponent,
      nzWidth: window.innerWidth > 1000 ? 700 : '90%',
      nzComponentParams: {
      dataItem : cloneDeep(_bookingDto),
      datePicker : new Date(),
      },
    });
    _modal.afterClose.subscribe(result => {
       if (result) {
        this.fetchDaysofWeek(new Date(),new Date());
       }
    });
  }

  addOrEmptySlot(_slot? : SlotDto, _footballFielDto? : FootballFielDto,_datePicker?:Date) {
    _datePicker = this.withoutTime(_datePicker);
    _datePicker.setHours(_slot.value.getHours(),_slot.value.getMinutes());
    let currentDate = new Date();
    if((_datePicker.getTime() < currentDate.getTime())){
      AppMessageService.warning("","Thời gian hiện tại đã quá thời gian đặt lịch");
      return;
    }

    let _bookingDto =  new BookingDto();
    _bookingDto.slotDto = _slot ? _slot : new SlotDto();
    _bookingDto.footballFielDto =_footballFielDto ? _footballFielDto : new FootballFielDto();
    _bookingDto.datePicker = _datePicker;

    const _modal = this._modalService.create({
      nzTitle:"Thêm lịch mới",
      nzContent: BookingModalComponent,
      nzWidth: window.innerWidth > 1000 ? 700 : '90%',
      nzComponentParams: {
      dataItem :cloneDeep(_bookingDto),
      datePicker : _datePicker,
      },
    });
    _modal.afterClose.subscribe(result => {
       if (result) {
        this.fetchDaysofWeek(this.dateFromToArr[0],this.dateFromToArr[1]);
       }
    });
  }

  addOrEditDayOfWeekModal(_bookingDto? : BookingDto,_footballFielDto? : FootballFielDto,_datePicker?: Date,_type?) {
    _datePicker = this.withoutTime(_datePicker);
    _datePicker.setHours(_bookingDto?.slotDto?.value.getHours(),_bookingDto?.slotDto?.value?.getMinutes());
    let currentDate = new Date();

    if((_datePicker.getTime() < currentDate.getTime())&&_bookingDto.status=='3'){
      AppMessageService.warning("","Thời gian hiện tại đã quá thời gian đặt lịch");
      return;
    }
    _bookingDto = _bookingDto? _bookingDto : new BookingDto();
    _bookingDto.footballFielDto = _footballFielDto;
    _bookingDto.datePicker = _datePicker;
    const _modal = this._modalService.create({
      nzTitle:  _bookingDto?.customer? "Thông tin lịch": "Thêm lịch mới",
      nzContent: BookingModalComponent,
      nzWidth: window.innerWidth > 1000 ? 700 : '90%',
      nzComponentParams: {
        dataItem :cloneDeep(_bookingDto),
        type : _type,
        datePicker : _datePicker
      },
    });
    _modal.afterClose.subscribe(result => {
       if (result) {
        this.fetchDaysofWeek(this.dateFromToArr[0],this.dateFromToArr[1]);
       }
    });
  }

  isOutDate(bookingDto?: BookingDto){
    let currentDate = new Date();
    bookingDto.datePicker = this.withoutTime(bookingDto.datePicker);
    bookingDto.datePicker.setHours(bookingDto?.slotDto?.value.getHours(),bookingDto?.slotDto?.value?.getMinutes());
    if (bookingDto.datePicker.getTime() < currentDate.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  getSlotByID(slotId : number ){
    return this.listSlot.find(x=> x.id == slotId);
  }

  weekChangeHandle(date : Date){
    this.objFilterWeekInput =  new ObjFilterWeekInput();
    this.listDayOfWeek =  this.dates(date);
    this.dateFromToArr = new Array<Date>();
    this.dateFromToArr.push(this.fromDate);
    this.dateFromToArr.push(this.toDate);
  }

  rankPickerChange(dates : any){
    this.week = null;
  }

  seach(){
    let startDate = this.dateFromToArr[0];
    let endDate = this.dateFromToArr[1];
    this.listDayOfWeek = this.getDatesFromTo(startDate,endDate);
    this.listFootballField = this.listFootballFieldClone.filter(x=> this.listFootballSelected.includes(x.id));
    this.listFootballField = this.listFootballField.sort(x=> +x.type);

    this.listFootballField.sort((a, b) => (+a.type) - (+b.type));

    this.listSlot = this.listSlotClone.filter(x=> this.listSlotSelected.includes(x.id));
    this.fetchDaysofWeek(startDate,endDate);
  }

  isDisable : boolean = false;
  kieuSanChange(_listKieuSan: number[]){
    this.isDisable = false;
    this.isDisable = _listKieuSan.length == 0 ? true :  false;
    this.footballSelects = this.listFootballFieldClone.filter(x=> _listKieuSan.includes(+x.type));
    this.listFootballSelected = [];
    this.footballSelects.forEach(
      item=>{
        this.listFootballSelected.push(+item.id);
      }
    );
  }

  getDatesFromTo(startDate : Date, endDate : Date) {
    const date = new Date(startDate.getTime());
    const dates = [];
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }


  withoutTime(_date : Date) {
    var d = new Date(_date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  compareDate(_date1 : Date, _date2 : Date){
    if (this.withoutTime(_date1).getTime() == this.withoutTime(_date2).getTime()) {
        return true;
    } else {
      return false;
    }
  }

}
