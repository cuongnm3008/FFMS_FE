import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppButtonActionModule } from '../control/button/button-action';
import { AppButtonIconModule } from '../control/button/button-icon';
import { ProductDto } from '../../service-proxies/system-management-service';
import { Router } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMaskModule } from 'ngx-mask';


@Component({
  selector: 'product-table',
  template: `
  <ng-container *ngIf="listData">
  <nz-table
      nzShowSizeChanger
      [nzData]="listData"
      [nzFrontPagination]="false"
      [nzLoading]="loading"
      [nzTotal]="total"
      [nzPageSize]="pageSize"
      [nzPageIndex]="pageIndex"
      (nzQueryParams)="onQueryParamsChange($event)"
      [nzShowTotal]="totalTemplate"
      [nzPageSizeOptions] = "listPageSizeOptions"
    >
      <thead>
        <tr>
          <th class="w-50px  text-center">#</th>
          <th class="min-w-100px  text-center" nzColumnKey="name">Sản phẩm</th>
          <th class="min-w-100x  text-center" nzColumnKey="productCode" [nzSortFn]="true">Mã sản phẩm</th>
          <th class="min-w-150px text-center" nzColumnKey="brand">Thương hiệu</th>
          <th class="min-w-100px text-center" nzColumnKey="unit" [nzSortFn]="true">Số lượng</th>
          <th class="min-w-100px text-center" nzColumnKey="price" [nzSortFn]="true">Giá bán</th>
          <th class="min-w-100px text-center" nzColumnKey="description" [nzSortFn]="true">Mô tả sản phẩm</th>
          <th class="min-w-200px text-center" nzColumnKey="brand" >Trạng thái</th>
          <th class="min-w-150px text-center">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
          <td class="text-center"> {{((pageIndex - 1) * pageSize) + index + 1}}</td>
          <td>
          <span>{{ item.name }}</span>
          </td>
          <td >
            <span>
              {{item.productCode}}
            </span>
          </td>
          <td class="text-center">{{item.brand}}</td>
          <td class="text-center">{{item.totalAmount}} {{item.unitName}}</td>
          <td class="text-center">{{item.price | mask: 'separator.0':','}} VNĐ</td>
          <td class="text-center">{{(item.description) ? item.description : 'N/A'}} </td>
          <td class="text-center">
          <span *ngIf="item.status == 1; else other_content " class="badge" style="background-color: #38b332;">Đang kinh doanh</span>
            <ng-template #other_content>
              <span class="badge badge-danger">Không kinh doanh</span>
            </ng-template>
          </td>
          <td class="text-center">
              <!-- <i style="color: #3699ff;" nzTooltipTitle="Nhập sản phẩm" (click)="importProduct(item)" nz-tooltip class="fas fa-file-import p-3"></i> -->
              <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="productOverview(item)" nz-tooltip class="fa fa-info-circle p-3"></i>
              <i *ngIf="item.status == 1" style="color: #519259;" nzTooltipTitle="Sửa" (click)="addOrEdit.emit(item)" nz-tooltip class="fas fa-edit p-3"></i>
              <i *ngIf="item.status == 1" style="color: #d9534f;" nzTooltipTitle="Xóa"  (click)="delete.emit(item)"  nz-tooltip class="fas fa-trash-alt p-3"></i>
          </td>
        </tr>
      </tbody>
    </nz-table>
    <ng-template #totalTemplate let-total>
      <span>Tổng số bản ghi :</span> {{total}}
    </ng-template>

  </ng-container>
  `
})
export class ProductTableComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {

  }
  listPageSizeOptions : number [] = [];

  @Input() listData: ProductDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() addOrEdit = new EventEmitter();

  @Output() view = new EventEmitter();

  @Output() viewDetail = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Input() total;
  @Input() loading = true;
  pageSize = 10 ;
  pageIndex = 1;

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageSize = params['pageSize'] ;
    this.pageIndex = params['pageIndex'];
    this.onChange.emit(params);
  }

  productOverview(_dataItem : ProductDto){
    const _url = `/product-detail/${encodeURIComponent(_dataItem.id)}`;
    //window.open(_url, "_blank");
    this._router.navigate(['/product-detail',_dataItem.id]);
  }

  productWarehouseview(_dataItem : ProductDto){
    const _url = `/warehouse-information/${encodeURIComponent(_dataItem.id)}`;
    window.open(_url, "_blank");
    //  this._router.navigate(['/warehouse-information',_dataItem.id]);
  }

  importProduct(_dataItem : ProductDto){
    const _url = `/warehouse-information/${encodeURIComponent(_dataItem.id)}/import`;
    window.open(_url, "_blank");
    // this._router.navigate(['/warehouse-information',_dataItem.id]);
  }


  ngOnInit(): void {
    this.listPageSizeOptions = [5,10,20,30,40,50];
  }
}

@NgModule({
  declarations: [
    ProductTableComponent
  ],
  exports: [
    ProductTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    AppButtonActionModule,
    AppButtonIconModule,
    NzToolTipModule,
    NgxMaskModule.forRoot({ validation: false }),

  ]
})
export class ProductTableModule { }
