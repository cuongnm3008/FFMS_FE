import { FootballFielDto, FOOTBALL_FIELD_STATUS, SANBONG_CATEGORY, SystemManagementService, VatChatDto } from 'src/app/shared/service-proxies/system-management-service';
import { Component, Injector, Input, OnDestroy, Type } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { SanBongModalComponent } from './san-bong-modal/san-bong-modal.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { FoundationFieldsService, FootballFieldInputDto, MaterialFacilitiesInputDto } from 'src/app/shared/service-proxies/foundation-management-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { SanBongDetailModalComponent } from './san-bong-modal/san-bong-detail-modal/san-bong-detail-modal.component';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';

@Component({
  selector: 'app-san-bong',
  templateUrl: './san-bong.component.html',
  styleUrls: ['./san-bong.component.css']
})
export class SanBongComponent extends AppComponentBase implements OnDestroy {
  myParam: number;
  status : string;
  type : string;
  private routeSubscription: Subscription
  lstFoundation : any = [];
  foundationId:number;
  foundationFieldName:string;



  constructor(
    private  readonly _modalService: NzModalService,
    private _footballFieldFields : FoundationFieldsService,
    private route: ActivatedRoute,
    private _breadcrumbsService : BreadcrumbService,

    injector: Injector,
     private _router: Router,
  ) {
    super(injector);

    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      if(!isNullOrUndefinedOrEmpty(params['id'])){
        // this.foundationId = params['id'];
        this.foundationId = Number(params['id']);
        this.configFilterDefault();
        this.fetchData();
      }
    });

      this._footballFieldFields.getListCoSoCombobox().subscribe((data) => {
        data.forEach(e =>{
          this.lstFoundation.push({
            id : e.id,
            name : e.name
          });
        })
      //   setTimeout(() => {
      //     if(!isNullOrUndefinedOrEmpty(this.lstFoundation)){
      //       // this.myParam =this.lstFoundation[0].id;
      //       this.fetchData();
      //     }
      //   },500);
      });
    }

    timer;

    dataItem = new FootballFielDto();
    objFilter = new FootballFieldInputDto();
    objFilterMaterial = new MaterialFacilitiesInputDto();
    currentTab : number ;
    listFootballField : FootballFielDto[] = [];
    typeFootballField :number;
    countSanCoSuCo: number;
    countSanHoatDong: number;
    countSanDungHoatDong: number;
    listMaterialOfField:VatChatDto[] = [];
    listMaterialErrolOfField:VatChatDto[] = [];
    listMaterialErrolImportantOfField:VatChatDto[] = [];



    ngOnDestroy(): void {
      this.routeSubscription.unsubscribe();
      // this._router.navigate(['/co-so-detail', this.foundationId]);
    }


  // SANBONG_CATEGORY = SANBONG_CATEGORY;
  FOOTBALL_FIELD_STATUS = FOOTBALL_FIELD_STATUS;
  //  footballFieldStatus : number = FOOTBALL_FIELD_STATUS.BAO_TRI;
  footballFieldStatus:string;




  listKieuSan = [
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
      id : "0",
      name: "Dừng hoạt động"
    },
    {
      id : "1",
      name: "Hoạt động"
    },
    {
      id : "2",
      name: "Bảo trì"
    },

   ];

   configFilterDefault(){
      this.objFilter.pageIndex = 0;
      this.objFilter.pageSize = 10;
      this.objFilter.sort = "";
      this.objFilter.sortBy = "";
      this.objFilter.status = "2";
      this.objFilter.textSearch = "";

   }


     ngOnInit(): void {
      // this.foundationId = 1;
      // this.objFilter.status = "2";
       this._breadcrumbsService.setBreadcrumb(["Quản lý sân bóng","Bảo trì sân bóng"]);
    this._breadcrumbsService.setNameButton("sân bóng");
        this._breadcrumbsService.setNewButton("");

     this._footballFieldFields.getListCoSoCombobox().subscribe(
         (result)=> {
           this.lstFoundation = result;
           this.dataItem.foundationFieldId = Number(this.lstFoundation[0]['id']);
           this.objFilter.foundationId = this.dataItem.foundationFieldId;
           this.foundationFieldName = this.lstFoundation[0]['name'];
         }
        );
      this.configFilterDefault();
      // this.footballFieldStatus = FOOTBALL_FIELD_STATUS.BAO_TRI;
      this.fetchData();
      // this.footballFieldStatus ="1";
      this.objFilter.status = FOOTBALL_FIELD_STATUS.BAO_TRI;


  //  this.objFilter.status = 1;
  //           this._router.navigate(['/co-so-detail', this.foundationId]);
  }

