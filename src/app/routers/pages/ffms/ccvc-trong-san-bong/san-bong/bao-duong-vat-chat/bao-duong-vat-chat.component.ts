import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { VatChatDto, FootballFielDto } from 'src/app/shared/service-proxies/system-management-service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-bao-duong-vat-chat',
  templateUrl: './bao-duong-vat-chat.component.html',
  styleUrls: ['./bao-duong-vat-chat.component.css']
})
export class BaoDuongVatChatComponent extends AppModalComponentBase implements OnInit {

  constructor(
		injector: Injector,
    private _foundationFieldsService : FoundationFieldsService,

	) {
		super(injector);
	}
  repairAmountError: number;
  ngOnInit(): void {
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
  @Input() dataItem = new VatChatDto();
  @Input() dataFootbalField = new FootballFielDto();


 lstStatus : any = [
  // {
  //      id : "1",
  //      name : 'Hoạt động bình thường'
  //    },
    {
     id : "2",
     name : 'Có vấn đề'
   },
   {
       id : "3",
       name : 'Đã sửa chữa'
  }
]
timer;
validaorRes:string;


  save(){

    if (AppUtilityService.isNullValidateForm("modalBaoDuong")) {
      AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
      return;
    }
    // debugger;

     if(this.dataItem.repairAmount <= this.dataItem.amount && this.dataItem.repairAmount > 0){
      // this.dataItem.repairAmount = this.repairAmountError;
      this._foundationFieldsService.MaintainCCVC(this.dataItem).subscribe(
        ()=>{
          // this.dataItem.finishTime = null;
          // this.dataItem.maintenanceTime = null;
          // this.dataItem.repairAmount = null;
          // this.dataItem.repairCost = null;
          AppMessageService.success("Cập nhật trạng thái vật chất thành công thành công!","");

          this.close(true);
          if(this.dataItem.status == "3"){
            this.dataItem.status ="1";
            this._foundationFieldsService.MaintainCCVC(this.dataItem).subscribe(
              ()=>{

              }
            )
          }
          // this._foundationFieldsService.createOrEditFootballField(this.dataFootbalField);
        }
        );
    }else{
         AppMessageService.warning("Sô lượng vật chất có vấn đề không lớn hơn số vật chất hiện tại ! ","");
    }
    // debugger;
        // this.dataItem.status = "1";
  }
validateHandleName(){
 clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if(this.dataItem.repairAmount <= this.dataItem.amount)
        this.validaorRes = "Số vật chất lớn hơn số vật chất hiện có";
    }, 500)
}
}
