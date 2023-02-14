import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import {IInt32ItemObj, ProductDto, PRODUCT_CATEGORY } from './../../../../../shared/service-proxies/system-management-service';
import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { ProductInputDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ProductInforModalComponent } from './product-infor-modal/product-infor-modal.component';
import { BehaviorSubject, interval, of } from 'rxjs';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import * as cloneDeep from 'lodash/cloneDeep';
@Component({
  selector: 'app-san-pham',
  templateUrl: './product-information.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProductInformationComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private readonly _modalService: NzModalService,
    private  _warehouseManagementService : WarehouseManagementService,
      private _breadcrumbsService : BreadcrumbService,
  ) {
    super(injector);
  }

  timer : any;

  dataItem = new ProductDto();

  PRODUCT_CATEGORY = PRODUCT_CATEGORY;

  objFilter = new ProductInputDto();

  currentTab : number ;

  productCategory : number = PRODUCT_CATEGORY.DO_AN ;

  listProduct:  ProductDto[] = [];

  lstFoundation : any = [];

  listProductStatus : any [];

  foundationId : number = 1;


  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý kho","Quản lý sản phẩm"]);
    this._breadcrumbsService.setNameButton("sản phẩm");
    this._breadcrumbsService.setNewButton("");

    this.dataItem.id = 1;

   // Khoi tao ban dau
   this.objFilter.pageIndex = 0;
   this.objFilter.pageSize = 10;
   this.objFilter.sort = "";
   this.objFilter.sortBy = "";
   this.productCategory =  PRODUCT_CATEGORY.DO_AN;
   this.objFilter.textSearch = "";
   this.objFilter.status = "1";
   this.listProductStatus = this._warehouseManagementService.getListProductStatus();
  }


  initFilter(): void {
     this.objFilter = new ProductInputDto();
     this.objFilter.pageIndex = 0;
     this.objFilter.pageSize = 10;
     this.objFilter.sort = "";
     this.objFilter.sortBy = "";
    //  this.productCategory = 1;
     this.objFilter.textSearch = "";
     this.objFilter.status = "1";
     this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    this._warehouseManagementService.getListProducts(
      this.objFilter.name,
      this.objFilter.productCode,
      this.objFilter.brand,
      this.objFilter.status,
      this.objFilter.pageIndex ,
      this.objFilter.pageSize,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.productCategory,
      this.foundationId,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
        this.listProduct = result['content'];
        this.objFilter.total = result['totalElements'];
        this.loading = false;
      }
    );
  }

  addOrEditModal(_dataItem?: ProductDto, _isView? : boolean) {
    const _modal = this._modalService.create({
      nzTitle: (_dataItem ? 'Sửa ' : 'Thêm mới ') + 'thông tin sản phẩm',
      nzContent: ProductInforModalComponent,
      nzWidth: window.innerWidth > 1000 ? 800 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? cloneDeep(_dataItem) : new ProductDto(),
        isView : _isView
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }

  deleteProduct(_dataItem : ProductDto){
    _dataItem.lstId = [_dataItem?.id];
    AppMessageService.confirm("","Bạn muốn xóa sản phẩm",
    ()=>{
      this.loading = true;
      this._warehouseManagementService.deleteProduct(_dataItem).subscribe(
        ()=>{
          AppMessageService.success("Thêm xử lý thành công!","");
          this.loading = false;
          this.fetchData();
        }
      );
    }
    );
  }

  onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.pageIndex = _params.pageIndex;
    this.objFilter.pageSize = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
      this.objFilter.sort = objSort[0]?.key == "productCode" ? "product_code" : objSort[0]?.key;
      this.objFilter.sortBy = objSort[0]?.value == "ascend"? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }
    this.objFilter.sort = isNullOrUndefinedOrEmpty(this.objFilter.sort) ?   "" : this.objFilter.sort;
    this.objFilter.sortBy = isNullOrUndefinedOrEmpty(this.objFilter.sortBy) ?   "" : this.objFilter.sortBy;
    this.objFilter.textSearch = isNullOrUndefinedOrEmpty(this.objFilter.textSearch) ?   "" : this.objFilter.textSearch;

    if(_params.pageIndex > 0){
      this.objFilter.pageIndex =  this.objFilter.pageIndex -1;
    }

    this.loading =true ;
    this.fetchData();
  }

  tabChangeHandle(){
    if(this.currentTab == 0){
      this.productCategory = PRODUCT_CATEGORY.DO_AN;
    }
    if(this.currentTab == 1){
      this.productCategory = PRODUCT_CATEGORY.DO_TAP;
    }
  }

  searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }
}
