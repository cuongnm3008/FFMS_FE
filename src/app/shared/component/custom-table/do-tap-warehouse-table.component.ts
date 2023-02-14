import { ProductWarehouseDto } from 'src/app/shared/service-proxies/system-management-service';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppButtonActionModule } from '../control/button/button-action';
import { AppButtonIconModule } from '../control/button/button-icon';
import { NgxMaskModule } from 'ngx-mask';
import { QUALITY_STATUS, RETURN_STATUS } from '../../service-proxies/warehouse-management-service';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


@Component({
  selector: 'do-tap-warehouse-table',
  template: `
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
          <ng-container *ngIf="!isProductDetail">
            <th  class="text-center min-w-150px">Sản phẩm</th>
          </ng-container>
          <th class="min-w-150px text-center" nzColumnKey="importCouponCode">Mã nhập hàng</th>
          <th class="min-w-150px text-center" nzColumnKey="consignmentName">Nhà cung cấp</th>
          <th class="min-w-100px text-center" nzColumnKey="price" [nzSortFn]="true" >Giá nhập</th>
          <th class="min-w-100px text-center" nzColumnKey="amount" [nzSortFn]="true">Số lượng</th>
          <!-- <th class="min-w-100px text-center" nzColumnKey="amount" [nzSortFn]="true">Tình trạng sản phẩm</th> -->
          <th class="min-w-150px text-center" nzColumnKey="action">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of listData; index as index">
        <td style="padding: 5px 5px !important;" class="text-center"> {{((pageIndex - 1) * pageSize) + index + 1}}</td>
          <ng-container  *ngIf="!isProductDetail">
              <td>
                <span><span class="fw-bold">{{item.product.productCode}}</span>-{{ item.product.name }}</span><br>
              </td>
          </ng-container>
          <td class="text-center" style="overflow-wrap: anywhere;">
            <span>{{item.importCouponCode}}</span>
          </td>
          <td class="text-center">{{item.supplier.name}}</td>
          <td class="text-center">{{ item.price | mask: 'separator.0':','}} đ</td>
          <td class="text-center">{{ item.amount +" "+item.product.unitName}}</td>
          <td class="text-center">
                <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="viewDetail.emit(item)" nz-tooltip class="fas fa-info-circle p-3"></i>
                <i style="color: #519259;" nzTooltipTitle="Sửa" (click)="addOrEdit.emit(item)" nz-tooltip class="fas fa-edit p-3"></i>
          </td>
        </tr>
      </tbody>
    </nz-table>
    <ng-template #totalTemplate let-total>
      <span>Tổng số bản ghi :</span> {{total}}
    </ng-template>

  `
})
export class DoTapWarehouseTableComponent implements OnInit {
  constructor() {

  }
  RETURN_STATUS = RETURN_STATUS;
  QUALITY_STATUS = QUALITY_STATUS;
  @Input() listData: ProductWarehouseDto[] = [];

  @Output() onChange = new EventEmitter();

  @Output() addOrEdit = new EventEmitter();

  @Output() exchangeProduct = new EventEmitter();

  @Output() viewDetail = new EventEmitter();

  @Output() viewRefundHistory = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Input() isProductDetail : boolean;

  @Input() total;
  @Input() loading = true;
  pageSize = 10;
  pageIndex = 1;

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.total = this.isProductDetail == true ? 5 : 10;
    this.pageSize = this.total;
    this.pageIndex = params['pageIndex'];
    this.onChange.emit(params);
  }

  ngOnInit(): void {
    this.total = this.isProductDetail == true ? 5 : 10;
    this.pageSize = this.total;
  }


  // doiTra(){
  //   AppMessageService.confirm("","Bạn có chắc muốn đổi trả lô hàng hay không",
  //   ()=>{
  //     // this._warehouseManagementService.deleteProduct(_dataItem).subscribe(
  //     //   ()=>{
  //     //     AppMessageService.success("Thêm xử lý thành công!","");
  //     //     this.loading = false;
  //     //     this.fetchData();
  //        }
  //     );
  //   }

}

@NgModule({
  declarations: [
    DoTapWarehouseTableComponent
  ],
  exports: [
    DoTapWarehouseTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    AppButtonActionModule,
    AppButtonIconModule,
    NzToolTipModule,
    NgxMaskModule.forRoot({ validation: false }),
  ],
})
export class DoTapWarehouseTableModule { }
