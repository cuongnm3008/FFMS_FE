import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppButtonActionModule } from '../control/button/button-action';
import { AppButtonIconModule } from '../control/button/button-icon';
import { ImportProductDto, PackageTransactionHistoryDto } from '../../service-proxies/warehouse-management-service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'refund-history-table',
  template: `
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
    >
      <thead>
        <tr>
          <th>#</th>
          <th class="min-w-150px text-center" nzColumnKey="importCouponCode">Mã nhập hàng</th>
          <th nzColumnKey="supplierName" class="text-center min-w-150px">Nhà cung cấp</th>
          <th  class="text-center min-w-150px">Tên sản phẩm</th>
          <th nzColumnKey="importName" class="text-center min-w-100px">Số lượng</th>
          <th nzColumnKey="importDate" class="text-center min-w-150px">Ngày đổi hàng</th>
          <th nzColumnKey="totalPrice" class="text-center min-w-150px">Tình trạng đổi trả</th>
          <th nzColumnKey="action" class="text-center min-w-50px">Xem lịch sử</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
          <td class="text-center">
            {{index + 1 + (item.pageSize * item.pageIndex)}}
          </td>
          <td class="">
           <!-- <img style="with: 70px; object-fit: cover; height: 60px; border-radius: 8px;" src="../../../../assets/images/ffms.png" alt=""> -->
            {{item.importCouponCode}}
          </td>
          <td class="">{{item.supplier}}</td>
          <td class="">{{item.productName}}</td>
          <td class="text-center">{{item.amount}}</td>
          <td class="text-center">{{item.importDate | date: 'dd/MM/yyyy, hh:mm'}}</td>
          <!-- <td class="text-center">{{item.description ? item.description : "N/A"}}</td> -->
          <td class="text-center">
            <ng-container [ngSwitch]="item.status">
              <span *ngSwitchCase="3"
              class="badge" style="background-color: #52C41A;">Đổi trả thành công</span>
                <span *ngSwitchCase="0"
              class="badge bg-danger">Đổi trả thất bại</span>
            </ng-container>
          </td>
          <td class="text-center">
              <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="view.emit(item)" nz-tooltip class="fa fa-info-circle p-3"></i>
          </td>
        </tr>
      </tbody>
    </nz-table>
    <ng-template #totalTemplate let-total>
      <span>Tổng số bản ghi :</span> {{total}}
    </ng-template>
  `
})
export class RefundHistoryTableComponent implements OnInit {
  constructor() {

  }

  @Input() listData: ImportProductDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() addOrEdit = new EventEmitter();

  @Output() view = new EventEmitter();

  @Output() viewDetail = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Input() total;
  @Input() loading = true;
  @Input() pageSize = 10;
  @Input() pageIndex = 1;

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.onChange.emit(params);
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    RefundHistoryTableComponent
  ],
  exports: [
    RefundHistoryTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    AppButtonActionModule,
    AppButtonIconModule,
    NzToolTipModule,

  ]
})
export class RefundHistoryTableModule { }
