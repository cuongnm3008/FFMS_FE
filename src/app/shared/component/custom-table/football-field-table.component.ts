import { VatChatDto } from 'src/app/shared/service-proxies/system-management-service';
import { FootballFielDto } from './../../service-proxies/system-management-service';
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
  selector: 'footballField-table',
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
          <th class="min-w-150px text-center" nzColumnKey="name" [nzSortFn]="true">Tên sân bóng</th>
          <th class="min-w-200px text-center" nzColumnKey="foundationName">Tên cơ sở</th>
          <th class="min-w-150px text-center" nzColumnKey="type" >Kiểu sân</th>
          <th class="min-w-150px text-center" nzColumnKey="startDate" [nzSortFn]="true">Ngày hoạt động</th>
           <th class="min-w-150px text-center" nzColumnKey="type" >Tình trạng vật chất</th>
          <!-- <th class="min-w-150px text-center" nzColumnKey="status" >Trạng thái</th> -->
          <th class="min-w-150px text-center">Thao Tác</th>
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
            <span (click)="materialOverview(item)" style="cursor: pointer;">
              {{item.name}}
            </span>
          </td>
          <td>
            <span>
              {{item.foundationName}}
            </span>
          </td>
          <td class="text-center">
            <span *ngIf="item.type == 1"class=" badge badge-primary">Sân 5</span>
            <span *ngIf="item.type == 2"class=" badge badge-primary">Sân 7</span>
            <span *ngIf="item.type == 3"class=" badge badge-primary">Sân 11</span>
          </td>
          <td class="text-center">{{item.startDate | date: 'dd/MM/yyyy'}}</td>
          <!-- <td class="text-center">
          <span *ngIf="item.status == 1; else other_content " class="badge badge-success">Hoạt động bình thường</span>
            <ng-template #other_content>
              <span class="badge badge-danger">Có vấn đề</span>
            </ng-template>
          </td> -->
          <td class="text-center">
            <span class="text-red" *ngIf="item.VatchatUuTienSuco != 0">
              Ưu tiên sửa: {{item.VatchatUuTienSuco}},
            </span>
              <span class="text-warning" *ngIf="item.VatChatSuCo != 0">
             Cần sửa: {{item.VatChatSuCo}}
            </span>
            <label class="text-success">
            Tổng số: {{item.TongVatChat}}
            </label>
          </td>
          <td class="text-center">
              <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="viewDetail.emit(item)" nz-tooltip class="fa fa-info-circle p-3"></i>
              <i style="color: #8879B0;" nzTooltipTitle="Vật chất sân bóng" (click)="materialOverview(item)" nz-tooltip class="fa-solid fa-file-csv p-3"></i>
              <i style="color: #519259;" nzTooltipTitle="Sửa" (click)="addOrEdit.emit(item)" nz-tooltip class="fas fa-edit p-3"></i>
              <i style="color: #d9534f;" nzTooltipTitle="Xoá"  (click)="delete.emit(item)"  nz-tooltip class="fas fa-trash-alt p-3"></i>
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
export class FootballFieldTableComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {

  }

  @Input() listData: FootballFielDto[] = [];

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

  materialOverview(_dataItem : VatChatDto){
    const _url = `/vat-chat/${encodeURIComponent(_dataItem.id)}`;
    //window.open(_url, "_blank");
    this._router.navigate(['/vat-chat',_dataItem.id]);
  }

  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    FootballFieldTableComponent
  ],
  exports: [
    FootballFieldTableComponent
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
export class FootballFieldTableModule { }
