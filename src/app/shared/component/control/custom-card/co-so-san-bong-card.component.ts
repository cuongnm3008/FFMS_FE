import { CoSoSanBongDto, TRANG_THAI_CO_SO_SAN_BONG } from './../../../service-proxies/system-management-service';
import { SanBongModalComponent } from './../../../../routers/pages/ffms/ccvc-trong-san-bong/san-bong/san-bong-modal/san-bong-modal.component';
import { CommonModule } from '@angular/common';
import { Component, Injector, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { AddOrEditCoSoSanBongComponent } from 'src/app/routers/pages/ffms/ccvc-trong-san-bong/co-so-modal/add-or-edit.component';
@Component({
  selector: 'co-so-san-bong-card',
  template: `
  <div class="card-item">
  <nz-card style="width:380px; margin: 15px;" [nzTitle]="sModel.foundationCode" [nzExtra]="extraTemplate">
    <div [hidden]="isView" >
      <div class="d-flex">
        <div class="">
            <p class="mb-5"><b>Tên cơ sở: </b>{{sModel.name}}</p>
            <p class="mb-5"><b>Địa chỉ: </b>{{sModel.address}}</p>
            <p class="mb-5"><b>Mô tả: </b>{{sModel?.description}}</p>
        </div>
        <div >
          <img style="width: 100px; object-fit: cover; height: 100px; border-radius: 8px;" src="../../../../assets/images/ffms.png" alt="">
        </div>
      </div>
        <div class="d-flex justify-content-between">
          <div class="mt-3 w-100">
            <ng-container [ngSwitch]="sModel.status">
                 <span *ngSwitchCase="TRANG_THAI_CO_SO_SAN_BONG.HOAT_DONG" class="badge badge-success w-50 p-3">Hoạt động</span>
                 <span *ngSwitchCase="TRANG_THAI_CO_SO_SAN_BONG.DUNG_HOAT_DONG" class="badge badge-danger w-50 p-3">Dừng hoạt động</span>
                <span *ngSwitchCase="TRANG_THAI_CO_SO_SAN_BONG.BAO_TRI" class="badge badge-warning w-50 p-3">Bảo trì</span>
            </ng-container>
            <!-- <ng-container>
                 <img (click)="viewDetail()" href="javascript:;" style="width: 30px; object-fit: cover; height: 30px; border-radius: 8px; margin-left:85px" src="../../../../assets/images/warning.png" alt="">
               <a (click)="viewDetailWithSanBong()" href="javascript:;" class="btn btn-sm btn-warning ml-5">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
              </a>
            </ng-container> -->
          </div>
          <!-- <div *ngIf="sModel.lstFootballFields.length > 0">
            <a (click)="isView = true" href="javascript:;" style="z-index : 1000;" class="btn btn-sm btn-warning">
                <i class="fas fa-exclamation-triangle">Sân bóng có vấn đề</i>

            </a>
          </div> -->
        </div>
        </div>
        <div [hidden]="!isView" class="h-105px">
          <table class="table">
                  <tr>
                  <th>TÊN SÂN BÓNG</th>
                  <th>TÌNH TRẠNG</th>
                  </tr>
                  <!-- <tr *ngFor="let item of sModel.lstFootballFields; index as index">
                    <td (click)="viewDetailSanBongBaoTri(item.id)" href="javascript:;">{{item.name}}</td>
                    <td>{{item.description}}</td>
                  </tr> -->
              </table>
            <a (click)="isView = false" href="javascript:;"  class="btn btn-sm btn-primary">
              <i class="fas fa-backward"></i> Trở lai
            </a>
        </div>
      </nz-card>
       <ng-template #extraTemplate>
          <a (click)="addOrEditModal(sModel)" href="javascript:;" style="z-index : 1000; margin-right:10px;" class="btn btn-sm">
            <i class="far fa-edit"></i> Sửa
          </a>
          <a (click)="viewDetail(sModel.id)" href="javascript:;" style="z-index : 1000;" class="btn btn-sm">
            <i class="far fa-eye"></i> Vào sân
          </a>
      </ng-template>
  </div>

  `,
  styles: [
    `
      p {
        margin: 0;
      }

      .card-item{
        cursor: pointer;
      }
      .state {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        clear: both;
      }
    `
  ]
})
export class CoSoSanBongCardComponent extends AppComponentBase {

  TRANG_THAI_CO_SO_SAN_BONG = TRANG_THAI_CO_SO_SAN_BONG;
  @Input() sModel = new CoSoSanBongDto();

  isView : boolean = false;
  constructor(
    private _modalService: NzModalService,
    private _systemManagementService: SystemManagementService,
    private _router: Router,
    injector: Injector,

  ) {
    super(injector);
  }

  addOrEditModal(_dataItem?: CoSoSanBongDto) {
    const _modal = this._modalService.create({
      nzTitle: _dataItem ? 'Sửa' : 'Thêm mới ' + "cơ sở sân bóng",
      nzContent: AddOrEditCoSoSanBongComponent,
      nzWidth: window.innerWidth > 800 ? 600 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new CoSoSanBongDto(),
      }
    });

    _modal.afterClose.subscribe((result) => {

    });
  }

  viewDetail(id: any) {
    this._router.navigate(['/co-so-detail', id]);

  }
  viewDetailWithSanBong() {
    this._router.navigate(['/vat-chat']);
  }
  viewDetailSanBongBaoTri(id: any){
    this._router.navigate(['/vat-chat', id]);
  }
}


@NgModule({
  declarations: [
    CoSoSanBongCardComponent
  ],
  exports: [
    CoSoSanBongCardComponent
  ],
  imports: [
    CommonModule,
    NzCardModule
  ]
})
export class CoSoSanBongCardModule { }
