import { SupplierModalComponent } from './supplier-modal.component';
import { SupplierInputDto, SupplierDto } from './../../../../../shared/service-proxies/warehouse-management-service';
import { Component, Injector, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
})
export class SupplierComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private readonly _modalService: NzModalService,
    private _breadcrumbsService : BreadcrumbService,
    private  _warehouseManagementService : WarehouseManagementService,
  ) {
    super(injector);
  }
timer;
  lstStatus : any = [
    {
      id : "1",
      name : 'Hợp tác'
    },
    {
      id : "0",
      name : 'Dừng hợp tác'
    }
    ]
  objFilter = new SupplierInputDto();
  listSupplilers:  SupplierDto[] = [];
  ngOnInit(): void {
    this.objFilter.status = "1";
    this._breadcrumbsService.setBreadcrumb(["Quản lý thông tin","Quản lý nhà cung cấp"]);
    this._breadcrumbsService.setNameButton("nhà cung cấp");
    this._breadcrumbsService.setNewButton("");

    this.fetchData();
  }

  initFilter(){
    this.objFilter = new SupplierInputDto();
    this.objFilter.pageIndex = 0;
    this.objFilter.pageSize =  10;
    this.objFilter.status = "1";
    this.fetchData();
  }

  addOrEditModal(_dataItem?: SupplierDto, _isView? : boolean, _isEdit? :boolean) {
    const _modal = this._modalService.create({
      nzTitle: (_dataItem ? (  _isView ? "Xem" : 'Sửa' ) : 'Thêm mới') + ' thông tin nhà cung cấp',
      nzContent: SupplierModalComponent,
      // nzWidth: window.innerWidth > 1000 ? 800 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new SupplierDto(),
        isView : _isView,
        isEdit : _isEdit
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }


  delete(_dataItem?: SupplierDto) {
    AppMessageService.confirm("","Bạn có chắc muốn xóa nhà cung cấp  ("+ _dataItem.name +") hay không",
    ()=>{
      this.loading = true;
      this._warehouseManagementService.deleteSupplier(_dataItem).subscribe(
        ()=>{
          AppMessageService.success("Xoá nhà cung cấp thành công!","");
          this.loading = false;
          this.fetchData();
        }
      );
    }
    );
  }


  fetchData(){
    this.loading = true;
    this._warehouseManagementService.getSuppliers(
      this.objFilter.name,
      this.objFilter.phone,
      this.objFilter.status,
      this.objFilter.pageIndex,
      this.objFilter.pageSize,
      this.objFilter.email,
      this.objFilter.address,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        result['content'].forEach(element => {
            element.pageSize = this.objFilter.pageSize;
            element.pageIndex = this.objFilter.pageIndex;
        });
        this.listSupplilers = result['content'];
        this.objFilter.total = result['totalElements'];
        this.objFilter.pageIndex = result['number'];
        this.objFilter.pageSize = result['numberOfElements'];
        this.loading = false;
      }
    );
  }


  onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.pageIndex = _params.pageIndex;
    this.objFilter.pageSize = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
      this.objFilter.sort = objSort[0]?.key == "name" ? "name" : objSort[0]?.key;
      this.objFilter.sortBy = objSort[0]?.value == "ascend"? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }
    this.objFilter.sort = isNullOrUndefinedOrEmpty(this.objFilter.sort) ?   "" : this.objFilter.sort;
    this.objFilter.sortBy = isNullOrUndefinedOrEmpty(this.objFilter.sortBy) ?   "" : this.objFilter.sortBy;
    this.objFilter.textSearch = isNullOrUndefinedOrEmpty(this.objFilter.textSearch) ?   "" : this.objFilter.textSearch;

    if(_params.pageIndex > 0){
      this.objFilter.pageIndex =  this.objFilter.pageIndex -1;
    }

    this.fetchData();
  }
  searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }
}
