import { ProductWarehouseDto } from 'src/app/shared/service-proxies/system-management-service';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppButtonActionModule } from '../control/button/button-action';
import { AppButtonIconModule } from '../control/button/button-icon';
import { NgxMaskModule } from 'ngx-mask';
import { QUALITY_STATUS, RETURN_STATUS } from '../../service-proxies/warehouse-management-service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
@Component({
  selector: 'do-an-warehouse-table',
  template: `
  <nz-table
      #fixedTable
      [nzScroll]="{ x: '1500px'}"
      nzShowSizeChanger
      [nzData]="listData"
      [nzFrontPagination]="false"
      [nzLoading]="loading"
      [nzTotal]="total"
      [nzPageSize]="pageSize"
      [nzPageIndex]="pageIndex"
      [nzPageSizeOptions] = "listPageSizeOptions"
      (nzQueryParams)="onQueryParamsChange($event)"
      [nzShowTotal]="totalTemplate"
    >
      <thead>
        <tr>
          <th class="w-50px text-center">#</th>
          <ng-container *ngIf="!isProductDetail">
            <th  class="text-center">Sản phẩm</th>
          </ng-container>
          <th class="w-150px text-center" nzColumnKey="importCouponCode">Mã nhập hàng</th>
          <th class="min-w-150px  text-center" nzColumnKey="supplier">Nhà cung cấp</th>
          <th class="w-100px  text-center" nzColumnKey="amount" [nzSortFn]="true">Số lượng</th>
          <th class="w-150px text-center" nzColumnKey="expriredDate" [nzSortFn]="true">Ngày nhập hàng</th>
          <th class="w-150px text-center" nzColumnKey="expriredDate" [nzSortFn]="true">Ngày hết hạn</th>
          <th class="w-200px text-center">Trạng thái chất lượng</th>
          <th class="w-150px text-center">Tình trạng đổi trả</th>
          <th nzRight class="w-125px text-center" nzColumnKey="action">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
        <td class="text-center"> {{((pageIndex - 1) * pageSize) + index + 1}}</td>
          <ng-container  *ngIf="!isProductDetail">
              <td>
                <span><span class="fw-bold">{{item.product.productCode}}</span>-{{ item.product.name }}</span>
              </td>
          </ng-container>
          <td style="overflow-wrap: anywhere;">
            <span>{{item.importCouponCode}}</span>
          </td>
          <td>{{item.supplier.name}}</td>
          <td class="text-center">{{ item.amount +" "+item.product.unitName}}</td>
          <td class="text-center">
            <span>{{ item.importDate  |  date: 'dd/MM/yyyy'}}</span>
          </td>
          <td class="text-center">
            <span>{{ item.expriredDate  | date: 'dd/MM/yyyy' }}</span>
          </td>
          <td class="text-center" style="padding: 5px 5px !important;">
          <ng-container [ngSwitch]="item.status">
            <span *ngSwitchCase="QUALITY_STATUS.SAP_HET_HAN" class="badge bg-warning">Sắp hết hạn</span>
            <span *ngSwitchCase="QUALITY_STATUS.HET_HAN" class="badge badge-danger">Hết hạn</span>
            <span *ngSwitchDefault class="badge"  style="background-color: #52C41A;">Bình thường</span>
            </ng-container>
          </td>
          <td class="text-center">
          <ng-container [ngSwitch]="item.returnStatus">
              <span *ngSwitchCase="RETURN_STATUS.HANG_NHAP_MOI" class="badge badge-primary">Hàng nhập mới</span>
              <span *ngSwitchCase="RETURN_STATUS.HANG_DA_DOI_TRA" class="badge badge-primary">Hàng đổi trả</span>
          </ng-container>
          </td>
          <td nzRight class="text-center">
            <div class="d-flex justify-content-around">
              <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="viewDetail.emit(item)" nz-tooltip class="fas fa-info-circle"></i>
              <i style="color: #519259;" nzTooltipTitle="Sửa" (click)="addOrEdit.emit(item)" nz-tooltip class="fas fa-edit"></i>
              <i *ngIf="item.returnStatus==RETURN_STATUS.HANG_DA_DOI_TRA && item.status != '3'" nzTooltipTitle="Đổi trả"  (click)="exchangeProduct.emit(item)"  nz-tooltip class="fas fa-paper-plane text-primary"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </nz-table>
    <ng-template #totalTemplate let-total>
      <span>Tổng số bản ghi :</span> {{total}}
    </ng-template>
  `
})
export class DoAnWarehouseTableComponent implements OnInit {
  constructor() {
  }
  RETURN_STATUS = RETURN_STATUS;
  QUALITY_STATUS = QUALITY_STATUS;

  listPageSizeOptions : number [] = [];

  @Input() listData: ProductWarehouseDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() addOrEdit = new EventEmitter();

  @Output() exchangeProduct = new EventEmitter();

  @Output() viewDetail = new EventEmitter();

  @Output() viewRefundHistory = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Input() isProductDetail : boolean;

  @Input() total;
  @Input() loading = true;
  pageSize = 10;
  pageIndex = 1;

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageSize = this.isProductDetail == true ? 5 : 10;
    this.pageIndex = params['pageIndex'];
    this.onChange.emit(params);
  }

  ngOnInit(): void {
    this.pageSize = this.isProductDetail == true ? 5 : 10;
    this.listPageSizeOptions = this.isProductDetail == true ? [5,10] : [5,10,20,30,40,50];
  }
}

@NgModule({
  declarations: [
    DoAnWarehouseTableComponent
  ],
  exports: [
    DoAnWarehouseTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    AppButtonActionModule,
    AppButtonIconModule,
    NzToolTipModule,
    NgxMaskModule.forRoot({ validation: false }),
  ],
})
export class DoAnWarehouseTableModule { }
