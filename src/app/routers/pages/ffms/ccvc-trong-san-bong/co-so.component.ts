import { CoSoSanBongDto, SanBongBaoTriDto } from 'src/app/shared/service-proxies/system-management-service';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { AddOrEditCoSoSanBongComponent } from './co-so-modal/add-or-edit.component';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { FootballFieldInputDto, FoundationFieldsService, FoundationInputDto } from 'src/app/shared/service-proxies/foundation-management-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { CoSoDetailComponent } from './co-so-detail/co-so-detail.component';
import { LazyLoadEvent } from 'primeng/api';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AddressServiceService } from 'src/app/shared/services/address-service.service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';

@Component({
  selector: 'app-ccvc-trong-san-bong',
  templateUrl: './co-so.component.html',
  styleUrls: ['./co-so.component.css']
})
export class CoSoComponent extends AppComponentBase implements OnInit {
  txtSearch : string;
  timeout: any = null;
  private routeSubscription: Subscription

  constructor(
    private  _modalService: NzModalService,
    private _foundationFieldsService : FoundationFieldsService,
    private _addressServiceService: AddressServiceService,
    private _breadcrumbsService : BreadcrumbService,
    injector: Injector,
  ) {
    super(injector);
   }

   listTrangThaiCoSo : any = [
   {
      id : "1",
      name: "Đang kinh doanh"
    },
    {
      id : "2",
      name: "Ngừng kinh doanh"
    },
    {
      id : "3",
      name: "Bảo trì"
    },
  ];
  timer;
  provineName : any;
  districtName : any;
  percentName : any;
  objFilter = new FoundationInputDto();
  objFilterFootballField = new FootballFieldInputDto();
  listFoundation : CoSoSanBongDto[] = [];
  // listSanBongBaoTri : SanBongBaoTriDto[];
  isSanBongBaoTri: boolean;
  TongSanbong :any;
  result :any;
  result1: [];
  // nameFoundation :string;
  // foundationCode :string;
  // objFilter = new CoSoSanBongDto();

  ngOnInit(): void {
    // this.statusSearch = 1;
     this._breadcrumbsService.setBreadcrumb(["Quản lý sân bóng","Thông tin cơ sở"]);
    this._breadcrumbsService.setNameButton("cơ sở");
    this.objFilter.pageIndex = 0;
   this.objFilter.pageSize = 10;
   this.objFilter.sort = "";
   this.objFilter.sortBy = "";
   this.objFilter.textSearch = "";

       this.objFilter.status = "1";

    // this.fetchData();
  }

  fetchData() {
      this.loading =true;

      this._foundationFieldsService.getListCoSo(
      this.objFilter.foundationName,
      this.objFilter.foundationCode,
      this.objFilter.status,
      this.objFilter.pageIndex ,
      this.objFilter.pageSize,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.textSearch).subscribe(
      (result)=> {

        this.listFoundation = result['content'];
        this.objFilter.total = result['totalElements'];
        this.loading = false;
        this.listFoundation.forEach(element => {
          element.SoSanTrucTrac = element.lstFootballFields.length;
          element.addressDetail = !isNullOrUndefinedOrEmpty(element.address) ? element.address.fullAddress : "";

              this._addressServiceService.getCities().subscribe((res) => {
            if(res){
                this.provineName = res.filter(r => r.code+"" == element.address.province);
                element.province = !isNullOrUndefinedOrEmpty(this.provineName[0]) ? this.provineName[0].name : "sđ";

                this._addressServiceService.getDistricts().subscribe((res1)=>{
                this.districtName = res1.filter(r => r.code+"" == element.address.district);
                element.district = !isNullOrUndefinedOrEmpty(this.districtName[0]) ?  this.districtName[0].name : "sđ";

                this._addressServiceService.getWards().subscribe((res2) => {
                this.percentName = res2.filter(r => r.code+"" == element.address.percinct);
                element.percinct = !isNullOrUndefinedOrEmpty(this.percentName[0]) ? this.percentName[0].name : "sđ";
          })
        })
      }
      //  element.province = JSON.stringify(this.provineName[0].name).toString();
      // element.district = JSON.stringify(this.districtName[0].name).toString();
      // element.percinct = JSON.stringify(this.percentName[0].name).toString();


      // console.log(element.province);
  })
          // element.province = !isNullOrUndefinedOrEmpty(element.address) ? element.address.fullAddress : "";
          // element.district = !isNullOrUndefinedOrEmpty(element.address) ? element.address.fullAddress : "";
          // element.percinct = !isNullOrUndefinedOrEmpty(element.address) ? element.address.fullAddress : "";


      this.result = this._foundationFieldsService.getListFootballField(
      this.objFilterFootballField.status ,
      this.objFilterFootballField.name,
      this.objFilterFootballField.pageIndex =0,
      this.objFilterFootballField.pageSize =100,
      this.objFilterFootballField.sort,
      this.objFilterFootballField.sortBy,
      this.objFilterFootballField.foundationType,
      this.objFilterFootballField.foundationId = element.id
      ).subscribe(
      (result1)=> {
        this.result1 = result1['content'];
        element.TongSoSan = this.result1.length;

      }
    );
    // );
        });
      }
    );
        // this.listSanBongBaoTri = data.filter(s => s.lstFootballFields != null );
  }

