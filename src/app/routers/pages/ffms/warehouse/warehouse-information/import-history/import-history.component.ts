import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { ViewPDFModalComponent } from 'src/app/shared/component/view-pdf/view-pdf-modal.component';
import { SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { ImportProductDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { ImportHistoryDetailComponent } from './import-history-detail/import-history-detail.component';
import { ImportHistoryModelComponent } from './import-history-model/import-history-model/import-history-model.component';

@Component({
  selector: 'import-history',
  templateUrl: './import-history.component.html',
  styleUrls: ['./import-history.component.css']
})
export class ImpportHistoryComponent  extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private readonly _modalService: NzModalService,
    private  _warehouseManagementService : WarehouseManagementService,
       private _breadcrumbsService : BreadcrumbService,
    private _systemManagementService : SystemManagementService,
     private _router : Router,
  ) {
    super(injector);
  }
  total : number;
  listDataTransaction : ImportProductDto[] | [];

  _objFilter : ImportProductDto = new ImportProductDto();
  listSupplilers: any[] = [];
  listEmployees : any[] = [];
  listStatus : any[] = [{
    id : "1",
    name : "Nhập hàng thành công"
  },{
    id : "2",
    name : "Nhập hàng không thành công"
  }
];

  @Input() productId : string | number ;
  _oldId : number ;

  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý kho ","Lịch sử nhập hàng"]);
    this._breadcrumbsService.setNameButton("");
    this._breadcrumbsService.setNewButton("Nhập hàng");


    this.initFilter();
    this.getInitData();
  }

  fetchData(){
    this.loading = true;
    this._objFilter.sort ="import_date";
    this._objFilter.sortBy ="descend";
    this._warehouseManagementService.searchImportProduct(this._objFilter).subscribe((res) =>{
      if(res){
        res['content'].forEach(element => {
            element.pageSize = this._objFilter.pageSize;
            element.pageIndex = this._objFilter.pageIndex;
        });
        this.listDataTransaction = res.content;
        this._objFilter.total=  res['totalElements'];
        this.loading = false;
      }
    })
  }

  initFilter(){
    this._objFilter.status = "1";
    this._objFilter.foundationId = 1;
    this.listEmployees = [];
    this.listSupplilers = [];
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

   addOrEditModal(_dataItem?: ImportProductDto) {
    const _modal = this._modalService.create({
      nzTitle: (_dataItem ? 'Thông tin ' : 'Thêm mới ') + 'lịch sử hoá dơn',
      nzContent: ImportHistoryDetailComponent,
      nzWidth: window.innerWidth > 800 ? 850 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new ImportProductDto(),
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }

  EditModal(_dataItem?: ImportProductDto, _isView? : boolean,  _isEdit? :boolean) {
    const _modal = this._modalService.create({
      nzTitle: (_dataItem ? (  _isView ? "Xem" : 'Sửa' ) : 'Thêm mới') + ' thông tin khách hàng',
      nzContent: ImportHistoryModelComponent,
      nzWidth: window.innerWidth > 800 ? 600 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new ImportProductDto(),
        isView : _isView,
        isEdit : _isEdit
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }
viewPdf(_dataItem: ImportProductDto){
      this._warehouseManagementService.getImportPdf(_dataItem.id).subscribe(
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
  delete(_dataItem?: ImportProductDto){
    AppMessageService.confirm("","Bạn có chắc muốn xóa mã nhập hàng ("+_dataItem.importCouponCode+") hay không",
    ()=>{
      this.loading = true;
      this._systemManagementService.deleteImportProduct(_dataItem).subscribe(
        ()=>{
          AppMessageService.success("Xoá khách hàng thành công!","");
          this.loading = false;
          this.fetchData();
        }
      );
    }
    );
  }

    editModal(_dataItem?: ImportProductDto) {
     if(_dataItem){
      this._router.navigate([`/sale/${encodeURIComponent(_dataItem.id)}/edit-order`]);
    }else{
      this._router.navigate(['/sale']);
    }
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
