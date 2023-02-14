import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppButtonActionModule } from '../control/button/button-action';
import { AppButtonIconModule } from '../control/button/button-icon';
import { ImportProductDto, PackageTransactionHistoryDto } from '../../service-proxies/warehouse-management-service';
import { NgxMaskModule } from 'ngx-mask';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'import-transaction-history-table',
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
          <th class="text-center">#</th>
          <th  nzColumnKey="importCouponCode" class="text-center" [nzSortFn]="true">Mã nhập hàng</th>
          <th  nzColumnKey="supplierName"[nzSortFn]="true" class="min-w-150px text-center">Nhà cung cấp</th>
          <th  nzColumnKey="importDate" [nzSortFn]="true"class="text-center min-w-150px">Ngày nhập hàng</th>
          <th  nzColumnKey="description" class="text-center min-w-100px">Ghi chú</th>
          <th  nzColumnKey="totalPrice" class="text-center min-w-100px">Tổng tiền nhập hàng</th>
          <th  nzColumnKey="importName" class="text-center min-w-100px">Người nhập</th>
          <th  nzColumnKey="status" class="text-center min-w-100px">Tình trạng</th>
          <th  nzColumnKey="action" class="text-center min-w-200px">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
        <td class="text-center">{{index + 1 + (item.pageSize * item.pageIndex)}}</td>


          <td class="">
           <!-- <img style="with: 70px; object-fit: cover; height: 60px; border-radius: 8px;" src="../../../../assets/images/ffms.png" alt=""> -->
            {{item.importCouponCode}}
          </td>
          <td class="">{{item.supplierName}}</td>
          <td class="text-center">{{item.importDate | date: 'dd/MM/yyyy, hh:mm'}}</td>
          <td class="text-center">{{item.description ? item.description : "N/A"}}</td>
          <td class="text-center">{{item.totalPrice | mask: 'separator.0':','}} VNĐ</td>
          <td class="text-center">{{item.importName}}</td>
          <td class="text-center">
            <ng-container [ngSwitch]="item.status">
              <span *ngSwitchCase="1"
              class="badge" style="background-color: #52C41A;">Nhập hàng thành công</span>
            </ng-container>
          </td>
          <td class="text-center">
              <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="view.emit(item)" nz-tooltip class="fa fa-info-circle p-3"></i>
              <i style="color: #519259;" nzTooltipTitle="Sửa" (click)="editImport.emit(item)" nz-tooltip class="fas fa-edit p-3"></i>
              <i *ngIf="item.status == 1" style="color: #2B4865;" nzTooltipTitle="In hóa đơn" (click)="viewPdf.emit(item)" nz-tooltip class="fa fa-print p-3"></i>
              <i style="color: #d9534f;" nzTooltipTitle="Xóa"  (click)="delete.emit(item)"  nz-tooltip class="fas fa-trash-alt p-3"></i>
          </td>
        </tr>
      </tbody>
    </nz-table>
    <ng-template #totalTemplate let-total>
      <span>Tổng số bản ghi :</span> {{total}}
    </ng-template>
  `
})
export class ImportHistoryTableComponent implements OnInit {
  constructor() {

  }

  @Input() listData: ImportProductDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() addOrEdit = new EventEmitter();

  @Output() view = new EventEmitter();

  @Output() editImport = new EventEmitter();

  @Output() viewDetail = new EventEmitter();

  @Output() viewPdf = new EventEmitter();


  @Output() delete = new EventEmitter();

  @Input() total;
  @Input() loading = true;
  @Input() pageSize = 10;
  pageIndex = 0;

  onQueryParamsChange(params: NzTableQueryParams): void {
    // this.pageIndex = params['pageIndex'];
    this.onChange.emit(params);
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    ImportHistoryTableComponent
  ],
  exports: [
    ImportHistoryTableComponent
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
export class ImportHistoryTableModule { }
