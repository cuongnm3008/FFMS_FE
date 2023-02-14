import { ExchangeProductComponent } from './exchange-product/exchange-product.component';
import { NhapHangModalComponent } from './nhap-hang-modal/nhap-hang-modal.component';
import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { PRODUCT_CATEGORY, ProductWarehouseDto, ProductDto } from 'src/app/shared/service-proxies/system-management-service';
import { WarehouseInputDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { ImpportHistoryComponent } from './import-history/import-history.component';
import * as cloneDeep from 'lodash/cloneDeep';


@Component({
  selector: 'app-warehouse-information',
  templateUrl: './warehouse-information.component.html',
  styleUrls: ['./warehouse-information.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WarehouseInformationComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private readonly _modalService: NzModalService,
    private _activatedRoute: ActivatedRoute,
    private _warehouseManagementService: WarehouseManagementService,
    private _breadcrumbsService : BreadcrumbService,
  ) {
    super(injector);
  }
  dataItem = new ProductWarehouseDto();

  objFilter = new WarehouseInputDto();

  currentTab: number;

  listProductWarehouse: ProductWarehouseDto[] = [];
  productCategory: number = PRODUCT_CATEGORY.DO_AN;

  PRODUCT_CATEGORY = PRODUCT_CATEGORY;

  trangThaiSoLuongSp: any[];
  trangTTDoAn: any[];
  trangTTDoTap: any[];
  trangDoiTra: any[];
  productId: number;

  type : string ;
  timer : any;

  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý kho ","Quản lý lô hàng"]);
    this._breadcrumbsService.setNameButton("");
    this._activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      this.type = params['type'];
      this.objFilter.productId = this.productId

      if (this.productId > 0) {
     this._warehouseManagementService.getProductById(this.productId).subscribe((result) => {
          if (result) {
            this.dataItem = result;
            this.objFilter.productName = result['name'];
            this.productCategory = + result['categoryId'];
            this.currentTab = this.productCategory == PRODUCT_CATEGORY.DO_AN ? 0 : 1;
            this.initialization();
            if ( params['type'] == "import") {
              this.addOrEditModal(this.dataItem,params['type']);
            }
          }
        });
      }
      else {
        this.currentTab = 0;
        this.productCategory = PRODUCT_CATEGORY.DO_AN;
        this.initialization();
      }
    });
    this.objFilter.foundationId = 1;
  }

  initialization() {
    this.objFilter.pageIndex = 0;
    this.objFilter.pageSize = 10;
    this.objFilter.sort = "";
    this.objFilter.sortBy = "";
    this.objFilter.status = "2";
    this.trangThaiSoLuongSp = this._warehouseManagementService.getListTrangThaiSoLuongSp();
    this.trangTTDoAn = this._warehouseManagementService.getListTTDoAn();
    this.trangTTDoTap = this._warehouseManagementService.getListTTDoTap();
    this.trangDoiTra = this._warehouseManagementService.getListTTDoiTra();
    this.fetchData();
  }


  initFilter(): void {
    this.objFilter = new WarehouseInputDto();
    this.objFilter.pageIndex = 0;
    this.objFilter.pageSize = 10;
    this.objFilter.sort = "";
    this.objFilter.sortBy = "";
    this.productCategory = PRODUCT_CATEGORY.DO_AN;
    this.objFilter.textSearch = "";
    this.objFilter.status = "2";
    this.fetchData();
  }


  fetchData(): void {
    this.loading = true;
    this._warehouseManagementService.getListProductWarehouse(
      this.objFilter.foundationId,
      this.objFilter.pageIndex,
      this.objFilter.pageSize,
      this.objFilter.sort = "import_date",
      this.objFilter.sortBy = "ascend",
      this.objFilter.productName,
      this.objFilter.productId,
      this.objFilter.supplierName,
      this.productCategory,
      this.objFilter.importCouponCode,
      this.objFilter.returnStatus,
      this.objFilter.status,
      this.objFilter.startDate,
      this.objFilter.textSearch
    )
      .subscribe(
        (result) => {
          this.listProductWarehouse = result['content'];
          this.objFilter.total = result['totalElements'];
          this.loading = false;
          console.log(this.listProductWarehouse);
        }
      );
  }

  addOrEditModal(_dataItem?: ProductWarehouseDto, _type? :string,_isView?: boolean) {
    const _modal = this._modalService.create({
      nzTitle:((_dataItem && _type != "import")? (_isView ?"Xem":"Sửa"):"Nhập" ) + " thông tin lô hàng",
      nzContent: NhapHangModalComponent,
      nzWidth: window.innerWidth > 900 ? 800 : '90%',
      nzComponentParams: {
        isView: _isView,
        dataItem: _dataItem ? cloneDeep(_dataItem) : new ProductWarehouseDto(),
        cateogryId : this.productCategory ? this.productCategory : PRODUCT_CATEGORY.DO_AN
      }
    });

    _modal.afterClose.subscribe((result) => {
      if (result) {
        this.fetchData();
      }
    });
  }

  onChangeQuery(_params: NzTableQueryParams) {
    this.objFilter.pageIndex = _params.pageIndex;
    this.objFilter.pageSize = _params.pageSize;
    if (_params.sort) {
      let objSort = _params.sort.filter(x => x.value != null);
      if (objSort[0]?.key == "manufactureDate") {
        this.objFilter.sort = "manufacture_date";
      }
      if (objSort[0]?.key == "retailPrice") {
        this.objFilter.sort = "retail_price";
      }
      if (objSort[0]?.key == "exprired_Date") {
        this.objFilter.sort = "exprired_date";
      }

      this.objFilter.sortBy = objSort[0]?.value == "ascend" ? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }

    this.objFilter.sort = isNullOrUndefinedOrEmpty(this.objFilter.sort) ? "" : this.objFilter.sort;
    this.objFilter.sortBy = isNullOrUndefinedOrEmpty(this.objFilter.sortBy) ? "" : this.objFilter.sortBy;
    this.objFilter.textSearch = isNullOrUndefinedOrEmpty(this.objFilter.textSearch) ? "" : this.objFilter.textSearch;

    if (_params.pageIndex > 0) {
      this.objFilter.pageIndex = this.objFilter.pageIndex - 1;
    }
    this.fetchData();
  }

  tabChangeHandle() {
    if (this.currentTab == 0) {
      this.productCategory = PRODUCT_CATEGORY.DO_AN;
    }
    if (this.currentTab == 1) {
      this.productCategory = PRODUCT_CATEGORY.DO_TAP;
    }
  }

  exchangeProduct(_dataItem: ProductWarehouseDto) {
    const _modal = this._modalService.create({
      nzTitle: "Đổi trả lô hàng",
      nzContent: ExchangeProductComponent,
      nzWidth: window.innerWidth > 900 ? 800 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new ProductWarehouseDto(),
      }
    });

    _modal.afterClose.subscribe((result) => {
      if (result) {
        this.fetchData();
      }
    });
  }

  viewTransactionHistory(_dataItem?: ProductWarehouseDto) {

  }

  viewReturnHistory(_dataItem: ProductWarehouseDto) {
    const _modal = this._modalService.create({
      nzTitle: "Lịch sử đổi trả",
      nzContent: ImpportHistoryComponent,
      nzWidth: window.innerWidth > 1500 ? 1400 : '90%',
      nzComponentParams: {
        productId: _dataItem.productId ? _dataItem.productId : "",
      }
    });
  }

  searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }

}

