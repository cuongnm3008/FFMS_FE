import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { Component, Injector, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ProductWarehouseDto, PRODUCT_CATEGORY } from 'src/app/shared/service-proxies/system-management-service';
import { QUALITY_STATUS, WarehouseInputDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';

@Component({
  selector: 'app-table-warehouse',
  templateUrl: './table-warehouse.component.html',
  styleUrls: ['./table-warehouse.component.css']
})
export class TableWarehouseComponent extends AppComponentBase implements OnInit {

  constructor(
      injector: Injector,
        private _warehouseManagementService: WarehouseManagementService,

  ) {
     super(injector);
  }


listProductWarehouse: ProductWarehouseDto[] = [];
objFilter = new WarehouseInputDto();
productCategory: number = PRODUCT_CATEGORY.DO_AN;
PRODUCT_CATEGORY = PRODUCT_CATEGORY;
QUALITY_STATUS = QUALITY_STATUS;

  ngOnInit(): void {
    this.objFilter.pageIndex = 0;
    this.objFilter.pageSize = 5;
    this.objFilter.status = "2";
    this.fetchData();

  }
  fetchData(){
      this.loading = true;
  this._warehouseManagementService.getListProductWarehouse(
      this.objFilter.foundationId,
      this.objFilter.pageIndex ,
      this.objFilter.pageSize ,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.productName,
      this.objFilter.productId,
      this.objFilter.supplierName,
      this.productCategory,
      this.objFilter.importCouponCode,
      this.objFilter.returnStatus,
      this.objFilter.status = "2",
      this.objFilter.startDate,
      this.objFilter.textSearch
    )
      .subscribe(
        (result) => {
           result['content'].forEach(element => {
            element.pageSize = this.objFilter.pageIndex;
            element.pageIndex = this.objFilter.pageSize;
        });
          this.listProductWarehouse = result['content'];
          this.objFilter.total = result['totalElements'];
           this.loading = false;
        }
      );
  }
 onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.pageIndex = _params.pageIndex;
    this.objFilter.pageSize = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
      this.objFilter.sort = objSort[0]?.key == "customerCode" ? "customer_code" : objSort[0]?.key;
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
}
