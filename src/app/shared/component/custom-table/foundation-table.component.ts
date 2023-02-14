import { CoSoSanBongDto, FootballFielDto } from './../../service-proxies/system-management-service';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppButtonActionModule } from '../control/button/button-action';
import { AppButtonIconModule } from '../control/button/button-icon';
import { Router } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { ProductDto } from '../../service-proxies/system-management-service';

@Component({
  selector: 'foundation-table',
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
          <th class="min-w-200px text-center" nzColumnKey="name" [nzSortFn]="true">Tên cơ sở</th>
          <th class="min-w-150px text-center" nzColumnKey="foundationCode" >Mã cơ sở</th>
          <th class="min-w-100px" nzColumnKey="address" [nzSortFn]="true">Số sân có sự cố</th>
          <th class="min-w-150px" nzColumnKey="address" [nzSortFn]="true">Địa chỉ</th>
          <th class="min-w-150px text-center" nzColumnKey="status" >Trạng thái</th>
          <th class="min-w-150px text-center">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
          <!-- <td> {{pageIndex * pageSize + index + 1}}</td> -->
        <!-- <td (onClick)="viewDetail.emit(item)" class="d-flex flex-row">

          </td> -->
              <td> {{pageIndex * pageSize + index + 1}}</td>
          <td >
            <span style="cursor: pointer;">
              {{item.name}}
            </span>
          </td>
          <td>
            {{item.foundationCode}}
          </td>
             <td class="text-center">
              <!-- <span class="text-primary">
                Tổng số sân: 10
              </span> -->
            <!-- {{item.foundationCode}} -->
            <span class="text-warning">
             {{item.SoSanTrucTrac}} sân trục trặc
            </span>
            <label class="text-success">
            / {{item.TongSoSan}} sân
            </label>
                        <!-- {{item.foundationCode}} -->
          </td>
          <td>
             {{item.address.addressDetail}}, {{item.percinct}}, {{item.district}}, {{item.province}}
          </td>
          <td class="text-center">
          <span *ngIf="item.status == 1" class="badge badge-success">Đang kinh doanh</span>
          <span *ngIf="item.status == 2 " class="badge badge-danger">Ngừng kinh doanh</span>
          <span *ngIf="item.status == 3 " class="badge badge-warning">Bảo trì</span>
        </td>

          <td class="text-center">
              <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="viewDetail.emit(item)" nz-tooltip class="fa fa-info-circle p-3"></i>
              <i style="color: #519259;" nzTooltipTitle="Xem sân bóng" (click)="footballFieldOverview(item)" nz-tooltip class="fa fa-sign-in p-3"></i>
              <i style="color: #519259;" nzTooltipTitle="Sửa" (click)="addOrEditModal.emit(item)" nz-tooltip class="fas fa-edit p-3"></i>
              <i style="color: #d9534f;" nzTooltipTitle="Xóa"  (click)="delete.emit(item)"  nz-tooltip class="fas fa-trash-alt p-3"></i>
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
export class FoundationTableComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {

  }

  @Input() listData: CoSoSanBongDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() addOrEditModal = new EventEmitter();

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

  footballFieldOverview(_dataItem : FootballFielDto){
    const _url = `/co-so-detail/${encodeURIComponent(_dataItem.id)}`;
    //window.open(_url, "_blank");
    this._router.navigate(['/co-so-detail',_dataItem.id]);
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    FoundationTableComponent
  ],
  exports: [
    FoundationTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    AppButtonActionModule,
    AppButtonIconModule,
    NzToolTipModule

  ]
})
export class FoundationTableModule { }
