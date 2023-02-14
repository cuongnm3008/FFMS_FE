import { Moment } from 'moment';
import { EmployeeInputDto, SystemManagementService, UserDto } from 'src/app/shared/service-proxies/system-management-service';
import { Component, Injector } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddOrEditEmployeeComponent } from './add-or-edit/add-or-edit.component';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { LazyLoadEvent } from 'primeng/api';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { DatePipe } from '@angular/common';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import * as cloneDeep from 'lodash/cloneDeep';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls : ["./employee.component.css"]
})
export class EmployeeComponent extends AppComponentBase  {
  constructor(
    private  _modalService: NzModalService,
    private  _systemManagementService : SystemManagementService,
    private _footballFieldService: FoundationFieldsService,
    private _ngxSpinnerService : NgxSpinnerService,
    private _breadcrumbsService : BreadcrumbService,
    private drawerService: NzDrawerService,
    injector: Injector,
  ) {
    super(injector);
   }
   _dataItem  = new UserDto();
    timer;
   timeout: any = null;
   lstusers : any = [];
   isLoading: boolean = true;
  //  typeSearch : string;
   foundationCode : string;
   isDisabled :boolean = true;
   lstStatus : any = [
     {
       id : "1",
       name : 'Đang làm việc'
     },
    {
     id : "0",
     name : 'Đã nghỉ việc'
   }]


  eDate : Moment ;
  sDate : Moment;
  datePipe : DatePipe;
  foundationFieldName:string;

  params: NzTableQueryParams;
  lstCoSo : any = [];

  isCollapseActive : boolean  = false;

  objFilter = new EmployeeInputDto();

  listGender : any[];
  listFoundation: any[];

  ngOnInit(): void {
    this.initFilter();
    // this._dataItem.foundationCode = "CS_DD_I";
    this._breadcrumbsService.setBreadcrumb(["Quản lý thông tin","Quản lý nhân viên"]);
    this._breadcrumbsService.setNameButton("nhân viên");
    this._breadcrumbsService.setNewButton("");
    this.listGender = this._systemManagementService.getListGender();

    //  this._footballFieldService.getListCoSoCombobox().subscribe(
    //   (result)=> {
    //     this.listFoundation = result['content'];
    //     this.foundationFieldName = this.listFoundation[0]['name'];
    //     // this.objFilter.total = result['totalElements'];
    //     // this.loading = false;
    //   }
    //  );
       this._footballFieldService.getListCoSoCombobox().subscribe(
         (result)=> {
           this.listFoundation = result;
          //  this.dataItem.foundationFieldId = Number(this.lstFoundation[0]['id']);
          //  this.objFilter.foundationId = this.dataItem.foundationFieldId;
           this.foundationFieldName = this.listFoundation[0]['name'];
         }
        );

    //  debugger;
    // this.foundationCode = this.listFoundation[0]['foundationCode'];

    this.foundationCode = "CS_DD_I";

  }

  initFilter(){
    this.objFilter = new EmployeeInputDto();
    this.objFilter.statusSearch = "1";
    this.objFilter.pageIndex = 0;
    this.objFilter.pageSize = 10;
    this.objFilter.sort = "";
    this.objFilter.sortBy = "";
    this.objFilter.textSearch = "";
    this.fetchData();
    // this.getDataGrids();
    this.datePipe = new DatePipe('en-Us');
    this._ngxSpinnerService.hide();
    this.foundationCode = "CS_DD_I";
  }

