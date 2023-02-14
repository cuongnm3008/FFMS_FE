import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { AfterViewInit, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { MenuService } from 'src/app/shared/services/common/menu.service';
import { ResourceDTO, ResourceService } from 'src/app/shared/services/resource/resource.service';
import { RoleDTO, RoleService } from 'src/app/shared/services/role/role.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { AppMessageService } from 'src/app/shared/services/app-message.service';


@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
})
export class AddOrEditRoleComponent extends AppModalComponentBase implements OnInit, AfterViewInit {

  isDisable = true;
  roleInput : RoleDTO;
  isExistRoleCode = false;
  lstRoles : RoleDTO[] = [];
  lstResources : ResourceDTO[] = [];
  lstPermissions : NzTreeNodeOptions[] = [];
  isEditRole : boolean;
  isViewRole : boolean;
  lstIdString : Array<string> = [];
  typeSearch : any;

  @Output() loadTable = new EventEmitter();

  @Output() onLoadTableAgian = new EventEmitter();

  data = [
    {
      id : "1",
      name : "Hoạt động"
    },    {
      id : "0",
      name : "Không hoạt động "
    }
  ]
  constructor(
    injector: Injector,
    private  _modalService: NzModalService,
    private _roleService: RoleService,
    private _resourceService : ResourceService,
    private _menuService : MenuService
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    if(isNullOrUndefinedOrEmpty(this.roleInput)){
      this.roleInput = new RoleDTO();
    }else{
      this.roleInput.lstId.forEach(id => this.lstIdString.push(id+""));
    }
    this.onLoadResourceData();
  }

  async onCheckRoleCode(){
    this.lstRoles = [];
    await this._roleService.checkRoleCode(this.roleInput.roleCode)
    .subscribe(e => {
      this.lstRoles.push(...e);
    })
  }

  async onLoadResourceData(){
    this.lstResources = [];
    await this._resourceService.getAll()
    .subscribe(async  e => {
      // find list parentId is Null
      let lstResourcesWithOutParentId = e.filter(r => r.parentResouceId === null);
      lstResourcesWithOutParentId.forEach(async r => {
        let data : NzTreeNodeOptions = {
          title: '',
          key : '',
          children : [],
        }
        data.title = r.resourceName;
        let lstResourcesWithParentId  = e.filter(f => f.parentResouceId === r.id+"");
        data.key = r.id+"";
        lstResourcesWithParentId.forEach(g => {
          data.children.push({
            title : g.resourceName,
            key : g.id+"",
            isLeaf : true,
            disabled : this.isViewRole
          })
        })
        await this.lstPermissions.push(data);
      });
    });
  }

  isCheck(data : any){
    return isNullOrUndefinedOrEmpty(data);
  }

  save(){
    if(isNullOrUndefinedOrEmpty(this.roleInput.roleCode) || isNullOrUndefinedOrEmpty(this.roleInput.roleName)){
      const modal = this._modalService.warning({
        nzTitle: 'Lưu ý',
        nzContent: 'Nhập đầy đủ thông tin các trường',
      });
      setTimeout(() => modal.destroy(), 1000);
    }
    this._roleService.createRole(this.roleInput).pipe().subscribe(
      (result) => {
        if(!isNullOrUndefinedOrEmpty(result)){
          if(result.errorCode == "0"){
            AppMessageService.success("Thêm mới vai trò thành công","");
            this.close();
          }
        }
      }
    )
  }

  update(){
    if(isNullOrUndefinedOrEmpty(this.roleInput.roleName) || isNullOrUndefinedOrEmpty(this.roleInput.status)){
      const modal = this._modalService.warning({
        nzTitle: 'Lưu ý',
        nzContent: 'Nhập đầy đủ thông tin các trường',
      });
      setTimeout(() => modal.destroy(), 1000);
    }
    this._roleService.updateRole(this.roleInput).pipe().subscribe(
      (result) => {
        if(!isNullOrUndefinedOrEmpty(result)){
          if(result.errorCode == "0"){
            this._menuService.getMenuitems()
            .subscribe(menuitems => {
              this._menuService.convertTreeMenuItem(menuitems);
            });
            AppMessageService.success("Cập nhật vai trò thành công","");
            this.onLoadResourceData();
            this.close(true);
          }
        }
      }
    )
  }
}