  initFilter(): void {
     this.objFilter = new FoundationInputDto();
     this.objFilter.pageIndex = 0;
     this.objFilter.pageSize = 10;
     this.objFilter.sort = "";
     this.objFilter.sortBy = "";
     this.objFilter.textSearch = "";

         this.objFilter.status = "1";

    //  this.productCategory = 1;
    //  this.objFilter.status = "1";
     this.fetchData();
  }

  addOrEditModal(_dataItem?: CoSoSanBongDto){
    const _modal =  this._modalService.create({
      nzTitle: _dataItem ? 'Sửa thông tin cơ sở kinh doanh' : 'Thêm mới ' + "cơ sở kinh doanh sân bóng" ,
        nzContent: AddOrEditCoSoSanBongComponent,
        nzWidth: window.innerWidth > 800 ? 600 : '90%',
        nzComponentParams: {
          dataItem : _dataItem ? _dataItem :  new CoSoSanBongDto(),
        }
      });

      _modal.afterClose.subscribe((result) => {
        if(result){
          this.listFoundation = this.listFoundation || [];
          this.listFoundation.push(result);
        }
      });
  }

 ViewDetail(_dataItem?: CoSoSanBongDto){
    const _modal =  this._modalService.create({
        nzTitle: _dataItem ? 'Thông tin cơ sở kinh doanh' : 'Thêm mới ' + "Thông tin cơ sở kinh doanh" ,
        nzContent: CoSoDetailComponent,
        nzWidth: window.innerWidth > 800 ? 750 : '90%',
        nzComponentParams: {
          dataItem : _dataItem ? _dataItem : new CoSoSanBongDto(),
        }
      });

      _modal.afterClose.subscribe((result) => {
        if(result){
          this.getDataGrids();
        }
      });
    }
 getDataGrids(_event?: LazyLoadEvent): void {

    // if(!isNullOrUndefinedOrEmpty(this.eDate) ){
    //   this.objFilter.endDate = this.eDate.toDate();
    // }
    // if(!isNullOrUndefinedOrEmpty(this.sDate)){
    //   this.objFilter.startDate = this.sDate.toDate();
    // }
    // this.onChangeQuery(0, 10, null , null, this.objFilter.startDate, this.objFilter.endDate,
    //    this.typeSearch, this.objFilter.roleSearch, null, this.objFilter.statusSearch);
  }
deleteFoundationField(_dataItem : CoSoSanBongDto){
    AppMessageService.confirm("","Bạn có chắc muốn xóa cơ sở kinh doanh  hay không",
    ()=>{
      this.loading = true;
      this._foundationFieldsService.deleteFoundationField(_dataItem).subscribe(
        ()=>{
          AppMessageService.success("Xoá cơ sở kinh doanh thành công!","");
          this.loading = false;
          this.fetchData();
        }
      );
    }
    );
}

onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.pageIndex = _params.pageIndex;
    this.objFilter.pageSize = _params.pageSize;

    this.objFilter.sort = isNullOrUndefinedOrEmpty(this.objFilter.sort) ?   "" : this.objFilter.sort;
    this.objFilter.sortBy = isNullOrUndefinedOrEmpty(this.objFilter.sortBy) ?   "" : this.objFilter.sortBy;
    this.objFilter.textSearch = isNullOrUndefinedOrEmpty(this.objFilter.textSearch) ?   "" : this.objFilter.textSearch;

    if(_params.pageIndex > 0){
      this.objFilter.pageIndex =  this.objFilter.pageIndex -1;
    }
    this.fetchData();
  }
    searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }
}