initFilter(): void {
    this.objFilter = new FootballFieldInputDto();
     this.objFilter.foundationId ;
     this.objFilter.pageIndex = 0;
     this.objFilter.pageSize = 10;
     this.objFilter.sort = "";
     this.objFilter.sortBy = "";
      this.objFilter.status = "2";
      this.objFilter.foundationType = null,
     this.objFilter.textSearch = "";
    //  this.objFilter.status = undefined;
     this.fetchData();
  }
 back(){
    this._router.navigate(['/co-so-san-bong']);
  }

   fetchData(){
          this.loading = true
           this.countSanBong();

          this._footballFieldFields.getListFootballField(
            this.objFilter.status,
            this.objFilter.name,
            this.objFilter.pageIndex ,
            this.objFilter.pageSize,
            this.objFilter.sort,
            this.objFilter.sortBy,
            this.objFilter.foundationType,
            this.foundationId,
            this.objFilter.textSearch
          )
          .subscribe(
      (result)=> {
         result['content'].forEach(element => {
            element.pageSize = this.objFilter.pageSize;
            element.pageIndex = this.objFilter.pageIndex;
        });
        this.listFootballField = result['content'];
        this.objFilter.total = result['totalElements'];

        this.listFootballField.forEach(element => {
        this._footballFieldFields.getListCoSoVatChatById(
        this.objFilterMaterial.footballId = element.id,
        this.objFilterMaterial.footballFieldName,
        this.objFilterMaterial.pageIndex = 0,
        this.objFilterMaterial.pageSize =20,
        this.objFilterMaterial.sort,
        this.objFilterMaterial.sortBy,
        this.objFilterMaterial.status,
        ).subscribe(
      (result1)=> {

       this.listMaterialOfField = result1['content'];
        element.TongVatChat = this.listMaterialOfField.length;
        // this.objFilterMaterial.total = result1['totalElements'];
        this.listMaterialErrolOfField = this.listMaterialOfField.filter(s => s.status != "1" && s.isSpecific == "0");
        this.listMaterialErrolImportantOfField = this.listMaterialOfField.filter(s => s.status != "1" && s.isSpecific == "1");
        element.VatChatSuCo = this.listMaterialErrolOfField.length;
        element.VatchatUuTienSuco = this.listMaterialErrolImportantOfField.length;
      }
    );
          // this.getInforFootball(element.id);
          // element.TongVatChat = this.listMaterialOfField.length;
          // element.VatChatSuCo = this.listMaterialErrolOfField.length;
      }
    );
        this.loading = false;



    });
      //     this._foundationFields.getListSanBongByCoSoId(this.foundationId).subscribe(data => {
      //         if(data || data.content){
      //   //  debugger;
      //           this.listFootballFielDto = data.content;
      //   // this.listFootballFielDtoErrol = data.content.filter(s => s.status == 3);
      //   // this.listFootballFielDtoAction = data.content.filter(s => s.type == 1);
      //   // this.listFootballFielDtoType11 = data.content.filter(s => s.type == SANBONG_CATEGORY.SAN_DA_11);

      // }
    // })

   }

  addOrEditModal(_dataItem?: FootballFielDto, _isView? : boolean, _isEdit? :boolean){
      const _modal = this._modalService.create({
      nzTitle: (_dataItem ? (  _isView ? "Xem" : 'Sửa' ) : 'Thêm mới') + ' thông tin sân bóng',
        nzContent: SanBongModalComponent,
        nzWidth: window.innerWidth > 800 ? 600 : '90%',
        nzComponentParams: {
          dataItem : _dataItem ? _dataItem :  new FootballFielDto(),
          isView : _isView,
          isEdit : _isEdit
        },
      });

      _modal.afterClose.subscribe((result) => {
        // if(result){
        //   this.listFootballField = this.listFootballField || [];
        //   this.listFootballField.push(result);
        // }
        	if (result) this.fetchData();
      });
  }

  viewDetails(_dataItem?: FootballFielDto){
    const _modal =  this._modalService.create({
      nzTitle: _dataItem ? 'Thông tin sân bóng' : 'Thêm mới ' + "sân bóng" ,
        nzContent: SanBongDetailModalComponent,
        nzWidth: window.innerWidth > 800 ? 800 : '90%',
        nzComponentParams: {
          dataItem : _dataItem ? _dataItem :  new FootballFielDto(),
        }
      });

      _modal.afterClose.subscribe((result) => {
        // if(result){
        //   this.listFootballField = this.listFootballField || [];
        //   this.listFootballField.push(result);
        // }
        	if (result) this.fetchData();
      });
  }

