import { FoundationFieldsService, MaterialFacilitiesInputDto } from 'src/app/shared/service-proxies/foundation-management-service';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { Component, Injector, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VatChatDto, FootballFielDto } from 'src/app/shared/service-proxies/system-management-service';
import { VatChatComponent } from '../vat-chat/vat-chat.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BaoDuongVatChatComponent } from '../bao-duong-vat-chat/bao-duong-vat-chat.component';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import * as cloneDeep from 'lodash/cloneDeep';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends AppComponentBase implements OnInit{
 txtSearch : string;
  timeout: any = null;
  private routeSubscription: Subscription;
  objFilter = new MaterialFacilitiesInputDto();
  listMaterialF : VatChatDto[] = [];
  checkLstMaterialF : VatChatDto[] = [];
  footballInfor = new FootballFielDto();
  footballFieldId :number ;
  footballFieldName:string;
  footballFieldType: string | number;
  lstFoundation: any;
  foundationFieldName:string;
  timer;
  countCheck:any;



constructor(
    private _modalService: NzModalService,
    private _material_facilities_Fields : FoundationFieldsService,
      private _breadcrumbsService : BreadcrumbService,
    injector: Injector,
    private route: ActivatedRoute,
    private _router: Router,
  ) {
        super(injector);

    //   this.routeSubscription = this.route.params.subscribe((params: Params) => {
    //   if(!isNullOrUndefinedOrEmpty(params['id'])){
    //     this.footballFieldId = params['id'];
    //     this.configFilterDefault();
    //     this.fetchData();
    //   }
    // });
  }



listTrangThaiCVSC : any = [
  {
    id : "2",
    name: "Có vấn đề"
  },
   {
      id : "1",
      name: "Hoạt động bình thường"
    },
    // {
    //   id : "3",
    //   name: "Đang sửa chữa"
    // },
  ];

  listTrangThaiCVSCDacBiet : any = [
   {
      id : "0",
      name: "Cơ sở vật chất không bắt buộc"
    },
    {
      id : "1",
      name: "Cơ sở vật chất bắt buộc"
    },
  ];

   listKieuSan = [
    {
      id : 1,
      name: "Sân 5"
    },
    {
      id : 2,
      name: "Sân 7"
    },
    {
      id : 3,
      name: "Sân 11"
    },

   ];



configFilterDefault(){
    this.objFilter.pageIndex = 0;
   this.objFilter.pageSize = 10;
   this.objFilter.sort = "";
   this.objFilter.sortBy = "";
   this.objFilter.textSearch = "";
    this.objFilter.sort = "status"
    this.objFilter.sortBy="asc";
}

  ngOnInit(): void {
    // this.statusSearch = 1;
     this._breadcrumbsService.setBreadcrumb(["Quản lý sân bóng","Bảo trì sân bóng", "Quản lý vật chất trong sân bóng"]);
        this._breadcrumbsService.setNameButton("vật chất");
        this._breadcrumbsService.setNewButton("Sân bóng");

    this.configFilterDefault();


    // this.objFilter.status = "0";

    // this.fetchData();
  }
  initFilter(): void {
    this.objFilter = new MaterialFacilitiesInputDto();
    this.configFilterDefault();
    this.fetchData();
  }

  getInforFootball(){
    this.route.params.subscribe((params: Params) => {
    this.footballFieldId = params['id'];
            });
    this._material_facilities_Fields.getFootballById(this.footballFieldId).subscribe( (result)=> {
      this.footballInfor = result;
         this.footballFieldName = this.footballInfor.name;
        //  this.foundatioId = this.footballInfor.foundationId;
        //  this.footballFieldType = this.footballInfor.type;

        // console.log(this.footballFieldName);

        // this.footballFieldName = result.content.name;
        if(this.footballInfor.type == '1'){
          this.footballFieldType = "Sân 5";
        }else if(this.footballInfor.type == '2'){
          this.footballFieldType = "Sân 7";
        }else if(this.footballInfor.type == '3'){
          this.footballFieldType = "Sân 11";
        }else{
          this.footballFieldType = "Sân loại khác";
        }
      }
    );
      this._material_facilities_Fields.getListCoSoCombobox().subscribe(
         (result)=> {
           this.lstFoundation = result;
          //  this.dataItem.foundationFieldId = Number(this.lstFoundation[0]['id']);
          //  this.objFilter.foundationId = this.dataItem.foundationFieldId;
           this.foundationFieldName = this.lstFoundation[0]['name'];
         }
        );
  }
  fetchData() {
    // this.footballFieldId =10;
    //   const _url = `/vat-chat/${encodeURIComponent(this.footballFieldId)}`;
    // //window.open(_url, "_blank");
    // this._router.navigate(['/vat-chat',this.footballFieldId]);
    this.route.params.subscribe((params: Params) => {
      this.footballFieldId = params['id'];
    });

    this.getInforFootball();

    this.loading =true;
      this._material_facilities_Fields.getListCoSoVatChatById(
        this.objFilter.footballId = this.footballFieldId,
        this.objFilter.name,
        this.objFilter.pageIndex,
        this.objFilter.pageSize,
        this.objFilter.sort = "status",
        this.objFilter.sortBy ="ascend",
        this.objFilter.status,
        this.objFilter.textSearch
        ).subscribe(
      (result)=> {
          result['content'].forEach(element => {
            element.pageSize = this.objFilter.pageSize;
            element.pageIndex = this.objFilter.pageIndex;

        });
        this.listMaterialF = result['content'];
        this.objFilter.total = result['totalElements'];
        this.loading = false;
        // console.log("Data: "+result);
      }
    );
  }

