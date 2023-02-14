import { ProductDto } from 'src/app/shared/service-proxies/system-management-service';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxMaskModule } from 'ngx-mask';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { ComboBoxBaseComponent } from './combo-box-base.component';
import { ProductInputDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';

@Component({
	selector: 'product-combobox',
	template: `
		<nz-select
            [(ngModel)]="sModel"
            [nzAllowClear]='true'
            [nzPlaceHolder]="placeHolderSearch || sPlaceHolder"
			      (nzOpenChange)="placeHolderSearch = $event ? 'Nhập tên, mã sản phẩm để tìm kiếm...' : undefined"
            (ngModelChange)="sChange($event)"
            (nzOnSearch)="search($event)"
            style="width:100%"
            [nzDisabled]="isDisabled"
			      [nzOptionHeightPx]="200"
            nzShowSearch
            nzServerSearch
        >
            <nz-option
                *ngFor="let option of listDataCustom"
				        nzCustomContent
                [nzValue]="option.id"
                [nzLabel]="option.name">
					      <div class="d-flex align-items-center custom-filter-media">
						    <div class="me-4">
							  <img [src]="option.image" alt="product" style="width: 55px; border-radius: 1.15rem;" />
						  </div>
						  <div style="line-height: 20px;">
							<p class="text-gray-700 text-hover-primary">
                <span class="fw-bold">Sản phẩm:</span> {{option.productCode}} - {{option.name}}<br>
                <span class="fw-bold">Giá:</span> {{option.price}}<br>
                <span class="fw-bold">Thương hiệu:</span> {{option.brand}} <br>
              </p>
						  </div>
					    </div>
			</nz-option>
      </nz-select>
    `,
})
export class ProductComboBoxComponent extends ComboBoxBaseComponent<number> implements OnInit {

	constructor(
    private  _warehouseManagementService : WarehouseManagementService,
  ) {
		super();
	}

	@Input() listDataCustom: ProductDto[] = [];
  @Input() textSearch : string ;
	private _listDataSeachCustom: ProductDto[];
  objFilter = new ProductInputDto();
  timer : any ;

	override search(_keyWord: string) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if(AppUtilityService.isNullOrEmpty(_keyWord)){
        this._listDataSeachCustom = [];
        this.listDataCustom = [];
      }else{

        this.fetchData(_keyWord);
      }
    }, 1000)
	}

  fetchData(_keyWord : string){
    const foundationId  = 1 ;
    this.objFilter.pageIndex = 0;
    this.objFilter.pageSize = 10;
    this.objFilter.textSearch = _keyWord;
    this.objFilter.status = "1";

    this._warehouseManagementService.getListProducts(
      this.objFilter.name,
      this.objFilter.productCode,
      this.objFilter.brand,
      this.objFilter.status,
      this.objFilter.pageIndex ,
      this.objFilter.pageSize,
      this.objFilter.sort,
      this.objFilter.sortBy,
      null,
      foundationId,
      this.objFilter.textSearch
    ).subscribe(
      (result)=>{
        this._listDataSeachCustom = result['content'];

        if (this._listDataSeachCustom) {
          this.listDataCustom =
            AppUtilityService.isNullOrEmpty(_keyWord)
            ? this._listDataSeachCustom
            : this._listDataSeachCustom.filter(
                x =>
            (!AppUtilityService.isNullOrEmpty(x.name) && AppUtilityService.removeSignAndAllSpace(x.name).indexOf(AppUtilityService.removeSignAndAllSpace(_keyWord)) !== -1)
            || (!AppUtilityService.isNullOrEmpty(x.productCode) && AppUtilityService.removeSignAndAllSpace(x.productCode).indexOf(AppUtilityService.removeSignAndAllSpace(_keyWord)) !== -1)
          );
        }
      }
    );
  }

	ngOnInit() {
   this._listDataSeachCustom = this.listDataCustom ;
	}

}

@NgModule({
	declarations: [
		ProductComboBoxComponent
	],
	exports: [
		ProductComboBoxComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NzSelectModule,
		NgxMaskModule.forRoot({ validation: false }),
	]
})

export class ProductComboBoxModule { }