//  onChangeFoudation(_dataItem :number){
//     // this._router.navigate(['/co-so-detail', _dataItem]);
//    this._footballFieldFields.getListSanBongByCoSoId(_dataItem).subscribe(data => {
//       if(data || data.content){
//         //  debugger;
//         // this.listFootballFielDto = data.content;
//         // this.listFootballFielDtoType7 = data.content.filter(s => s.type == SANBONG_CATEGORY.SAN_DA_7);
//         // this.listFootballFielDtoType5 = data.content.filter(s => s.type == SANBONG_CATEGORY.SAN_DA_5);
//         // this.listFootballFielDtoType11 = data.content.filter(s => s.type == SANBONG_CATEGORY.SAN_DA_11);
//       }
//     })
//     this.foundationId = _dataItem;
//  }

  onStatusChange(_status: string){
    this.status = _status;
    this.fetchData();
  }
 getInforFootball(_footballFieldId:number){
     this._footballFieldFields.getListCoSoVatChatById(
        this.objFilterMaterial.footballId = _footballFieldId,
        this.objFilterMaterial.footballFieldName,
        this.objFilterMaterial.pageIndex = 0,
        this.objFilterMaterial.pageSize =20,
        this.objFilterMaterial.sort,
        this.objFilterMaterial.sortBy,
        this.objFilterMaterial.status,
        ).subscribe(
      (result1)=> {

        this.listMaterialOfField = result1['content'];
        // this.objFilterMaterial.total = result1['totalElements'];
        this.listMaterialErrolOfField = this.listMaterialOfField.filter(s => s.status != "1");

      }
    );
  }

onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.pageIndex = _params.pageIndex;
    this.objFilter.pageSize = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
      this.objFilter.sort = objSort[0]?.key == "name" ? "name" : objSort[0]?.key;
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

  countSanBong(){
          this._footballFieldFields.getListFootballField(
            this.footballFieldStatus = "2",
            this.objFilter.name,
            this.objFilter.pageIndex ,
            this.objFilter.pageSize,
            this.objFilter.sort,
            this.objFilter.sortBy,
            this.objFilter.foundationType,
            this.foundationId,
            this.objFilter.textSearch
          )
          .subscribe(
      (result1)=> {
        this.countSanCoSuCo = result1['totalElements'];
      }
    );
      this._footballFieldFields.getListFootballField(
            this.footballFieldStatus = "1",
            this.objFilter.name,
            this.objFilter.pageIndex ,
            this.objFilter.pageSize,
            this.objFilter.sort,
            this.objFilter.sortBy,
            this.objFilter.foundationType,
            this.foundationId,
            this.objFilter.textSearch
          )
          .subscribe(
      (result2)=> {
        this.countSanHoatDong = result2['totalElements'];
      }
    );
     this._footballFieldFields.getListFootballField(
            this.footballFieldStatus = "0",
            this.objFilter.name,
            this.objFilter.pageIndex ,
            this.objFilter.pageSize,
            this.objFilter.sort,
            this.objFilter.sortBy,
            this.objFilter.foundationType,
            this.foundationId,
            this.objFilter.textSearch
          )
          .subscribe(
      (result3)=> {
        this.countSanDungHoatDong = result3['totalElements'];
      }
    );
    // this.objFilter.status = 3;
  }

deleteFootballField(_dataItem : FootballFielDto){
    // _dataItem?.lstId.push(_dataItem?.id);
    // _dataItem.id = [_dataItem?.id];
    debugger;
    AppMessageService.confirm("","Bạn có chắc muốn xóa (" +_dataItem.name+") hay không",
    ()=>{
      this.loading = true;
      this._footballFieldFields.deleteFootballField(_dataItem).subscribe(
        ()=>{
          AppMessageService.success("Xoá sân bóng thành công!","");
          this.loading = false;
          this.fetchData();
        }
      );
    }
    );
  }
  deleteProduct(_dataItem : FootballFielDto){
  }
 viewDetail(_dataItem: FootballFielDto): void {
		// const _url = `/product-detai`;
		// window.open(_url, "_blank");
	}

  onTypeChange($event){
    this.type= $event;
    this.fetchData();
  }

  tabChangeHandle(){
    // debugger;
    if(this.currentTab == 0){
      this.objFilter.status = FOOTBALL_FIELD_STATUS.BAO_TRI;
      // this.footballFieldStatus ="2";
    }
    if(this.currentTab == 1){
      this.objFilter.status = FOOTBALL_FIELD_STATUS.HOAT_DONG;
      // this.footballFieldStatus ="1";
    }
    if(this.currentTab == 2){
      this.objFilter.status = FOOTBALL_FIELD_STATUS.DUNG_HOAT_DONG;
      // this.footballFieldStatus ="0";
    }
    // console.log(this.objFilter.status);

    this.fetchData();
  }
    searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }
}

