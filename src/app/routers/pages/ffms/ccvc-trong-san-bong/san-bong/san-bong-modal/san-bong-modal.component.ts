import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { ValidatorResponseDTO } from 'src/app/shared/model/validation-dto';
import { FootballFieldInputDto, FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { FootballFielDto, SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';

@Component({
  selector: 'app-san-bong-modal',
  templateUrl: './san-bong-modal.component.html',
  styleUrls: ['./san-bong-modal.component.css']
})
export class SanBongModalComponent extends AppModalComponentBase<FootballFielDto>  implements OnInit {
  constructor(
		injector: Injector,
    private _footballFieldFields : FoundationFieldsService,
    private  _systemManagementService : SystemManagementService,

	) {
		super(injector);
	}

listKieuSan : any = [
    {
      id : "1",
      name: "Sân 5"
    },
    {
      id : "2",
      name: "Sân 7"
    },
    {
      id : "3",
      name: "Sân 11"
    },

   ];

listTrangThaiSan : any = [
  {
    id : "1",
    name: "Hoạt động"
  },
  {
    id : "2",
    name: "Bảo trì"
  },
  {
    id : "0",
    name: "Dừng hoạt động"
  },

   ];

  @Input() dataItem = new FootballFielDto();
  listFoundation: any =[];
  @Input() isView : boolean;
  @Input() isEdit : boolean;
  lstFootballName: any =[];
  listFootballField : FootballFielDto[] = [];
  timeout: any = null;
  validaorRes:string;
  // validaorRes : ValidatorResponseDTO = new ValidatorResponseDTO();
  objFilter = new FootballFieldInputDto();


  ngOnInit(): void {
     if(isNullOrUndefinedOrEmpty(this.dataItem.status)){
      this.dataItem.status = "1";
    }
    this._footballFieldFields.getListCoSoCombobox().subscribe(
         (result)=> {
           this.listFoundation = result;
           this.dataItem.foundationFieldId = Number(this.listFoundation[0]['id']);
         }
        );
  }

  save(){
    if (AppUtilityService.isNullValidateForm("modalFootballField")) {
       AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
       return;
    }

    this.loading = true ;
    // this.dataItem.status = '1';
    this._footballFieldFields.createOrEditFootballField(this.dataItem).subscribe(
      ()=>{
        this.loading = false;

        AppMessageService.success("Tạo mới sân bóng thành công!","");
        this.close(this.dataItem);
      }
    );
   }

   update(){
  if (AppUtilityService.isNullValidateForm("modalFootballField")) {
       AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
       return;
    }
    this.loading = true ;
    // this.dataItem.status = '1';
    this._footballFieldFields.createOrEditFootballField(this.dataItem).subscribe(
      ()=>{
        this.loading = false;

        AppMessageService.success("Cập nhập sân bóng thành công!","");
        this.close(this.dataItem);
      }
    );
   }
    // nếu tạo tài khoản thành thông
    // this.close(this.dataItem);

  // }
  timer: any;

validateHandleName(){
 clearTimeout(this.timer);
    this.timer = setTimeout(() => {

       this._footballFieldFields.getListFootballField(
            this.objFilter.status,
            this.objFilter.name,
            this.objFilter.pageIndex = 0 ,
            this.objFilter.pageSize = 100,
            this.objFilter.sort,
            this.objFilter.sortBy,
            this.objFilter.foundationType,
            this.objFilter.foundationId = 1,
            this.objFilter.textSearch
          )
          .subscribe(
      (result)=> {
        this.listFootballField = result['content'];
        // this.objFilter.total = result['totalElements'];
        let object = this.listFootballField.find(s => s.name == this.dataItem.name);
        this.validaorRes = object?"Tên sân bóng đã tồn tại":"";
      });

    }, 1000)
}

}
