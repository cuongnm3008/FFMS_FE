import { BaoDuongVatChatComponent } from './../../../../routers/pages/ffms/ccvc-trong-san-bong/san-bong/bao-duong-vat-chat/bao-duong-vat-chat.component';
import { VatChatComponent } from './../../../../routers/pages/ffms/ccvc-trong-san-bong/san-bong/vat-chat/vat-chat.component';
import { CommonModule } from '@angular/common';
import { Component, Injector, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { CCVC_ENUM, SystemManagementService, VatChatDto } from 'src/app/shared/service-proxies/system-management-service';
import { AppButtonActionModule } from '../button/button-action';
import { AppButtonIconModule } from '../button/button-icon';
import { AppMessageService } from 'src/app/shared/services/app-message.service';

@Component({
  selector: 'csvc-card',
  template: `
   <div class="card-item">
    <nz-card style="width:300px; margin: 15px;" [nzTitle]="title" [nzExtra]="extraTemplate">
      <img style="width: 100%; height: 150px; object-fit: cover;" src="../../../../../assets/images/coffee.jpg" alt="">
        <ng-container [ngSwitch]="sModel.status">
             <span *ngSwitchCase="CCVC_ENUM.HOAT_DONG" class="badge badge-success">Hoạt động</span>
            <span *ngSwitchCase="CCVC_ENUM.BAO_TRI" class="badge badge-warning">Bảo trì</span>
        </ng-container>
        <p>Số lượng: 20</p>
        <p>Số lượng bảo trì: 10</p>
      </nz-card>
      <ng-template #extraTemplate>
      <!-- <a (click)="addOrEditModal()" href="javascript:;" style="z-index : 1000;" class="btn btn-sm btn-primary">
        <i class="far fa-edit"></i> Sửa
      </a> -->
      <app-button-actions>
              <app-button-action (onClick)="addOrEditModal(sModel)" title="Sửa" class="fas fa-edit"></app-button-action>
              <app-button-action (onClick)="addOrEditModal(sModel)" title="Xem chi tiết" class="fas fa-eye"></app-button-action>
              <!-- <app-button-action title="Phê duyệt" class="fas fa-check"></app-button-action> -->
             <app-button-action (onClick)="baoDuongModal(sModel)" title="Bảo dưỡng" class="fas fa-exclamation-circle"></app-button-action>
              <app-button-action  (onClick)="delete()" title="Xóa" class="fas fa-trash-alt"></app-button-action>
          </app-button-actions>
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
    `
  ]
})
export class CoSoVatChatCardComponent  extends AppComponentBase{

@Input()  title: string =  "Cơ sở vật chất";
@Input() sModel = new VatChatDto();
CCVC_ENUM = CCVC_ENUM;

constructor(
  private  _modalService: NzModalService,
  private  _systemManagementService : SystemManagementService,
  private _router: Router,
  injector: Injector,

) {
  super(injector);
 }

 addOrEditModal(_dataItem?: VatChatDto){
  const _modal =  this._modalService.create({
    nzTitle: _dataItem ? 'Sửa' : 'Thêm mới ' + "thông tin vật chất",
      nzContent: VatChatComponent,
      nzWidth: window.innerWidth > 800 ? 600 : '90%',
      nzComponentParams: {
        dataItem : _dataItem ? _dataItem :  new VatChatDto(),
      }
  });

  _modal.afterClose.subscribe((result) => {

  });
}

baoDuongModal(_dataItem: VatChatDto){
  const _modal =  this._modalService.create({
    nzTitle: "Bảo dưỡng vật chất",
      nzContent: BaoDuongVatChatComponent,
      nzWidth: window.innerWidth > 800 ? 600 : '90%',
      nzComponentParams: {
        dataItem : _dataItem ? _dataItem :  new VatChatDto(),
      }
  });

  _modal.afterClose.subscribe((result) => {

  });
}

delete(){
  AppMessageService.confirm("","Bạn có chắc muốn xóa hay không",
  ()=>{
      alert("Đã xác nhận rồi");
  }
);
}

}


@NgModule({
	declarations: [
		CoSoVatChatCardComponent
	],
	exports: [
		CoSoVatChatCardComponent
	],
	imports: [
		CommonModule,
    NzCardModule,
    AppButtonActionModule,
    AppButtonIconModule
	]
})
export class CoSoVatChatCardModule {

}
