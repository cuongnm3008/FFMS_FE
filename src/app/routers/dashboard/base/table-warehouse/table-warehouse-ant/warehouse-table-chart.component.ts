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
  selector: 'warehouse-table-chart',
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
          <th class="min-w-150px">Sản phẩm</th>
          <th class="min-w-100px">Nhà cung cấp</th>
          <th class="min-w-100px text-center">Số lượng</th>
          <th class="min-w-100px text-center">Ngày hết hạn</th>
          <th class="min-w-150px text-center">Trạng thái chất lượng</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
          <td>
            <!-- {{pageIndex * pageSize + index + 1}} -->
          {{index + 1 + (item.pageSize * item.pageIndex)}}
          </td>
          <td>{{ item.product.name }} </td>
                <td> {{item.supplier.name}}</td>
                <td class="text-center"> {{ item.amount +" "+item.product.unitName}}</td>
                <td class="text-center"> {{ item.expriredDate | date: 'dd/MM/yyyy' }} </td>
                <td class="text-center">
                  <span class="badge bg-warning">Sắp hết hạn</span>
                </td>
        </tr>
      </tbody>
    </nz-table>
    <ng-template #totalTemplate let-total>
      <!-- <span>Tổng số bản ghi :</span> {{total}} -->
    </ng-template>

  </ng-container>
  `
})
export class WarehouseChartTableComponent implements OnInit {
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
  @Input() loading = false;
  pageSize = 5;
  pageIndex = 0;

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.onChange.emit(params);
  }


  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    WarehouseChartTableComponent
  ],
  exports: [
    WarehouseChartTableComponent
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
export class WarehouseChartTableModule { }
