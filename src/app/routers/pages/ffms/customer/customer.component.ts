import { CustomerDto, CustomerInputDto } from './../../../../shared/service-proxies/system-management-service';
import { Component, Injector, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { SystemManagementService } from 'src/app/shared/service-proxies/system-management-service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { ViewPDFModalComponent } from 'src/app/shared/component/view-pdf/view-pdf-modal.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent extends AppComponentBase implements OnInit {

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


    objFilter = new CustomerInputDto();
    timer;
    lstCustomer : any = [];
    listFoundation: any =[];
   lstStatus : any = [
     {
       id : "1",
       name : 'Khách hàng đang liên hệ'
     },
    {
     id : "0",
     name : 'Khách hàng không còn liên hệ'
   }]

  ngOnInit(): void {
     this._breadcrumbsService.setBreadcrumb(["Quản lý thông tin","Quản lý khách hàng"]);
    this._breadcrumbsService.setNameButton("khách hàng");
    this._breadcrumbsService.setNewButton("");

    this._footballFieldService.getListCoSoCombobox().subscribe(
      (result)=> {
        this.listFoundation = result;
        this.objFilter.foundationId = Number(this.listFoundation[0]['id']);
      }
      );
      this.objFilter.status = "1";
      this.objFilter.page = 0;
     this.objFilter.size = 10;
    this.fetchData();
  }

  initFilter(): void {
     this.objFilter = new CustomerInputDto();
     this.objFilter.page = 0;
     this.objFilter.size = 10;
     this.objFilter.sort = "";
     this.objFilter.sortBy = "";
    //  this.productCategory = 1;
     this.objFilter.textSearch = "";
     this.objFilter.status = "1";
     this.fetchData();
  }
    fetchData(): void {
    this.loading = true;
    this._systemManagementService.getCustomer(
      this.objFilter.foundationId,
      this.objFilter.customerCode,
      this.objFilter.page ,
      this.objFilter.size ,
      this.objFilter.address,
      this.objFilter.fullName ,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.status,
      this.objFilter.birthDate,
      this.objFilter.textSearch
      )
    .subscribe(
      (result)=> {
         result['content'].forEach(element => {
            element.pageSize = this.objFilter.size;
            element.pageIndex = this.objFilter.page;
        });
        this.lstCustomer = result['content'];
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
      this.objFilter.page =  this.objFilter.page -1;
    }

    this.fetchData();
  }
   addOrEditModal(_dataItem?: CustomerDto, _isView? : boolean,  _isEdit? :boolean) {
    const _modal = this._modalService.create({
      nzTitle: (_dataItem ? (  _isView ? "Xem" : 'Sửa' ) : 'Thêm mới') + ' thông tin khách hàng',
      nzContent: CustomerModalComponent,
      nzWidth: window.innerWidth > 800 ? 600 : '90%',
      nzComponentParams: {
        dataItem: _dataItem ? _dataItem : new CustomerDto(),
        isView : _isView,
        isEdit : _isEdit
      },
    });

    _modal.afterClose.subscribe(result => {
			if (result) this.fetchData();
		});
  }

  delete(_dataItem?: CustomerDto){
    AppMessageService.confirm("","Bạn có chắc muốn xóa khách hàng ("+_dataItem.fullName+") hay không",
    ()=>{
      this.loading = true;
      this._systemManagementService.deleteCustomer(_dataItem).subscribe(
        ()=>{
          AppMessageService.success("Xoá khách hàng thành công!","");
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
