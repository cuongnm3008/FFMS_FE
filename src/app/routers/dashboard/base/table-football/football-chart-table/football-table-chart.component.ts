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
  selector: 'football-chart-table',
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
          <th class="min-w-150px text-center">Tên sân</th>
          <th class="min-w-100px text-center">Tình trạng</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
          <td>
            <!-- {{pageIndex * pageSize + index + 1}} -->
          {{index + 1 + (item.pageSize * item.pageIndex)}}
          </td>
                  <td class="text-center">
                      <a href="/vat-chat/{{item.id}}"  class="text-dark-75" style="cursor: pointer;font-weight: 500;">
                {{item.name}}&nbsp;
                    <i class="fas fa-exclamation-triangle text-warning"></i></a>
                </td>
                  <td class="min-w-200px text-center">
                    <span *ngIf="item.VatchatUuTienSuco != 0" class="text-danger">
                     Ưu tiên sửa {{item.VatchatUuTienSuco}}
                    </span>
                    <span *ngIf="item.VatChatSuCo != 0" class="text-warning">
                      Cần sửa: {{item.VatChatSuCo}}
                    </span>
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
export class FootballChartTableComponent implements OnInit {
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
  pageSize = 10;
  pageIndex = 0;

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.onChange.emit(params);
  }


  ngOnInit(): void {
  }
}

@NgModule({
  declarations: [
    FootballChartTableComponent
  ],
  exports: [
    FootballChartTableComponent
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
export class FootballChartTableModule { }
