import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgxMaskModule } from 'ngx-mask';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ProductInputDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { ProductDto } from 'src/app/shared/service-proxies/system-management-service';
@Component({
  selector: 'custom-autocomplete',
  template: `
        <div class="input-group">
            <input class="form-control"
                (focus)="focusFunction()"
                [disabled]="isDisabled || productId > 0"
                [placeholder]="sPlaceHolder"
                [(ngModel)]="sModel"
                (ngModelChange)="search($event)"
                [nzAutocomplete]="auto"
				maxlength="50">
			<span class="input-group-btn" *ngIf="productId > 0 && !isDisabled; else noSelected">
				<a (click)="clear()" nzTooltipTitle="Xóa" nz-tooltip style="height: 100%;display: flex;justify-content: center;align-items: center; padding-right: 10px !important;position: absolute; right: 0px;">
					<i class="fas fa-times-circle" style="margin-top: 2px;
          font-size: 20px; color: red;"></i>
				</a>
			</span>
			<ng-template #noSelected>
				<span style="position: absolute; top: 8px; right: 8px; z-index: 1000;" *ngIf="loading">
					<i nz-icon nzType="loading" style="font-size: 20px; color: #50CD89;"></i>
				</span>
			</ng-template>
        </div>
        <nz-autocomplete #auto [nzBackfill]="true">
            <nz-auto-option *ngFor="let option of listData" (selectionChange)="selected($event, option)" [nzValue]="option.name">
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
            </nz-auto-option>
        </nz-autocomplete>
    `
})
export class CustomAutocompleteComponent {

  constructor(private _warehouseManagementService: WarehouseManagementService,) { }

  @Input() sModel: string;

  @Input() productId: number;

  @Input() isDisabled?: boolean;

  @Input() sPlaceHolder?: string = "Nhập tên sản phẩm để tìm kiếm";

  @Output() sModelChange = new EventEmitter<string>();

  @Output() productIdChange = new EventEmitter<number>();

  @Output() clearEvent = new EventEmitter();

  loading = false;

  listData: ProductDto[] = [];

  private _debounceTime$ = new Subject<string>();

  private _subscription$: Subscription;

  objFilter = new ProductInputDto();


  focusFunction(): void {
    if (AppUtilityService.isNullOrEmpty(this.sModel)) {
      this.listData = [];
    } else {
      this.search(this.sModel);
    }
  }

  selected(_event: any, _dataItem: any): void {
    if (_event.isUserInput) {
      this.productId = _dataItem.id;
      this.productIdChange.emit(_dataItem.id);
    }
  }

  clear(): void {
    this.sModel = undefined;
    this.productId = -1;
    this.productIdChange.emit(-1);
    this.clearEvent.emit();
  }

  search(_filter?: any) {
    this.loading = true;
    this.sModelChange.emit(_filter);
    this._debounceTime$.next(_filter);
  }

  ngOnInit(): void {
    this._subscription$ = this._debounceTime$
      .pipe(debounceTime(1000))
      .subscribe((result) => {
          this.fetchData(result?.trim());
      });
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

  fetchData(_keyWord: string) {
    const foundationId = 1;
    this.objFilter.pageIndex = 0;
    this.objFilter.pageSize = 10;
    this.objFilter.textSearch = _keyWord;
    this.objFilter.status = "1";

    this._warehouseManagementService.getListProducts(
      this.objFilter.name,
      this.objFilter.productCode,
      this.objFilter.brand,
      this.objFilter.status,
      this.objFilter.pageIndex,
      this.objFilter.pageSize,
      this.objFilter.sort,
      this.objFilter.sortBy,
      null,
      foundationId,
      this.objFilter.textSearch
    ).subscribe(
      (result) => {
        this.loading = false;
        this.listData = result['content'];
      }
    );
  }

}

@NgModule({
  declarations: [
    CustomAutocompleteComponent
  ],
  exports: [
    CustomAutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzAutocompleteModule,
    NgxMaskModule.forRoot({ validation: false }),
    NzToolTipModule
  ]
})
export class CustomAutocompleteModule { }
