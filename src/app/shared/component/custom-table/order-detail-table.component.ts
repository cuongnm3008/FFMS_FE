import { OrderDetailDto } from './../../service-proxies/warehouse-management-service';
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
  selector: 'order-detail-table',
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
    >
      <thead>
        <tr>
          <th class="w-50px text-center">#</th>
          <th class="min-w-100px text-center">Mã hóa đơn</th>
          <th class="min-w-150px text-center" nzColumnKey="unit">Tên khách hàng</th>
          <th class="min-w-100px text-center" nzColumnKey="orderDate" [nzSortFn]="true">Thời gian giao dịch</th>
          <th class="min-w-100px text-center">Thành tiền</th>
          <!-- <th class="min-w-100px text-center">Hình thức</th> -->
          <th class="min-w-150px text-center" >Tên nhân viên</th>
          <th class="min-w-100px text-center">Ghi chú</th>
          <th class="min-w-150px text-center">Tình trạng hóa đơn</th>
          <th class="min-w-125px text-center">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
        <td class="text-center"> {{((pageIndex - 1) * pageSize) + index + 1}}</td>
          <td class="">
          <span>{{ item.codeOrder}}</span>
          </td>
          <td class="text-center">
            <span>
              {{item.customerName ? item.customerName : "Khách lạ"}}
            </span>
          </td>
          <td class="text-center">{{item.orderDate | date: 'dd/MM/yyyy, hh:mm'}}</td>
          <td class="text-center">{{ item.totalPrice | mask: 'separator.0':',' }} VNĐ</td>
          <!-- <div *ngFor="let item1 of item.saleOrderDetails.count; index1 as index1"> -->
          <!-- </div> -->

        <!-- <td class="text-center">{{item.saleOrderDetails[0]['price']*item.saleOrderDetails[0]['amount']
           + item.saleOrderDetails[1]['price']*item.saleOrderDetails[1]['amount']
           | mask: 'separator.0':','}} VNĐ</td> -->
        <!-- <td class="text-center">{{ item.amountPaid}} VNĐ</td> -->
        <!-- <td class="text-center">{{ item.paymentName ? item.paymentName :"N/A"}}</td> -->
        <td class="text-center">{{ item.employeeName ? item.employeeName :"N/A"}}</td>
        <td class="text-center">{{ item.description ? item.description :"N/A"}}</td>
        <td class="text-center">
          <ng-container [ngSwitch]="item.status">
            <span *ngSwitchCase="0" class="badge badge-danger">Đơn hủy</span>
            <span *ngSwitchCase="1" class="badge badge-primary">Chờ lấy hàng</span>
            <span *ngSwitchCase="2" class="badge" style="background-color: #52C41A;">Đã thanh toán</span>
            <span *ngSwitchCase="3" class="badge bg-warning">Chờ thanh toán</span>
            </ng-container>
          </td>
        <td class="text-center">
          <i *ngIf="item.status == 1||item.status == 3" style="color: #519259;" nzTooltipTitle="Sửa hóa đơn" nz-tooltip class="fas fa-edit p-3"></i>
          <i style="color: #2192FF;" nzTooltipTitle="Xem hóa đơn" (click)="view.emit(item)" nz-tooltip class="fas fa-info-circle p-3"></i>
          <i *ngIf="item.status == 2" style="color: #2B4865;" nzTooltipTitle="In hóa đơn" (click)="viewPdf.emit(item)" nz-tooltip class="fa fa-print p-3"></i>
          <i *ngIf="item.status == 1" style="color: #519259;" nzTooltipTitle="Lấy hàng" (click)="editOrder.emit(item)" nz-tooltip class="far fa-check-square p-3"></i>
          <i *ngIf="item.status == 3" style="color: #52C41A;" nzTooltipTitle="Hoàn tất" (click)="payment.emit(item)" nz-tooltip class="fas fa-clipboard-list p-3"></i>
          <i *ngIf="item.status != 2&&item.status!= 0" style="color: #d9534f;" nzTooltipTitle="Hủy đơn" nz-tooltip class="fas fa-trash p-3"></i>
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
export class OrderDetailTableComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {

  }

  @Input() listData: OrderDetailDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() editOrder = new EventEmitter();

  @Output() confirmOrder = new EventEmitter();

  @Output() payment = new EventEmitter();

  @Output() view = new EventEmitter();

  @Output() viewPdf = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Input() total;
  @Input() loading = true;
  pageSize = 10;
  pageIndex = 1;

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params['pageIndex'];
    this.onChange.emit(params);
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    OrderDetailTableComponent
  ],
  exports: [
    OrderDetailTableComponent
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
export class OrderDetailTableModule { }
