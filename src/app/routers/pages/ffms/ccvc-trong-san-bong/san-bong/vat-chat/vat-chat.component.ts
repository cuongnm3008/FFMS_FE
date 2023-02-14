import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { VatChatDto } from './../../../../../../shared/service-proxies/system-management-service';
import { Component, Injector, Input, OnInit, Output } from '@angular/core';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaoDuongVatChatComponent } from '../bao-duong-vat-chat/bao-duong-vat-chat.component';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FoundationFieldsService, MaterialFacilitiesInputDto } from 'src/app/shared/service-proxies/foundation-management-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';

@Component({
  selector: 'app-vat-chat',
  templateUrl: './vat-chat.component.html',
  styleUrls: ['./vat-chat.component.css']
})
export class VatChatComponent extends AppModalComponentBase implements OnInit{
  //  footballFieldId :number ;
  private routeSubscription: Subscription

  constructor(
		injector: Injector,
    private  _modalService: NzModalService,
     private route: ActivatedRoute,
     private _router: Router,
    private _foundationFieldsService : FoundationFieldsService,

	) {
		super(injector);
	}


  @Input() dataItem = new VatChatDto();
  @Input() isView : boolean;
  @Input() isEdit : boolean;
  @Output() footballFieldId : number;
  default: number = 0;
  default1: number = 0;
  default2: number = 0;
   validaorRes:string;
    objFilter = new MaterialFacilitiesInputDto();
     listMaterialF : VatChatDto[] = [];
  statusView:string;

 lstStatus : any = [
  {
       id : "1",
       name : 'Hoạt động bình thường'
     },
    {
     id : "2",
     name : 'Có vấn đề'
   },
   {
       id : "3",
       name : 'Đã sửa chữa'
  }
]

  ngOnInit(): void {
    this.dataItem.footballFieldId = this.footballFieldId;
    // if(this.isEdit){
    //   this.dataItem.status ="1";
    // }
    if(this.dataItem.status == "1"){
    this.statusView = "Hoạt động bình thường";
    }
    else if(this.dataItem.status == "2"){
          this.statusView = "Có vấn đề";
    }else{
      this.statusView ="Đã sửa chữa";
    }
    // if(this.dataItem.isSpecific == "1")
    this.initFileImage();


  }
   initFileImage(){
    this.fileList.push({
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: this.dataItem.image
    })
  }
  fileList : NzUploadFile[] = [];

  // getInforFootball(){
  //   this.route.params.subscribe((params: Params) => {
  //   this.footballFieldId = params['id'];
  //           });
  //   console.log(this.footballFieldId);
  // }

  save(){
    // this.getInforFootball();
    if (AppUtilityService.isNullValidateForm("modalThongTinCCVC")) {
        AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
        return;
    }
    // debugger;

    this.dataItem.status ="1";
    console.log(this.dataItem);
      this._foundationFieldsService.createOrEditCCVC(this.dataItem).subscribe(
        ()=>{
          this.loading = false;
          AppMessageService.success("Thêm vật chất thành công thành công!","");
          this.close(true);
        }
      );
  }
  update(){
    if (AppUtilityService.isNullValidateForm("modalThongTinCCVC")) {
        AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
        return;
    }
    this.loading = true ;
        this._foundationFieldsService.createOrEditCCVC(this.dataItem).subscribe(
        ()=>{
          this.loading = false;
          AppMessageService.success("Cập nhật vật chất thành công thành công!","");
          this.close(true);
        }
      );
  }
checkboxHandle(isChecked: boolean){
  if(isChecked){
    this.dataItem.isSpecific = "1";
  }else{
        this.dataItem.isSpecific = "0";
  }
}
 timer: any;
 validateHandleName(){
 clearTimeout(this.timer);
    this.timer = setTimeout(() => {

       this._foundationFieldsService.getListCoSoVatChatById(
             this.objFilter.footballId = this.footballFieldId,
        this.objFilter.name,
        this.objFilter.pageIndex =0,
        this.objFilter.pageSize =100,
        this.objFilter.sort ,
        this.objFilter.sortBy ,
        this.objFilter.status,
        this.objFilter.textSearch
          )
          .subscribe(
      (result)=> {
         this.listMaterialF = result['content'];
        // this.objFilter.total = result['totalElements'];
        let object = this.listMaterialF.find(s => s.name == this.dataItem.name);
        this.validaorRes = object?"Tên vật chất đã tồn tại":"";
      });

    }, 1000)
}
}
