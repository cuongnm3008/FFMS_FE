import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { AppButtonActionModule } from '../control/button/button-action';
// import { AppButtonIconModule } from '../control/button/button-icon';
import { ProductDto } from '../../service-proxies/system-management-service';
import { Router } from '@angular/router';
import { AppButtonActionModule } from 'src/app/shared/component/control/button/button-action';
import { AppButtonIconModule } from 'src/app/shared/component/control/button/button-icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


@Component({
  selector: 'supplier-table',
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
          <th class="min-w-120px text-center">Nhà cung cấp</th>
          <th class="min-w-120px text-center">Địa chỉ</th>
          <th class="min-w-120px text-center" nzColumnKey="phone">Số điện thoại</th>
          <th class="min-w-100px text-center" nzColumnKey="">Email</th>
          <th class="min-w-100px text-center" nzColumnKey="">Tình trạng</th>
          <th class="min-w-100px text-center">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
          <td class="text-center">
             <!-- {{pageIndex * pageSize + index + 1}} -->
             <!-- {{(index + 1) + ((item.offset) * item.limit)}} -->
            {{index + 1 + (item.pageSize * item.pageIndex)}}
            </td>
          <td (onClick)="viewDetail.emit(item)">
            {{item.name}}
          </td>
          <td class="">
           {{item.address ? item.address : 'N/A'}}
          </td>
          <td class="text-center">
            <span>
              {{item.phone}}
            </span>
          </td>
          <td class="">
            <span>
              {{item.email ? item.email : 'N/A'}}
            </span>
          </td>
          <td class="text-center">
          <span *ngIf="item.status == 1; else other_content " class="badge" style="background-color: #52C41A;">Hợp tác</span>
            <ng-template #other_content>
              <span class="badge badge-danger">Dừng hợp tác</span>
            </ng-template>
          </td>
          <td class="text-center">
            <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="view.emit(item)" nz-tooltip class="fa fa-info-circle p-3"></i>
            <i style="color: #519259;" nzTooltipTitle="Sửa" (click)="addOrEdit.emit(item)" nz-tooltip class="fas fa-edit p-3"></i>
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
export class SupplierTableComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {

  }

  @Input() isView: boolean;


  @Input() listData: ProductDto[] = [];

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

  productOverview(_dataItem : ProductDto){
    const _url = `/product-detail/${encodeURIComponent(_dataItem.id)}`;
    this._router.navigate(['/product-detail',_dataItem.id]);
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    SupplierTableComponent
  ],
  exports: [
    SupplierTableComponent
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
export class SupplierTableModule { }
