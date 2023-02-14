import { MaintainHistoryVatChatDto } from './../../../../../../shared/service-proxies/system-management-service';
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
  selector: 'maintain-history-table',
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
          <th class="min-w-150px text-center" nzColumnKey="name">Tên vật chất</th>
          <th class="min-w-150px text-center" nzColumnKey="footballName" [nzSortFn]="true">Tên sân bóng</th>
          <th class="min-w-50px text-center" nzColumnKey="brand">Số lượng sửa</th>
          <th class="min-w-150px text-center" nzColumnKey="brand">Chi phí sửa</th>
          <th class="min-w-200px text-center" nzColumnKey="finishDate" [nzSortFn]="true">Thời gian xử lý</th>
          <th class="min-w-150px text-center" nzColumnKey="note" >Mô tả tình trạng</th>
          <th class="min-w-50px text-center">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
          <td>
            <!-- {{pageIndex * pageSize + index + 1}} -->
                        {{index + 1 + (item.pageSize * item.pageIndex)}}
          </td>
          <td>
          <span>{{ item.name }}</span>
          </td>
          <td class="">{{item.footballFieldName}}</td>
          <td class="text-center">{{item.amount }} </td>
          <td class="text-center">{{item.price | mask: 'separator.0':','}} VNĐ</td>
          <td class="text-center">Từ {{item.timeToStart  | date: 'dd/MM/yyyy, hh:mm' }} đến {{ item.timeToEnd  | date: 'dd/MM/yyyy, hh:mm' }}</td>
          <td class="text-center">{{item.description ? item.description: "N/A" }}</td>
          <td class="text-center">
              <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="view.emit(item)" nz-tooltip class="fa fa-info-circle p-3"></i>
              <!-- <i style="color: #519259;" style="color: #519259;" nzTooltipTitle="Sửa" (click)="addOrEdit.emit(item)" nz-tooltip class="fas fa-edit p-3"></i>
              <i *ngIf="item.status == 1" style="color: #d9534f;" nzTooltipTitle="Xóa" nz-tooltip (click)="delete.emit(item)"  nz-tooltip class="fas fa-trash-alt p-3"></i> -->
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
export class MaintainHistoryTableComponent implements OnInit {
  constructor(
    private _router: Router,
  ) {

  }

  @Input() listData: MaintainHistoryVatChatDto[] = [];

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
    MaintainHistoryTableComponent
  ],
  exports: [
    MaintainHistoryTableComponent
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
export class MaintainHistoryTableModule { }
