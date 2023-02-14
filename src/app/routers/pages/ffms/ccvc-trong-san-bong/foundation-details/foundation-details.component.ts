import { CoSoSanBongDto, FootballFielDto } from 'src/app/shared/service-proxies/system-management-service';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { Component, Injector, OnInit } from '@angular/core';
import { FootballFieldInputDto, FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { AddressServiceService } from 'src/app/shared/services/address-service.service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddOrEditCoSoSanBongComponent } from '../co-so-modal/add-or-edit.component';

@Component({
  selector: 'app-foundation-details',
  templateUrl: './foundation-details.component.html',
  styleUrls: ['./foundation-details.component.css']
})
export class FoundationDetailsComponent extends AppComponentBase implements OnInit {

  constructor(
  private _footballFieldFields : FoundationFieldsService,
   private _addressServiceService: AddressServiceService,
   private _breadcrumbsService : BreadcrumbService,
    private readonly _modalService: NzModalService,
    private _router: Router,
  injector: Injector,

  ) {
     super(injector);
   }
  lstFoundation : any = [];
   _lstFoundation : any = [];
  dataItem = new CoSoSanBongDto();
    _dataItem = new CoSoSanBongDto();
  objFilter = new FootballFieldInputDto();
  soSanTrucTrac: number;
  tongSoSanBong: any;
  result :any;
  result1: FootballFielDto [];
  test: FootballFielDto [];
      listErrolOfField:FootballFielDto[] = [];
   provineName : any;
   districtName : any;
    percentName : any;


  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý sân bóng","Thông tin cơ sở"]);
    this._breadcrumbsService.setNameButton("");
    this._breadcrumbsService.setNewButton("");

    this._footballFieldFields.getListCoSoCombobox().subscribe(
         (result)=> {
           this.lstFoundation = result;
           this.dataItem= this.lstFoundation[0];
            this.dataItem.id = Number(this.lstFoundation[0]['id']);
           this.dataItem.name = this.lstFoundation[0]['name'];
          this.dataItem.foundationCode = this.lstFoundation[0]['foundationCode'];
          this.dataItem.startDate = this.lstFoundation[0]['latitude']
          this.dataItem.status = this.lstFoundation[0]['status'];
          this.dataItem.address = this.lstFoundation[0]['address'];
          // this.dataItem.address.addressDetail = this.lstFoundation[0]['address']['addressDetail'];
          // debugger;

  //            this._addressServiceService.getCities().subscribe((res) => {
  //     if(res){
  //       this.provineName = res.filter(r => r.code+"" == this.dataItem.address.province);
  //       // console.log("Result:"+JSON.stringify(this.provineName[0].name));
  //       this._addressServiceService.getDistricts().subscribe((res1)=>{
  //         this.districtName = res1.filter(r => r.code+"" == this.dataItem.address.district);
  //         //  console.log("Result:"+JSON.stringify(this.districtName));
  //         this._addressServiceService.getWards().subscribe((res2) => {
  //           this.percentName = res2.filter(r => r.code+"" == this.dataItem.address.percinct);
  //           //  console.log("Result:"+JSON.stringify(this.percentName));
  //         })
  //       })
  //     }
  // })
    this._footballFieldFields.getListFootballField(
      this.objFilter.status,
      this.objFilter.name,
      this.objFilter.pageIndex = 0,
      this.objFilter.pageSize =100,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.foundationType,
      this.dataItem.id
      ).subscribe(
      (result)=> {
        this.result1 = result['content'];
        this.tongSoSanBong = this.result1.length;
        this.test = this.result1.filter(s => s.status == "2");
        this.soSanTrucTrac =  this.test.length;

      }
    );
         }
        );


            // this.test = this.result1.filter(s => s.status == "1");
            // this.tongSoSanBong = this.result1.length;
            // this.soSanTrucTrac =  this.result1.length;
  }
  getFootball(){
    //window.open(_url, "_blank");
    this._router.navigate(['/co-so-detail']);
  }
   addOrEditModal(_dataItem?: CoSoSanBongDto){
  // this._footballFieldFields.getListCoSoCombobox().subscribe(
  //        (result)=> {
  //          this._lstFoundation = result;
  //          this._dataItem = this._lstFoundation[0];
  //        }
  // );
    // debugger;
    const _modal =  this._modalService.create({
      nzTitle: _dataItem ? 'Sửa thông tin cơ sở kinh doanh' : 'Thêm mới ' + "cơ sở kinh doanh sân bóng" ,
        nzContent: AddOrEditCoSoSanBongComponent,
        nzWidth: window.innerWidth > 800 ? 600 : '90%',
        nzComponentParams: {
          _dataItem :  this.dataItem ?  this.dataItem :  new CoSoSanBongDto(),
        }
      });
      _modal.afterClose.subscribe((result) => {
      this.ngOnInit();
      });
  }
}

