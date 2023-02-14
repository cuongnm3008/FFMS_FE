import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppButtonActionModule } from '../control/button/button-action';
import { AppButtonIconModule } from '../control/button/button-icon';
import { ProductTransactionHistoryDto } from '../../service-proxies/warehouse-management-service';
import { NgxMaskModule } from 'ngx-mask';

@Component({
  selector: 'import-export-history-table',
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
      [nzPageSizeOptions] = "listPageSizeOptions"
      [nzShowTotal]="totalTemplate"
    >
      <thead>
        <tr>
          <th>#</th>
          <th class="text-center" nzColumnKey="importCouponCode">Mã nhập hàng</th>
          <th class="text-center" nzColumnKey="unit"[nzSortFn]="true">Ngày giao dịch</th>
          <th nzColumnKey="supplier" class="text-center">Nhà cung cấp</th>
          <th nzColumnKey="amount" class="text-center">Số lượng</th>
          <th nzColumnKey="price" class="text-center">Giá sản phẩm</th>
          <th nzColumnKey="totalPrice" class="text-center">Thành tiền</th>
          <th nzColumnKey="importBy" class="text-center">Người nhập</th>
          <th nzColumnKey="status" class="text-center">Loại giao dịch</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
        <td class="text-center"> {{((pageIndex - 1) * pageSize) + index + 1}}</td>
          <td class="text-center">{{item.importCouponCode}}</td>
          <td class="text-center">{{item.importDate | date: 'dd/MM/yyyy'}}</td>
          <td class="text-center">{{item.supplier}}</td>
          <td class="text-center">{{item.amount}}</td>
          <td class="text-center">{{ item.price | mask: 'separator.0':','}} đ</td>
          <td class="text-center">{{ item.totalPrice | mask: 'separator.0':','}} đ</td>
          <td class="text-center">{{item.importByFirtsName}} {{item.importByLastName}}</td>
          <td class="text-center">
          <ng-container [ngSwitch]="item.status">
              <span *ngSwitchCase="1" class="badge badge-success">Nhập hàng</span>
              <span *ngSwitchCase="2" class="badge" style="background-color: #7882A4;!important">Xuất hàng</span>
              <span *ngSwitchDefault style="background-color:#7F5283;" class="badge badge-danger">Đổi trả</span>
            </ng-container>
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
export class ImportExportHistoryTableComponent implements OnInit {
  constructor() {

  }

  listPageSizeOptions : number [] = [5, 10];

  @Input() listData: ProductTransactionHistoryDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() addOrEdit = new EventEmitter();

  @Output() view = new EventEmitter();

  @Output() viewDetail = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Input() total;
  @Input() loading = true;
  pageSize = 5;
  pageIndex = 1;

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params['pageIndex']);
    this.pageIndex = params['pageIndex'];
    this.onChange.emit(params);
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    ImportExportHistoryTableComponent
  ],
  exports: [
    ImportExportHistoryTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    AppButtonActionModule,
    AppButtonIconModule,
    NgxMaskModule
  ]
})
export class ImportExportHistoryTableModule { }
