import { SanBongModalComponent } from './../../../../routers/pages/ffms/ccvc-trong-san-bong/san-bong/san-bong-modal/san-bong-modal.component';
import { CommonModule } from '@angular/common';
import { Component, Injector, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { FootballFielDto, SystemManagementService, TRANG_THAI_CO_SO_SAN_BONG } from 'src/app/shared/service-proxies/system-management-service';
@Component({
  selector: 'san-bong-card',
  template: `
   <div class="card-item">
    <nz-card class="m-10 text-uppercase" style="width:300px; border: 1px solid #202020; height:280px;"[nzTitle]="sModel.name" [nzExtra]="extraTemplate">
    <div  [hidden]="isView">
       <div (click)="viewDetail()">
        <div class="justify-content-center">
          <img style="width: 250px; object-fit: cover; height: 100px; border-radius: 8px;" src="../../../../assets/images/sanbong7.png" alt="sân bóng">
        </div>
        <div class="p-1">
          <p>Giá sân: {{sModel.price | number}} VNĐ</p>
          <p>Tình trạng:</p>
        </div>
        <div class="">
        <ng-container [ngSwitch]="sModel.status">
               <span *ngSwitchCase="TRANG_THAI_CO_SO_SAN_BONG.HOAT_DONG" class="badge badge-success w-50 p-3">Hoạt động</span>
               <span *ngSwitchCase="TRANG_THAI_CO_SO_SAN_BONG.DUNG_HOAT_DONG" class="badge badge-danger w-50 p-3">Dừng hoạt động</span>
              <span *ngSwitchCase="TRANG_THAI_CO_SO_SAN_BONG.BAO_TRI" class="badge badge-warning w-50 p-3">Bảo trì</span>
          </ng-container>
      </div>
    </div>
      <ng-template #extraTemplate>
        <a (click)="isView = true" href="javascript:;" style="z-index : 1000;" class="btn btn-sm btn-warning mr-2">
        <i class="fas fa-exclamation-triangle"></i>
      </a>
      <a (click)="addOrEditModal()" href="javascript:;" style="z-index : 1000;" class="btn btn-sm btn-primary">
        <i class="far fa-edit"></i> Sửa
      </a>
      </ng-template>
   </div>
   <div [hidden]="!isView">
      Danh sách vật chất bị hỏng :
          <div class="h-105px">
            Sân A lỗi
            </div>
       <a (click)="isView = false" href="javascript:;" style="z-index : 1000;" class="btn btn-sm btn-primary">
              <i class="fas fa-backward"></i> Trở lai
        </a>
   </div>
    </nz-card>
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
    `
  ]
})
export class SanBongCardComponent  extends AppComponentBase{
 TRANG_THAI_CO_SO_SAN_BONG = TRANG_THAI_CO_SO_SAN_BONG;

@Input() sModel = new FootballFielDto();

isView : boolean = false ;

constructor(
  private  _modalService: NzModalService,
  private  _systemManagementService : SystemManagementService,
  private _router: Router,
  injector: Injector,

) {
  super(injector);
 }

 addOrEditModal(_dataItem?: FootballFielDto){
  const _modal =  this._modalService.create({
    nzTitle: _dataItem ? 'Sửa' : 'Thêm mới ' + "thông tin sân bóng" ,
      nzContent: SanBongModalComponent,
      nzWidth: window.innerWidth > 800 ? 600 : '90%',
      nzComponentParams: {
        dataItem : _dataItem ? _dataItem :  new FootballFielDto(),
      }
  });

  _modal.afterClose.subscribe((result) => {

  });
}

viewDetail(){
  this._router.navigate(['/vat-chat']);
}

}


@NgModule({
	declarations: [
		SanBongCardComponent
	],
	exports: [
		SanBongCardComponent
	],
	imports: [
		CommonModule,
    NzCardModule
	]
})
export class SanBongCardModule { }
