import { CustomerDto } from './../../../../../shared/service-proxies/system-management-service';
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
  selector: 'customer-table',
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
          <th class="min-w-150px text-center" nzColumnKey="name">Tên khách hàng</th>
          <th class="min-w-100px text-center" nzColumnKey="productCode">Mã khách hàng</th>
          <th class="min-w-100px text-center" nzColumnKey="unit">Số điện thoại</th>
          <th class="min-w-100px text-center" nzColumnKey="brand">Giới tính</th>
          <th class="min-w-150px text-center" nzColumnKey="brand">Địa chỉ</th>
          <th class="min-w-150px text-center" nzColumnKey="brand" >Kiểu khách hàng</th>
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
          <span>{{ item.fullName }}</span>
          </td>
          <td class="">{{item.customerCode}}</td>
          <td class="text-center">{{(item.phone) ? item.phone : 'N/A'}} </td>
          <td  class="text-center">{{ (item.gender === "M") ? "Nam" : "Nữ" }}</td>
          <td class="">{{item.address ? item.address : "N/A"}}</td>
          <td class="text-center">
          <span *ngIf="item.status == 1; else other_content " class="badge text-center" style="background-color: #52C41A;">Khách hàng đang liên hệ</span>
            <ng-template #other_content>
              <span class="badge badge-danger">Khách hàng không còn liên hệ</span>
            </ng-template>
          </td>
          <td class="text-center">
              <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="view.emit(item)" nz-tooltip class="fa fa-info-circle p-3"></i>
              <i style="color: #519259;" style="color: #519259;" nzTooltipTitle="Sửa" (click)="addOrEdit.emit(item)" nz-tooltip class="fas fa-edit p-3"></i>
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
export class CustomerTableComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {

  }

  @Input() listData: CustomerDto[] = [];

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
    CustomerTableComponent
  ],
  exports: [
    CustomerTableComponent
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
export class CustomerTableModule { }
