import { CoSoSanBongDto } from 'src/app/shared/service-proxies/system-management-service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { FootballFieldInputDto, FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { AddressServiceService } from 'src/app/shared/services/address-service.service';

@Component({
  selector: 'app-co-so-detail',
  templateUrl: './co-so-detail.component.html',
  styleUrls: ['./co-so-detail.component.css']
})
export class CoSoDetailComponent extends AppModalComponentBase {

 constructor(
    injector: Injector,
     private _foundationFieldsService : FoundationFieldsService,
     private _addressServiceService: AddressServiceService,
  ) {
    super(injector);
  }
 result :any;
 result1: [];
 addrest1 :string;
 test :string;
 objFilter = new FootballFieldInputDto();
soSanTrucTrac: number;
tongSoSanBong: any;

 provineName : any;
 districtName : any;
 percentName : any;

 @Input() dataItem = new  CoSoSanBongDto();
  // soSanTrucTrac : number = this.dataItem.lstFootballFields.length;
  ngOnInit(): void {
    this.soSanTrucTrac =  this.dataItem.lstFootballFields.length;
    this.result = this._foundationFieldsService.getListFootballField(
      this.objFilter.status ,
      this.objFilter.name,
      this.objFilter.pageIndex =0,
      this.objFilter.pageSize =100,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.foundationType,
      this.objFilter.foundationId = this.dataItem.id
      ).subscribe(
      (result)=> {
        this.result1 = result['content'];
        this.tongSoSanBong = this.result1.length;
      }
    );
    this._addressServiceService.getCities().subscribe((res) => {
      if(res){
        this.provineName = res.filter(r => r.code+"" == this.dataItem.address.province);
        this._addressServiceService.getDistricts().subscribe((res1)=>{
          this.districtName = res1.filter(r => r.code+"" == this.dataItem.address.district);
          this._addressServiceService.getWards().subscribe((res2) => {
            this.percentName = res2.filter(r => r.code+"" == this.dataItem.address.percinct);
          })
        })
      }

  })
}
}