    fetchData(): void {
    this.loading = true;
    this._systemManagementService.getListEmployees(
      this.objFilter.gender,
      this.foundationCode,
      this.objFilter.pageIndex,
      this.objFilter.pageSize,
      this.objFilter.sort,
      this.objFilter.sortBy,
      this.objFilter.startDate,
      this.objFilter.endDate,
      this.objFilter.roleSearch,
      this.objFilter.textSearch,
      this.objFilter.statusSearch,
      this.objFilter.fullname,
      this.objFilter.username).subscribe(
        result =>{
          this.tableHelper.totalRecordsCount = result.totalElements;
          this.tableHelper.currentPage = result.currentPage;
          this.tableHelper.defaultRecordsCountPerPage = result.size;
          this.tableHelper.records = result.content;
          this.tableHelper.hideLoadingIndicator();
          result.content.forEach(element => {
            let roles = "";
            let index = 0;
            element.role.forEach(role => {
              if (index != 0){
                roles += role.roleName+",";
              }
              index++;
            });
            element.otherRoles = roles.slice(0, roles.length - 1);
            element.createdDate = this.datePipe.transform(new Date(element.createdDate));
            element.birthDate = this.datePipe.transform(new Date(element.birthDate));
            element.fullName = (element.firstName + " " + element.lastName);
            element.permanentAddress = !isNullOrUndefinedOrEmpty(element.addresses) ? element.addresses[0].addressDetail : "";
            element.temporaryAddress = element.addresses.length > 1 ? element.addresses[1].addressDetail : "";
            element.pageSize = this.objFilter.pageSize;
            element.pageIndex = this.objFilter.pageIndex;
          });
          this.objFilter.pageSize = result.size;
          this.objFilter.pageIndex = result.currentPage;
          this.lstusers = result.content;
          this.objFilter.total = result.totalElements;
          this.isLoading = false;
        });
    }

  onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.pageIndex = _params.pageIndex;
    this.objFilter.pageSize = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
       this.objFilter.sort = objSort[0]?.key == "username" ? "username" : objSort[0]?.key;
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

  addOrEditModal(_dataItem?: UserDto){
    const _modal =  this._modalService.create({
        nzTitle: (_dataItem ? 'Sửa' : 'Thêm mới') + " thông tin nhân viên" ,
        nzContent: AddOrEditEmployeeComponent,
        nzWidth: window.innerWidth > 1000 ? 950 : '90%',
        nzComponentParams: {
          _dataItem : _dataItem ? cloneDeep(_dataItem) : new UserDto(),
          isView : _dataItem ? true : false,
        }
      });

      _modal.afterClose.subscribe((result) => {
        if(result){
          this.fetchData();
        }
      });
    }


    // delete(_dataItem: any){
    //   const modal = this._modalService.warning({
    //     nzTitle: 'Bạn có muốn xóa nhân viên mã '+_dataItem.code+' này không?',
    //     nzContent: '<b style="color: red;">Lưu ý hãy kiểm tra kỹ trước khi xóa mã nhân viên này</b>',
    //     nzOkText: 'Xóa',
    //     nzOkType: 'primary',
    //     nzOkDanger: true,
    //     nzOnOk: () => {
    //       this._systemManagementService.deleteEmployee(_dataItem.id)
    //       .subscribe((result) =>{
    //       })
    //     },
    //     nzCancelText: 'Hủy',
    //     nzOnCancel: () => this._modalService.closeAll()
    //   });
    //   modal.afterClose.subscribe(() => {
    //     this.initFilter();
    //   });
    // }
    delete(_dataItem: any){
    AppMessageService.confirm("","Bạn có chắc muốn xóa mã nhân viên (" + _dataItem.code + ") hay không",
    ()=>{
      this.loading = true;
      this._systemManagementService.deleteEmployee(_dataItem.id).subscribe(
        ()=>{
          AppMessageService.success("Xoá khách hàng thành công!","");
          this.loading = false;
          this.fetchData();
        }
      );
    }
    );
  }
    ViewDetail(_dataItem?: UserDto){
      const _modal =  this._modalService.create({
          nzTitle: _dataItem ? 'Thông tin nhân viên' : 'Thêm mới ' + "thông tin nhân viên" ,
          nzContent: EmployeeDetailsComponent,
          nzWidth: window.innerWidth > 1000 ? 950 : '90%',
          nzComponentParams: {
            dataItem : _dataItem ? cloneDeep(_dataItem) : new UserDto(),
          }
        });

        _modal.afterClose.subscribe((result) => {
          if(result){
            this.fetchData();
          }
        });
      }

    edit(_dataItem : UserDto ){
        const _modal = this._modalService.create({
          nzTitle: "Sửa thông tin nhân viên" ,
            nzContent: AddOrEditEmployeeComponent,
            nzWidth: window.innerWidth > 1000 ? 950 : '90%',
            nzComponentParams: {
              _dataItem : cloneDeep(_dataItem),
              isEdit : true
            },
        });
        _modal.afterClose.subscribe(() => {
          this.initFilter();
        });
}

searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }


}
