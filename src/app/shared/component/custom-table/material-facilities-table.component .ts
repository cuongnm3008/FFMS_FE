import { VatChatDto } from 'src/app/shared/service-proxies/system-management-service';
import { CoSoSanBongDto } from './../../service-proxies/system-management-service';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppButtonActionModule } from '../control/button/button-action';
import { AppButtonIconModule } from '../control/button/button-icon';
import { Router } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMaskModule } from 'ngx-mask';


@Component({
  selector: 'material-facilities-table',
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
          <th class="min-w-200px text-center" nzColumnKey="name">Tên vật chất</th>
          <th class="min-w-150px text-center" nzColumnKey="foundationCode" >Thời gian lắp đặt</th>
          <th class="min-w-100px text-center" nzColumnKey="address">Số lượng</th>
          <!-- <th class="min-w-150px" nzColumnKey="address" [nzSortFn]="true">Loại cơ sở vật chất</th> -->
          <th class="min-w-100px text-center" nzColumnKey="address">Số lượng bị hỏng</th>
          <th class="min-w-100px text-center" nzColumnKey="address">Mô tả tình trạng</th>
          <th class="min-w-150px text-center" nzColumnKey="status">Tình trạng vật chất</th>
          <th class="min-w-200px text-center">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
          <!-- <td> {{pageIndex * pageSize + index + 1}}</td> -->
        <!-- <td (onClick)="viewDetail.emit(item)" class="d-flex flex-row">

          </td> -->
              <td>
                <!-- {{pageIndex * pageSize + index + 1}} -->
               {{index + 1 + (item.pageSize * item.pageIndex)}}
              </td>
          <td >
            <span style="cursor: pointer;">
              {{item.name}}
               <span *ngIf="item.isSpecific == 1; " style="color: #1bc5bd;">
               - vật chất đặc biệt
            </span>
            </span>
          </td>
          <td>
            {{item.installationTime | date: 'dd/MM/yyyy'}}
          </td>
          <td class="text-center">{{item.amount ? item.amount: "N/A"}}</td>
          <!-- <td class="text-center">
            <span *ngIf="item.isSpecific == 1; else other_content_spe" class="badge badge-secondary">
                Cơ sở vật chất đặc biệt
            </span>
               <ng-template #other_content_spe>
              <span class="badge badge-primary"> Cơ sở vật chất bình thường</span>
            </ng-template>
          </td> -->
          <td class="text-center">{{item.repairAmount ? item.repairAmount: "0"}}</td>
          <td class="text-center">{{item.description ? item.description: "N/A"}}</td>
          <td class="text-center">
              <span class="text-success" *ngIf="item.status == 1">
           Hoạt động bình thường
            </span>
                <span class="text-red"*ngIf="item.status != 1">
             Có vấn đề cần sửa chữa
            </span>
              <!-- <span class="text-warning" *ngIf="item.VatChatSuCo != 0">
             Cần sửa: {{item.VatChatSuCo}}
            </span> -->
<!--
          <span *ngIf="item.status == 1; else other_content " class="badge badge-success">Hoạt động bình thường</span>
            <ng-template #other_content>
              <span class="badge badge-danger">Găp sự cố</span>
            </ng-template> -->
          </td>
          <td class="text-center">
              <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="view.emit(item)" nz-tooltip class="fa fa-info-circle p-3"></i>
              <i style="color: #8879B0;" nzTooltipTitle="Bảo trì" (click)="baoDuongModal.emit(item)" nz-tooltip class="fa fa-wrench p-3"></i>
              <i style="color: #519259;" nzTooltipTitle="Sửa thông tin" (click)="addOrEditModal.emit(item)" nz-tooltip class="fas fa-edit p-3"></i>
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
export class MaterialFacilitiesTableComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {

  }

  @Input() listData: VatChatDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() addOrEditModal = new EventEmitter();

  @Output() baoDuongModal = new EventEmitter();

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

  // productOverview(_dataItem : FootballFielDto){
  //   const _url = `/product-detail/${encodeURIComponent(_dataItem.id)}`;
  //   //window.open(_url, "_blank");
  //   this._router.navigate(['/product-detail',_dataItem.id]);
  // }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    MaterialFacilitiesTableComponent
  ],
  exports: [
    MaterialFacilitiesTableComponent
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
export class MaterialFacilitiesTableModule { }
