import { BookingHistoryInputDto } from './../../../../../../shared/service-proxies/booking-service';
import { BookingDto } from 'src/app/shared/service-proxies/booking-service';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { AppButtonActionModule } from 'src/app/shared/component/control/button/button-action';
import { AppButtonIconModule } from 'src/app/shared/component/control/button/button-icon';


@Component({
  selector: 'booking-history-table',
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
          <th class="w-50px">#</th>
          <th class="min-w-200px text-center" nzColumnKey="name">Tên khách hàng</th>
          <th class="min-w-100px text-center" nzColumnKey="productCode">Tên sân bóng</th>
          <th class="min-w-100px text-center" nzColumnKey="unit">Ca đặt lịch</th>
          <th class="min-w-100px text-center" nzColumnKey="datePicker" [nzSortFn]="true">Ngày đặt lịch</th>
          <th class="min-w-150px text-center" nzColumnKey="brand">Tiền cọc</th>
          <th class="min-w-100px text-center" nzColumnKey="cancelDate" [nzSortFn]="true">Ngày huỷ lịch</th>
          <th class="min-w-150px text-center" nzColumnKey="brand">Tiền hoàn</th>
          <th class="min-w-150px text-center" nzColumnKey="brand" >Trạng thái</th>
          <th class="min-w-100px text-center">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
          <td>
            <!-- {{pageIndex * pageSize + index + 1}} -->
          {{index + 1 + (item.pageSize * item.pageIndex)}}
          </td>
          <td>
          {{ item?.customer?.fullName ? item?.customer?.fullName: "Khách lạ" }}
          </td>
          <td class="">{{item?.footballField?.name ? item?.footballField?.name : "N/A"}}</td>
          <td class="text-center">{{item.slot ? item.slot : "N/A" }}</td>
          <td class="text-center">{{item.datePicker | date: 'dd/MM/yyyy, hh:mm'}}</td>

          <td class="text-center">{{item.deposit | mask: 'separator.0':','}} VNĐ</td>
          <td  *ngIf="!item.cancelDate" class="text-center">N/A</td>
          <td  *ngIf="item.cancelDate" class="text-center">{{item.cancelDate | date: 'dd/MM/yyyy, hh:mm'}}</td>
           <td *ngIf="!item.returnPrice" class="text-center">0 VNĐ</td>
          <td *ngIf="item.returnPrice" class="text-center">{{item.returnPrice | mask: 'separator.0':','}} VNĐ</td>
          <!-- <td class="">{{item.address ? item.address : "N/A"}}</td> -->
          <td class="text-center">
          <span *ngIf="item.status == 0" class="badge badge-danger text-center">Huỷ lịch sân</span>
           <span *ngIf="item.status == 1" class="badge badge-warning text-center">Đã cọc sân</span>
            <span *ngIf="item.status == 2" class="badge text-center" style="background-color: #52C41A;">Đã thanh toán</span>
            <!-- <ng-template #other_content>
              <span class="badge badge-danger">Khách hàng không còn liên hệ</span>
            </ng-template> -->
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

  </ng-container>
  `
})
export class BookingHistoryTableComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {

  }

  @Input() listData: BookingHistoryInputDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() addOrEdit = new EventEmitter();

  @Output() view = new EventEmitter();

  @Output() viewDetail = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Input() total;
  @Input() loading = true;
  pageSize = 10;
  pageIndex = 0;

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.onChange.emit(params);
  }

  // productOverview(_dataItem : ProductDto){
  //   const _url = `/product-detail/${encodeURIComponent(_dataItem.id)}`;
  //   //window.open(_url, "_blank");
  //   this._router.navigate(['/product-detail',_dataItem.id]);
  // }

  // productWarehouseview(_dataItem : ProductDto){
  //   const _url = `/warehouse-information/${encodeURIComponent(_dataItem.id)}`;
  //   window.open(_url, "_blank");
  //   //  this._router.navigate(['/warehouse-information',_dataItem.id]);
  // }

  // importProduct(_dataItem : ProductDto){
  //   const _url = `/warehouse-information/${encodeURIComponent(_dataItem.id)}/import`;
  //   window.open(_url, "_blank");
  //   // this._router.navigate(['/warehouse-information',_dataItem.id]);
  // }


  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    BookingHistoryTableComponent
  ],
  exports: [
BookingHistoryTableComponent  ],
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
export class BookingHistoryTableModule { }
