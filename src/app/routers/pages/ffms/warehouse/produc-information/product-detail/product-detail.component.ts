import { Constants } from 'src/app/shared/common/Constant';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ProductDto, ProductWarehouseDto, PRODUCT_CATEGORY, SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { ProductTransactionHistoryDto, ProductTransactionHistoryFilterDto, WarehouseInputDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { ExchangeProductComponent } from '../../warehouse-information/exchange-product/exchange-product.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NhapHangModalComponent } from '../../warehouse-information/nhap-hang-modal/nhap-hang-modal.component';
import * as cloneDeep from 'lodash/cloneDeep';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent  implements OnInit {

  constructor(
    private _router : Router,
    private  _activatedRoute: ActivatedRoute,
    private  _warehouseManagementService : WarehouseManagementService,
    private _systemManagementService : SystemManagementService,
    private _breadcrumbsService : BreadcrumbService,
    private readonly _modalService: NzModalService,

  ) { }

  @Input() dataItem = new  ProductWarehouseDto;
  producDto = new ProductDto();
  switchValue : boolean = false;
  productId  : number ;
  listDataTransaction : ProductTransactionHistoryDto[] | [];
  PRODUCT_CATEGORY = PRODUCT_CATEGORY;
  listEmployees : any[] = [];
  listSupplilers: any[] = [];
  listStatus : any[] = [{
    id : "1",
    name : "Nhập hàng "
  },{
    id : "2",
    name : "Xuất hàng"
  }
];
  loading : boolean;
  loadingHistory: boolean;
  productCategory : PRODUCT_CATEGORY;
  trangDoiTra: any[] = [];
  trangTTDoAn: any[] = [];
  objPackageFilter = new WarehouseInputDto();
  objHistoryProductFilter = new ProductTransactionHistoryFilterDto();

  listProductWarehouse: ProductWarehouseDto[] = [];
  type : string ;
  currentTab : number ;
  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý kho","Quản lý sản phẩm","Chi tiết sản phẩm"]);
    this._breadcrumbsService.setNameButton("");
    this._breadcrumbsService.setNewButton("");

    this.trangTTDoAn = this._warehouseManagementService.getListTTDoAn();
    this.trangDoiTra = this._warehouseManagementService.getListTTDoiTra();

    this.trangTTDoAn = this._warehouseManagementService.getListTTDoAn();

    this._activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      this.type = params['type'];
		});
   if(this.productId > 0){
    this._warehouseManagementService.getProductById(this.productId).subscribe((result)=>{
        if(result){
          this.producDto = result;
          this.dataItem = result;
          this.objPackageFilter.productName = result['name'];
          this.objHistoryProductFilter.name = result['name'];
          this.productCategory = + result['categoryId'];
          this.objHistoryProductFilter.categoryId = + result['categoryId'];
          this.objPackageFilter.foundationId = result['lstFoundationFields'][0]['id'];
          this.objHistoryProductFilter.foundationId = result['lstFoundationFields'][0]['id'];
          this.initialization();
        }
    });
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
    this.initializationProductHistory();
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

  initFilter(): void {
    this.objPackageFilter = new WarehouseInputDto();
    this.objPackageFilter.pageIndex = 0;
    this.objPackageFilter.pageSize = 5;
    this.objPackageFilter.sort = "";
    this.objPackageFilter.sortBy = "";
    this.productCategory = + this.producDto.categoryId;
    this.objPackageFilter.textSearch = "";
    this.objHistoryProductFilter = new ProductTransactionHistoryFilterDto();

    this.initFilterProductHistory();
    this.fetchData();
  }

  initialization() {
    this.objPackageFilter.pageIndex = 0;
    this.objPackageFilter.pageSize = 5;
    this.objPackageFilter.sort = "";
    this.objPackageFilter.sortBy = "";
    this.objPackageFilter.status = "1";
    this.fetchData();
  }

  initFilterProductHistory(): void {
    this.objHistoryProductFilter = new ProductTransactionHistoryFilterDto();;
    this.objHistoryProductFilter.page = 0;
    this.objHistoryProductFilter.size = 5;
    this.objHistoryProductFilter.sort = "";
    this.objHistoryProductFilter.sortBy = "";
    this.objHistoryProductFilter.textSearch = "";
    this.fetchDataProductHistory();
}

 initializationProductHistory(): void {
    this.objHistoryProductFilter.page = 0;
    this.objHistoryProductFilter.size = 5;
    this.objHistoryProductFilter.sort = "";
    this.objHistoryProductFilter.sortBy = "";
    this.objHistoryProductFilter.status = "1";
    this.fetchDataProductHistory();
  }



  fetchData(): void {
    this.loading = true;
    this._warehouseManagementService.getListProductWarehouse(
      this.objPackageFilter.foundationId,
      this.objPackageFilter.pageIndex,
      this.objPackageFilter.pageSize,
      this.objPackageFilter.sort,
      this.objPackageFilter.sortBy,
      this.objPackageFilter.productName,
      this.objPackageFilter.productId,
      this.objPackageFilter.supplierName,
      this.productCategory,
      this.objPackageFilter.importCouponCode,
      this.objPackageFilter.returnStatus,
      this.objPackageFilter.status,
      this.objPackageFilter.startDate,
      this.objPackageFilter.textSearch
    )
    .subscribe(
        (result) => {
          this.listProductWarehouse = result['content'];
          this.objPackageFilter.total = result['totalElements'];
          this.loading = false;
      }
    );
  }

  fetchDataProductHistory(){
      this.loadingHistory = true;
    this._warehouseManagementService.getListProductHistoryWarehouse(
      this.productId,
      this.objHistoryProductFilter.foundationId,
      this.objHistoryProductFilter.page,
      this.objHistoryProductFilter.size,
      this.objHistoryProductFilter.sort,
      this.objHistoryProductFilter.sortBy,
      this.objHistoryProductFilter.importCouponCode,
      this.objHistoryProductFilter.supplier,
      this.objHistoryProductFilter.importBy,
      //  this.productCategory,
      this.objHistoryProductFilter.status,
      this.objHistoryProductFilter.importDate,
      this.objHistoryProductFilter.textSearch
    ).subscribe(
        (result) => {
          this.listDataTransaction = result['content'];
          this.objHistoryProductFilter.total = result['totalElements'];
          this.loadingHistory = false;
      }
    );
  }

  save(){

  }

  back(){
    this._router.navigate(['/product-information']);
  }

  sale(){
    this._router.navigate(['/sale']);
  }

  onChangeQueryPackage(_params: NzTableQueryParams){
    this.objPackageFilter.pageIndex = _params.pageIndex;
    this.objPackageFilter.pageSize = _params.pageSize;
    if (_params.sort) {
      let objSort = _params.sort.filter(x => x.value != null);
      if (objSort[0]?.key == "manufactureDate") {
        this.objPackageFilter.sort = "manufacture_date";
      }
      if (objSort[0]?.key == "retailPrice") {
        this.objPackageFilter.sort = "retail_price";
      }
      if (objSort[0]?.key == "exprired_Date") {
        this.objPackageFilter.sort = "exprired_date";
      }

      this.objPackageFilter.sortBy = objSort[0]?.value == "ascend" ? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }

    this.objPackageFilter.sort = isNullOrUndefinedOrEmpty(this.objPackageFilter.sort) ? "" : this.objPackageFilter.sort;
    this.objPackageFilter.sortBy = isNullOrUndefinedOrEmpty(this.objPackageFilter.sortBy) ? "" : this.objPackageFilter.sortBy;
    this.objPackageFilter.textSearch = isNullOrUndefinedOrEmpty(this.objPackageFilter.textSearch) ? "" : this.objPackageFilter.textSearch;

    if (_params.pageIndex > 0) {
      this.objPackageFilter.pageIndex = this.objPackageFilter.pageIndex - 1;
    }
    this.fetchData();
  }

  onChangeQueryHistory(_params: NzTableQueryParams){
    this.objHistoryProductFilter.page = _params.pageIndex - 1;
    this.objHistoryProductFilter.size = _params.pageSize;


    if (_params.sort) {
      let objSort = _params.sort.filter(x => x.value != null);
      if (objSort[0]?.key == "importDate") {
        this.objHistoryProductFilter.sort = "import_date";
      }
      this.objHistoryProductFilter.sortBy = objSort[0]?.value == "ascend" ? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }

    this.objHistoryProductFilter.sort = isNullOrUndefinedOrEmpty(this.objHistoryProductFilter.sort) ? "" : this.objHistoryProductFilter.sort;
    this.objHistoryProductFilter.sortBy = isNullOrUndefinedOrEmpty(this.objHistoryProductFilter.sortBy) ? "" : this.objHistoryProductFilter.sortBy;
    this.objHistoryProductFilter.textSearch = isNullOrUndefinedOrEmpty(this.objHistoryProductFilter.textSearch) ? "" : this.objHistoryProductFilter.textSearch;
     this.fetchDataProductHistory();
  }

  tabChangeHandle(){
    if(this.currentTab == 0){
      this.fetchData();
    }
    if(this.currentTab == 1){
      this.fetchDataProductHistory();
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

  addOrEditModal(_dataItem?: ProductWarehouseDto, _type? :string,_isView?: boolean) {
    const _modal = this._modalService.create({
      nzTitle:((_dataItem && _type != "import")? (_isView ?"Xem":"Sửa"):"Nhập" ) + " thông tin lô hàng",
      nzContent: NhapHangModalComponent,
      nzWidth: window.innerWidth > 900 ? 800 : '90%',
      nzComponentParams: {
        isView :_isView,
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
}
