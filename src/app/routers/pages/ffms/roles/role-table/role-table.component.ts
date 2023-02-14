
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleService } from 'src/app/shared/services/role/role.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { AppButtonIconModule } from 'src/app/shared/component/control/button/button-icon';
import { AppButtonActionModule } from 'src/app/shared/component/control/button/button-action';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

@Component({
  selector: 'role-table',
  template: `
    <ng-container *ngIf="listOfRole">
    <nz-table
      nzShowSizeChanger
      [nzData]="listOfRole"
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
          <th class="min-w-100px" nzColumnKey="roleCode" [nzSortFn]="true" class="text-center">Mã vai trò</th>
          <th class="min-w-150px" nzColumnKey="roleName" [nzSortFn]="true" class="text-center">Tên vai trò</th>
          <th class="min-w-150px" nzColumnKey="createdDate" [nzSortFn]="true" class="text-center">Ngày tạo</th>
          <th class="min-w-150px" nzColumnKey="status" [nzSortFn]="true" class="text-center">Trạng thái</th>
          <th class="min-w-100px text-center">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of listOfRole; index as index;">
          <td class="text-center">{{(index + 1) + ((data.offset) * data.limit)}}</td>
          <td class="">{{ data.roleCode }}</td>
          <td class="">{{ data.roleName }}</td>
          <td class="text-center">{{ data.createdDate |  date: 'dd/MM/yyyy HH:mm'}}</td>
          <td class="text-center">
              <span *ngIf="data.status === '1'; else other_content " class="badge" style="background-color: #52C41A;">Hoạt Động</span>
              <ng-template #other_content>
                <span class="badge badge-danger">Không hoạt động</span>
              </ng-template>
          </td>

          <td class="text-center">
                <i style="color: #2192FF;" nzTooltipTitle="Xem chi tiết" (click)="viewDetail.emit(data.id)" nz-tooltip class="fa fa-info-circle p-3"></i>
                <i style="color: #519259;" nzTooltipTitle="Sửa" (click)="onEdit(data.id)" nz-tooltip class="fas fa-edit p-3"></i>
                <i *ngIf="data.status === '1'" style="color: #d9534f;" nzTooltipTitle="Xóa"  (click)="onDelete(data.id, data.roleCode)"  nz-tooltip class="fas fa-trash-alt p-3"></i>
          </td>
        </tr>
      </tbody>
    </nz-table>
     <ng-template #totalTemplate let-total>
    <span>Tổng số bản ghi :</span> {{total}}
  </ng-template>
</ng-container>
    <!-- <b>Tổng số bản ghi: {{total}}</b> -->
  `
})
export class RoleTableComponent implements OnInit {

  @Input() listOfRole : any = [];
  @Input() total;
  @Input() loading = false;
  @Input() pageSize = 10;
  @Input() pageIndex = 1;

  @Output() onChange = new EventEmitter();
  @Output() onDeleteOut = new EventEmitter();
  @Output() onEditOut = new EventEmitter();
  @Output() viewDetail = new EventEmitter();

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.onChange.emit(params);
  }

  constructor(private  _modalService: NzModalService,
    private _roleService : RoleService) {}

  ngOnInit(): void {
  }

  onDelete(id : any, code : any){
    if(code == "OWNER"){
      const modal = this._modalService.warning({
        nzTitle: 'Lưu ý',
        nzContent: 'Không thể xóa mã vai trò này',
      });
      setTimeout(() => modal.destroy(), 2000);
      return;
    }
    this.onDeleteOut.emit({'id' : id, 'code' : code});
  }
  onEdit(id : any){
   this.onEditOut.emit(id);
  }
}

@NgModule({
	declarations: [
		RoleTableComponent
	],
	exports: [
		RoleTableComponent
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
export class RoleTableModule { }
