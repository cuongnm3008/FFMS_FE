import { MaintainHistoryVatChatInputDto, MaintainHistoryVatChatDto } from './../../../../../shared/service-proxies/system-management-service';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { Component, Injector, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { MaintainHistoryModelComponent } from './maintain-history-model/maintain-history-model/maintain-history-model.component';

@Component({
  selector: 'app-maintain-history.component',
  templateUrl: './maintain-history.component.component.html',
  styleUrls: ['./maintain-history.component.component.css']
})
export class MaintainHistoryComponentComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private readonly _modalService: NzModalService,
    private  _systemManagementService : SystemManagementService,
      private _breadcrumbsService : BreadcrumbService,
    private _footballFieldService: FoundationFieldsService,

  )
  {
    super(injector);
   }


  timer;
   objFilter = new MaintainHistoryVatChatDto();
   lstMaintainHistory  : any = [];


  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý sân bóng","Lịch sử bảo trì"]);
    this._breadcrumbsService.setNameButton("");
    this._breadcrumbsService.setNewButton("Sân bóng");

    this.objFilter.page = 0;
     this.objFilter.size = 10;
     this.objFilter.sort = "";
     this.objFilter.sortBy = "";
    // this.fetchData();
  }


    initFilter(): void {
     this.objFilter = new MaintainHistoryVatChatDto();
     this.objFilter.page = 0;
     this.objFilter.size = 10;
     this.objFilter.sort = "";
     this.objFilter.sortBy = "";
    //  this.productCategory = 1;
     this.objFilter.textSearch = "";
    //  this.objFilter.status = "1";
     this.fetchData();
  }
     fetchData(): void {
    this.loading = true;
    this._footballFieldService.getMaintainHistory(
      this.objFilter.footballFieldName,
      this.objFilter.name,
      this.objFilter.page ,
      this.objFilter.size ,
      this.objFilter.sort ="time_to_end",
      this.objFilter.sortBy ="ascend",
      this.objFilter.status ="1",
      this.objFilter.timeToEnd,
      this.objFilter.timeToStart,
      this.objFilter.description ,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
          result['content'].forEach(element => {
            element.pageSize = this.objFilter.size;
            element.pageIndex = this.objFilter.page;
        });
        this.lstMaintainHistory = result['content'];
        this.objFilter.total = result['totalElements'];
        this.loading = false;
      }
    );
  }
 onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.page = _params.pageIndex;
    this.objFilter.size = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
      this.objFilter.sort = objSort[0]?.key == "customerCode" ? "customer_code" : objSort[0]?.key;
      this.objFilter.sortBy = objSort[0]?.value == "ascend"? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }
    this.objFilter.sort = isNullOrUndefinedOrEmpty(this.objFilter.sort) ?   "" : this.objFilter.sort;
    this.objFilter.sortBy = isNullOrUndefinedOrEmpty(this.objFilter.sortBy) ?   "" : this.objFilter.sortBy;
    this.objFilter.textSearch = isNullOrUndefinedOrEmpty(this.objFilter.textSearch) ?   "" : this.objFilter.textSearch;

    if(_params.pageIndex > 0){
      // this.objFilter.page =  this.objFilter.size -1;
      this.objFilter.page = _params.pageIndex -1;
    }
    this.fetchData();
  }
   addOrEditModal(_dataItem?: MaintainHistoryVatChatDto, _isView? : boolean,) {
    const _modal = this._modalService.create({
      nzTitle: "Thông tin lịch sử sửa chữa",
      nzContent: MaintainHistoryModelComponent,
      nzWidth: window.innerWidth > 800 ? 600 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new MaintainHistoryVatChatDto(),
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }
  searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }
}
