import { OrderChangeComponent } from './order-change/order-change.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewPDFModalComponent } from 'src/app/shared/component/view-pdf/view-pdf-modal.component';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { OrderDetailViewComponent } from './order-detail-view/order-detail-view.component';
import { OrderDetailDto, OrderDetailInputDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent extends AppComponentBase implements OnInit {

  constructor(
    private _breadcrumbsService : BreadcrumbService,
    private readonly _modalService: NzModalService,
    private _footballFieldFields : FoundationFieldsService,
    private  _warehouseManagementService : WarehouseManagementService,
    private _activatedRoute: ActivatedRoute,
    private _router : Router,
     injector: Injector,
  ) {
    super(injector);
  }

currentTab : number ;
objFilter = new OrderDetailInputDto();
listOrderDetail : OrderDetailDto [] = [];
foundationFieldName:string;
timer;
lstFoundation : any = [];
total: number;
test : any = [];
type : string;
choLayHangCount: number;
choThanhToanCount : number;
thanhToanCount : number;
huyCount: number;

ngOnInit(): void {
  this._breadcrumbsService.setBreadcrumb(["Quản lý dịch vụ","Quản lý hoá đơn"]);
  this._breadcrumbsService.setNameButton("");
  this._breadcrumbsService.setNewButton("");
  this.objFilter.page = 0;
  this.objFilter.size = 10;
  this.objFilter.sort = "";
  this.objFilter.sortBy = "";
  this.objFilter.textSearch = "";
  this.objFilter.status = '1';
  this._activatedRoute.params.subscribe((params) => {
  this.type = params['type'];
  if(this.type == 'paid'){
    this.currentTab = 2;
    this.objFilter.status = '2';
  }
  if(this.type == 'getItem'){
    this.currentTab = 2;
    this.objFilter.status = '2';
  }
    // if (this.type) {
    //   this._warehouseManagementService.getOrderDetailById(this.orderDetailId).subscribe(
    //     result=>{
    //       this.objFilter.orderCode = result['codeOrder'];
    //     }
    //   );
    // }
  });

  this._footballFieldFields.getListCoSoCombobox().subscribe(
    (result)=> {
    this.lstFoundation = result;
    this.foundationFieldName = this.lstFoundation[0]['name'];
    }
  );
}

  fetchData(){
      this.loading = true;
      this._warehouseManagementService.getListOrderDetails(
      this.objFilter.customerName,
      this.objFilter.status,
      this.objFilter.orderCode,
      this.objFilter.fromDate,
      this.objFilter.toDate,
      this.objFilter.employeeName,
      this.objFilter.page ,
      this.objFilter.size,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        result['content'].forEach(element => {
          element.pageSize = this.objFilter.size;
          element.pageIndex = this.objFilter.page;
        });
        this.listOrderDetail = result['content'];
        this.listOrderDetail.forEach(element => {
          element.lstproducts = element['saleOrderDetails'];
          element.totalPrice = 0;
          if(element.eventSchedulerBookingInfoBO){
            element.totalPrice += element.eventSchedulerBookingInfoBO.price;
            element.eventSchedulerBookingInfoBO.slot;
          }
            element['saleOrderDetails'].forEach(item => {
              element.totalPrice += (item.amount*item.price);
            });
        });
        this.total = result['totalElements'];
        this.loading = false;
        this.countDonHang();
      }
    );
  };

  initFilter(){
    this.objFilter = new OrderDetailInputDto();
    this.objFilter.page = 0;
    this.objFilter.size = 10;
    this.objFilter.sort = "";
    this.objFilter.sortBy = "";
    this.objFilter.textSearch = "";
    if(this.currentTab == 0){
      this.objFilter.status = '1';
    }
    if(this.currentTab == 1){
      this.objFilter.status = '3';
    }
    if(this.currentTab == 2){
      this.objFilter.status = '2';
    }
    if(this.currentTab == 3){
      this.objFilter.status = '0';
    }
    this.fetchData();
  }

  listStatusPayment = [
    {
      id : 0,
      name : 'Đơn đã hủy'
    },
    {
      id : 1,
      name : 'Chờ lấy hàng'
    },
    {
      id : 2,
      name : 'Đã thanh toán'
    },
    {
      id : 3,
      name : 'Chờ thanh toán'
    }
  ]

  viewOrEditOrderDetail (_dataItem?: OrderDetailDto) {
    const _modal = this._modalService.create({
      nzTitle:  'Thông tin hoá đơn',
      nzContent: OrderDetailViewComponent,
      nzWidth: window.innerWidth > 1500 ? 1200 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new OrderDetailDto(),
        typeView : ''
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }

  payment(_dataItem?: OrderDetailDto){
    if(_dataItem){
      this._router.navigate([`/sale/${encodeURIComponent(_dataItem.id)}/payment`]);
    }else{
      this._router.navigate(['/sale']);
    }
  }

  addOrEditModal(_dataItem?: OrderDetailDto){
    const _modal = this._modalService.create({
      nzTitle:  'Lấy hàng',
      nzContent: OrderChangeComponent,
      nzWidth: window.innerWidth > 1500 ? 1300 : '90%',
      nzComponentParams: {
        dataItem : _dataItem
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }

  countDonHang(){
    this._warehouseManagementService.getListOrderDetails(
      this.objFilter.customerName,
      '1',
      this.objFilter.orderCode,
      this.objFilter.fromDate,
      this.objFilter.toDate,
      this.objFilter.employeeName,
     0,10,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        this.choLayHangCount = result['totalElements'];
      }
    );

    this._warehouseManagementService.getListOrderDetails(
      this.objFilter.customerName,
      '3',
      this.objFilter.orderCode,
      this.objFilter.fromDate,
      this.objFilter.toDate,
      this.objFilter.employeeName,
      0,10,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        this.choThanhToanCount = result['totalElements'];
      }
    );

    this._warehouseManagementService.getListOrderDetails(
      this.objFilter.customerName,
      '2',
      this.objFilter.orderCode,
      this.objFilter.fromDate,
      this.objFilter.toDate,
      this.objFilter.employeeName,
      0,10,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        this.thanhToanCount = result['totalElements'];
      }
    );

    this._warehouseManagementService.getListOrderDetails(
      this.objFilter.customerName,
       '0',
      this.objFilter.orderCode,
      this.objFilter.fromDate,
      this.objFilter.toDate,
      this.objFilter.employeeName,
      0,10,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        this.huyCount = result['totalElements'];
      }
    );

  }

  onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.page = _params.pageIndex;
    this.objFilter.size = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
      this.objFilter.sort = objSort[0]?.key == "orderDate" ? "order_date" : objSort[0]?.key;
      this.objFilter.sortBy = objSort[0]?.value == "ascend"? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }
    this.objFilter.sort = isNullOrUndefinedOrEmpty(this.objFilter.sort) ?   "" : this.objFilter.sort;
    this.objFilter.sortBy = isNullOrUndefinedOrEmpty(this.objFilter.sortBy) ?   "" : this.objFilter.sortBy;
    this.objFilter.textSearch = isNullOrUndefinedOrEmpty(this.objFilter.textSearch) ?   "" : this.objFilter.textSearch;

    if(_params.pageIndex > 0){
      this.objFilter.page =  this.objFilter.page -1;
    }
    this.loading =true ;
    this.fetchData();
  }

  viewPdf(_dataItem: OrderDetailDto){
      this._warehouseManagementService.getFilePdfByOrder(_dataItem.id).subscribe(
        (result1) =>{
          this.viewPDFOrder(result1['content']);
       }
  )
  }

  viewPDFOrder(_baseString: string): void {
		this._modalService.create({
			nzTitle:'Xem hóa đơn',
			nzContent: ViewPDFModalComponent,
			nzComponentParams: {
        type:"base64",
				value: _baseString,
			},
			nzFooter: null,
			nzWidth: window.innerWidth > 800 ? 800 : '90%',
		});
	}

  searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }

  tabChangeHandle(){
    if(this.currentTab == 0){
      this.objFilter.status = '1';
    this.objFilter.page =0;
    }
    if(this.currentTab == 1){
      this.objFilter.status = '3';
          this.objFilter.page =0;

    }
    if(this.currentTab == 2){
      this.objFilter.status = '2';
          this.objFilter.page =0;

    }
    if(this.currentTab == 3){
      this.objFilter.status = '0';
          this.objFilter.page =0;

    }
    this.fetchData();
  }

}
