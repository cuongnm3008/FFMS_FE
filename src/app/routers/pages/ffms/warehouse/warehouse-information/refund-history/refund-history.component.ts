import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { ReturnProductDto,  WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { RefundHistoryModuleComponent } from './refund-history-module/refund-history-module.component';

@Component({
  selector: 'app-refund-history',
  templateUrl: './refund-history.component.html',
})
export class RefundHistoryComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private readonly _modalService: NzModalService,
    private  _warehouseManagementService : WarehouseManagementService,
       private _breadcrumbsService : BreadcrumbService,
    private _systemManagementService : SystemManagementService
  ) {
    super(injector);
  }
  total : number;
  listDataTransaction : ReturnProductDto[] | [];

  _objFilter : ReturnProductDto = new ReturnProductDto();
  listSupplilers: any[] = [];
  listEmployees : any[] = [];


  listStatus : any[] = [{
    id : "3",
    name : "Đổi trả thành công"
  },{
    id : "0",
    name : "Đổi trả thất bại"
  }
];

  @Input() productId : string | number ;
  _oldId : number ;

  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý kho ","Lịch sử đổi trả"]);
    this._breadcrumbsService.setNameButton("");
    this._breadcrumbsService.setNewButton("");
    this._objFilter.pageIndex = 0;
    this._objFilter.pageSize = 10;
    this._objFilter.status ="3";
    this.initFilter();
  this.getInitData();
  }

  fetchData(){
    this.loading = true;
    // this._objFilter.status
    // debugger;
    //  this._objFilter.pageIndex = 0;
    // this._objFilter.pageSize = 10;
    this._warehouseManagementService.searchReturnProduct(
      this._objFilter.pageIndex,
      this._objFilter.pageSize,
      this._objFilter.sort ="importDate",
      this._objFilter.sortBy ="ascend",
      this._objFilter.textSearch,
      this._objFilter.importCouponCode,
      this._objFilter.productName,
      this._objFilter.supplierName,
      this._objFilter.status,
      this._objFilter.importDate,

    ).subscribe((res) =>{
      if(res){
         res['content'].forEach(element => {
            element.pageSize = this._objFilter.pageSize;
            element.pageIndex = this._objFilter.pageIndex;
        });
        this.listDataTransaction = res['content'];
        this._objFilter.total= res['totalElements'];
        this.loading = false;
      }
    })
  }

  initFilter(){
    // this._objFilter.status = "1";
    // this._objFilter.foundationId = 1;
    this._objFilter.pageIndex = 0;
    this._objFilter.pageSize = 10;
      this._objFilter.textSearch,
      this._objFilter.importCouponCode = "",
      this._objFilter.productName = "",
      this._objFilter.supplierName = "",
      this._objFilter.status = "3",
      this._objFilter.importDate = null,
    this.fetchData();
  }


  getInitData(){
    this._warehouseManagementService.getSuppliers(null,null,"1",0,1000)
      .subscribe((supplier) => {
        if(supplier){
          supplier.content.forEach(content => {
            this.listSupplilers.push({
              id: content.id,
              name : content.name
            })
          });
        }
        this.getAllUsers();
      })
  }

  getAllUsers(){
    this._systemManagementService.getAll()
    .subscribe(e => {
      if(e){
        e.forEach(res => {
          this.listEmployees.push({
            id : res.username,
            name : (res.firstName +" "+res.lastName)+" - "+res.username
          })
        })
      }
    })
  }
 addOrEditModal(_dataItem?: ReturnProductDto, _isView? : boolean) {
    const _modal = this._modalService.create({
      nzTitle: "Lịch sử đổi trả",
      nzContent: RefundHistoryModuleComponent,
      nzWidth: window.innerWidth > 800 ? 600 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new ReturnProductDto(),
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }

  onChangeQuery(_params: NzTableQueryParams){
    this._objFilter.pageIndex = _params.pageIndex;
    this._objFilter.pageSize = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
       this._objFilter.sort = objSort[0]?.key == "importDate" ? "import_date" : objSort[0]?.key;
      this._objFilter.sortBy = objSort[0]?.value == "ascend"? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }
    this._objFilter.sort = isNullOrUndefinedOrEmpty(this._objFilter.sort) ?   "" : this._objFilter.sort;
    this._objFilter.sortBy = isNullOrUndefinedOrEmpty(this._objFilter.sortBy) ?   "" : this._objFilter.sortBy;
    this._objFilter.textSearch = isNullOrUndefinedOrEmpty(this._objFilter.textSearch) ?   "" : this._objFilter.textSearch;

    if(_params.pageIndex > 0){
      this._objFilter.pageIndex =  this._objFilter.pageIndex -1;
    }
    this.loading =true ;
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
