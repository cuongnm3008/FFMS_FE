
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { AppButtonActionModule } from 'src/app/shared/component/control/button/button-action';
import { AppButtonIconModule } from 'src/app/shared/component/control/button/button-icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'employee-table',
  template: `
  <ng-container *ngIf="listOfRandomUser">
    <nz-table
      nzShowSizeChanger
      [nzData]="listOfRandomUser"
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
          <th class="min-w-100px text-center" nzColumnKey="username" [nzSortFn]="true">Mã nhân viên</th>
          <th class="min-w-150px text-center" nzColumnKey="firstName" [nzSortFn]="true">Tên nhân viên</th>
          <!-- <th class="min-w-150px" nzColumnKey="foundationName">Cơ sở làm việc</th> -->
          <th class="min-w-100px text-center" nzColumnKey="gender" [nzSortFn]="true">Giới Tính</th>
          <th class="min-w-100px text-center" nzColumnKey="phone">Số điện thoại</th>
          <th class="min-w-150px text-center" nzColumnKey="role">Vai trò</th>
          <!-- <th nzColumnKey="createdDate" [nzSortFn]="true">Ngày làm việc</th> -->
          <th class="min-w-200px text-center">Tình trạng làm việc</th>
          <!-- <th class="min-w-150px" nzColumnKey="enable" [nzSortFn]="true" class="text-center">Tình trạng <br>làm việc</th> -->
          <th class="min-w-150px text-center">Thao Tác</th>
          <!-- <th class="min-w-100px text-center" nzColumnKey="action">Thao tác</th> -->
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let data of listOfRandomUser; index as index;">
          <tr>
            <td class="text-center">
              <!-- {{pageIndex * pageSize + index + 1}} -->
              {{index + 1 + (data.pageSize * data.pageIndex)}}
            </td>
            <td class="">{{ data.username }}</td>
            <td class="">{{ data.fullName }}</td>
            <!-- <td>{{ data.foundationName }}</td> -->
            <td  class="text-center">{{ (data.gender === "M") ? "Nam" : "Nữ" }}</td>
            <td class="text-center">{{ data.phones.length > 0 ? data.phones[0].phone : "" }}</td>
            <td class="">{{ data.role.length > 0 ? data.role[0].roleName : "" }}</td>
            <!-- <td>{{ data.createdDate | date: 'dd/MM/yyyy HH:mm' }}</td> -->
            <td class="text-center">
              <span *ngIf="data.enable === '1'; else other_content " class="badge" style="background-color: #38b332;">Đang làm việc</span>
              <ng-template #other_content>
                <span class="badge badge-danger">Đã nghỉ việc</span>
              </ng-template>
            </td>
            <td class="text-center">
                <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="viewDetail.emit(data)" nz-tooltip class="fa fa-info-circle p-3"></i>
                <i style="color: #519259;" nzTooltipTitle="Sửa" (click)="onEdit(index)" nz-tooltip class="fas fa-edit p-3"></i>
                <i style="color: #d9534f;" nzTooltipTitle="Xóa"  (click)="onDelete(data.id, data.username)"  nz-tooltip class="fas fa-trash-alt p-3"></i>
            </td>
             <!-- <td class="text-center d-flex justify-content-between">
                <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="viewDetail.emit(data)" nz-tooltip class="fa fa-info-circle p-3"></i>
                <i style="color: #519259;" nzTooltipTitle="Sửa" (click)="onEdit(index)" nz-tooltip class="fas fa-edit p-3"></i>
                <i style="color: #d9534f;" nzTooltipTitle="Xóa"  (click)="onDelete(data.id, data.username)"  nz-tooltip class="fas fa-trash-alt p-3"></i>
            </td> -->
          </tr>
        </ng-container>
      </tbody>
    </nz-table>
    <ng-template #totalTemplate let-total>
    <span>Tổng số bản ghi :</span> {{total}}
  </ng-template>
</ng-container>
  `
})
export class EmployeeTableComponent implements OnInit {

  @Input() listOfRandomUser : any = [];
  @Input() total;
  @Input() loading = false;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;


  @Output() onChange = new EventEmitter();
  @Output() onDeleteOut = new EventEmitter();
  @Output() onEditOut = new EventEmitter();
  @Output() viewDetail = new EventEmitter();

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.onChange.emit(params);
  }

  constructor() {}

  ngOnInit(): void {
  }

  onDelete(id : any, code : any){
    this.onDeleteOut.emit({'id' : id, 'code' : code});
  }

  onEdit(id : any){
    this.onEditOut.emit(this.listOfRandomUser[id]);
  }

  isNullOrUndefinedOrEmpty(data : any){
    return isNullOrUndefinedOrEmpty(data);
  }
}

@NgModule({
	declarations: [
		EmployeeTableComponent
	],
	exports: [
		EmployeeTableComponent
	],
	imports: [
		CommonModule,
		FormsModule,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
    AppButtonActionModule,
    AppButtonIconModule,
    NzToolTipModule
	]
})
export class EmployeeTableModule { }