checkVatChat(){
  this.loading =true;
      this._material_facilities_Fields.getListCoSoVatChatById(
        this.objFilter.footballId = this.footballFieldId,
        this.objFilter.name,
        this.objFilter.pageIndex,
        this.objFilter.pageSize,
        this.objFilter.sort = "status",
        this.objFilter.sortBy ="ascend",
        this.objFilter.status,
        this.objFilter.textSearch
        ).subscribe(
      (result)=> {
        this.checkLstMaterialF = result['content'];
        this.countCheck = this.checkLstMaterialF.filter(c => c.status == "2");

        if(this.countCheck.length != 0){
          this.footballInfor.status = "2";
          // console.log(this.footballInfor);

            this._material_facilities_Fields.createOrEditFootballField(this.footballInfor).subscribe(
      ()=>{
                // AppMessageService.success("Cập nhập sân bóng thành công!","");

      }
    );
        }else{
            this.footballInfor.status = "1";
            // console.log(this.footballInfor);
             this._material_facilities_Fields.createOrEditFootballField(this.footballInfor).subscribe(
      ()=>{
                // AppMessageService.success("Cập nhập sân bóng thành công!","");

      });
        }
      }
        );
}

  back(){
    this._router.navigate(['/co-so-detail']);
  }

  close (){

  }
  onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.pageIndex = _params.pageIndex;
    this.objFilter.pageSize = _params.pageSize;
     if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
      this.objFilter.sort = objSort[0]?.key == "status" ? "status" : objSort[0]?.key;
      this.objFilter.sortBy = objSort[0]?.value == "ascend"? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }
    this.objFilter.sort = isNullOrUndefinedOrEmpty(this.objFilter.sort) ?   "" : this.objFilter.sort;
    this.objFilter.sortBy = isNullOrUndefinedOrEmpty(this.objFilter.sortBy) ?   "" : this.objFilter.sortBy;
    this.objFilter.textSearch = isNullOrUndefinedOrEmpty(this.objFilter.textSearch) ?   "" : this.objFilter.textSearch;

    if(_params.pageIndex > 0){
      this.objFilter.pageIndex =  this.objFilter.pageIndex -1;
    }
    this.fetchData();
  }
  GetFootballFieldId(){
      this.route.params.subscribe((params: Params) => {
      this.footballFieldId = params['id'];
    });
  }

  maintain(_dataItem: VatChatDto){
    this.GetFootballFieldId();
    const _modal =  this._modalService.create({
      nzTitle: "Cập nhật trạng thái vật chất",
        nzContent: BaoDuongVatChatComponent,
        nzWidth: window.innerWidth > 800 ? 600 : '90%',
        nzComponentParams: {
          dataItem : _dataItem ? cloneDeep(_dataItem) :  new VatChatDto(),
        }
    });

    _modal.afterClose.subscribe((result) => {
      if (result) {
        this.fetchData();
        this.checkVatChat();
      }
    });
  }


  addOrEditModal(_dataItem?: VatChatDto, _isView? : boolean,  _isEdit? :boolean){
        this.GetFootballFieldId();
    const _modal =  this._modalService.create({
      nzTitle: (_dataItem ? (  _isView ? "Xem" : 'Sửa' ) : 'Thêm mới') + ' thông tin vật chất',
        nzContent: VatChatComponent,
        nzWidth: window.innerWidth > 800 ? 600 : '90%',
        nzComponentParams: {
          dataItem : _dataItem ? _dataItem :  new VatChatDto(),
          footballFieldId : this.footballFieldId,
           isView : _isView,
            isEdit : _isEdit
        }
    });

    _modal.afterClose.subscribe((result) => {
      if (result) this.fetchData();
    });
  }


  delete(_dataItem :VatChatDto){
   AppMessageService.confirm("","Bạn có chắc muốn xóa '" +_dataItem.name+"' hay không",
    ()=>{
      this.loading = true;
      this._material_facilities_Fields.deleteCCVC(_dataItem).subscribe(
        ()=>{
          AppMessageService.success("Xoá vật chất thành công!","");
          this.loading = false;
          this.fetchData();
        }
      );
    }
    );
  }
   searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }
}
