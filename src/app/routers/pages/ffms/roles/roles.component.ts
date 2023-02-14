import { Component, Injector, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LazyLoadEvent } from 'primeng/api';
import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { AddOrEditRoleComponent } from './add-or-edit/add-or-edit.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { RoleDTO, RoleService } from 'src/app/shared/services/role/role.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { DatePipe } from '@angular/common';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
})
export class RolesComponent extends AppComponentBase {
  lstroles : any = [];
  total : number;
  isLoading: boolean = true;
  datePipe : DatePipe;
  textSearch : string | undefined;
  timeout: any = null;
  isViewRole : boolean;
  roleFilterData : RoleDTO = new RoleDTO();

  breadcrumbs : Array<string> = [];

timer;
  lstStatus : any = [
  {
    id : "1",
    name : 'Hoạt động'
  },
  {
    id : "0",
    name : 'Không hoạt động'
  }
  ]
  constructor(
    private  _modalService: NzModalService,
    private  _roleService : RoleService,
    private _breadcrumbsService : BreadcrumbService,
    injector: Injector,
  ) {
    super(injector);
   }

  //  _dataItem  = new UserDto();

  //  eDate : Moment ;
  //  sDate : Moment;

  // objFilter = new EmployeeInputDto();

  ngOnInit(): void {
    this.roleFilterData.status = "1";
    this.datePipe = new DatePipe('en-Us');
    this._breadcrumbsService.setBreadcrumb(["Quản lý thông tin","Quản lý vai trò"]);
    this._breadcrumbsService.setNameButton("vai trò");
    this._breadcrumbsService.setNewButton("");


    // this.getDataGrids();
  }

  onChangeQuery(params: NzTableQueryParams){
    var sortObj = params.sort.filter(e => e.value != null);
    let sort : string;
    let sortBy : string;
    if(!isNullOrUndefinedOrEmpty(sortObj)){
      sort = sortObj[0].key;
      sortBy = ((sortObj[0].value == "ascend") ? "asc" : "desc");
    }
    this.onLoadRoles(params.pageIndex-1 , params.pageSize, sort, sortBy, null, null, "1");
  }

  onLoadRoles(page?: number, size?: number, sort?: string, sortBy?: string,
     roleCode?: string, roleName?: string, status?: string, textSearch?: string, createdDate?: Date
     ){
    this.isLoading = true;
    this.lstroles = [];
    let body : RoleDTO = {
      offset :  page,
      limit: size,
      sort : isNullOrUndefinedOrEmpty(sort) ? "" : sort,
      sortBy : isNullOrUndefinedOrEmpty(sortBy) ? "" : sortBy,
      roleCode : isNullOrUndefinedOrEmpty(roleCode) ? "" : roleCode,
      roleName : isNullOrUndefinedOrEmpty(roleName) ? "" : roleName,
      status : isNullOrUndefinedOrEmpty(status) ? "" : status,
      createdDate : isNullOrUndefinedOrEmpty(createdDate) ? null : createdDate,
      textSearch : isNullOrUndefinedOrEmpty(textSearch) ? "" : textSearch
    }
    setTimeout(() => {
      this._roleService.getLstRole(body).subscribe(
        result =>{
          result.content.forEach(record => {
            record.createdDate = this.datePipe.transform(new Date(record.createdDate));
            record.offset = result.number;
            record.limit = result.size;
          });
          this.lstroles = result.content;
          this.total = result.totalElements;
          this.isLoading = false;
        });
    }, 500);
  }

  initFilter(){
    this.roleFilterData = new RoleDTO();
    this.getDataGrids();
  }


  onChange(event?){
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
        $this.onLoadRoles(0, 10, null, null,null,
          null, $this.roleFilterData.status, $this.roleFilterData.dataSearch);
    }, 1000);
    this.getDataGrids()
  }

  getDataGrids(_event?: LazyLoadEvent): void {
    this.onLoadRoles(0, 10, null, null,
      this.roleFilterData.roleCode, this.roleFilterData.roleName,
       this.roleFilterData.status, this.roleFilterData.textSearch, this.roleFilterData.createdDate);
  }

  addOrEditModal(_dataItem?: any){
    const _modal = this._modalService.create({
      nzTitle: _dataItem ? 'Sửa' : 'Thêm mới ' + " vai trò" ,
        nzContent: AddOrEditRoleComponent,
        nzWidth: window.innerWidth > 1000 ? 950 : '90%',
        nzComponentParams: {
        }
      });
      _modal.afterClose.subscribe((result) => {
        if (result) {
          this.onChange();
          this.getDataGrids();
        }
      });
    }


    // delete(_dataItem: any){
    //   const modal = this._modalService.warning({
    //     nzTitle: 'Bạn có muốn xóa vai trò có mã '+_dataItem.code+' này không?',
    //     nzContent: '<b style="color: red;">Lưu ý hãy kiểm tra kỹ trước khi xóa mã vai trò này</b>',
    //     nzOkText: 'Xóa',
    //     nzOkType: 'primary',
    //     nzOkDanger: true,
    //     nzOnOk: () => {
    //       this._roleService.deleteRole(_dataItem.id)
    //       .subscribe((result) =>{
    //         if(!isNullOrUndefinedOrEmpty(result)){
    //           if(result.errorCode == "0"){
    //             this.onChange();
    //             this._modalService.closeAll();
    //           }
    //         }
    //       })
    //     },
    //     nzCancelText: 'Hủy',
    //     nzOnCancel: () => this._modalService.closeAll()
    //   });
    // }
    delete(_dataItem: any){
    AppMessageService.confirm("","Bạn có chắc muốn xóa mã vai trò (" + _dataItem.code + ") hay không",
    ()=>{
      this.loading = true;
      if(_dataItem.id == 1){
         AppMessageService.warning("Không thể xoá mã vai trò này ","");
      }
      else{
        this._roleService.deleteRole(_dataItem.id).subscribe(
          ()=>{
            AppMessageService.success("Xoá mã vai trò thành công!","");
            this.loading = false;
            this.getDataGrids();
          }
        );
      }
    }
    );
  }

    edit($event){
      this._roleService.getRoleById($event)
      .pipe().subscribe((role) =>{
        const _modal = this._modalService.create({
          nzTitle: "Sửa vai trò" ,
            nzContent: AddOrEditRoleComponent,
            nzWidth: window.innerWidth > 1000 ? 950 : '90%',
            nzComponentParams: {
              roleInput : role,
              isEditRole : true
            },
        });
        _modal.afterClose.subscribe((result) => {
          if (result) {
            this.onChange();
             this.getDataGrids();
          }
        });
      });
    }

    view($event){
      this._roleService.getRoleById($event)
      .pipe().subscribe((role) =>{
        const _modal = this._modalService.create({
          nzTitle: "Xem chi tiết vai trò" ,
            nzContent: AddOrEditRoleComponent,
            nzWidth: window.innerWidth > 1000 ? 950 : '90%',
            nzComponentParams: {
              roleInput : role,
              isViewRole : true
            },
        });
        _modal.afterClose.subscribe((result) => {
          if (result) {
            this.onChange();
          }
        });
      });
    }
 searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.getDataGrids();
    }, 1000)
  }

}
