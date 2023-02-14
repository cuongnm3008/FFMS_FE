import { Injectable } from '@angular/core';
import { isNullOrUndefinedOrEmpty } from '../../utils/DataUtils';
import { JWTAuthService } from '../auth/jwtauth.service';
import { BaseService } from '../base.service';

export interface IRoleDTO {
  id?: number | undefined;
  roleCode?: string;
  roleName?: string;
  parentId?: string;
  status?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: string;
  updatedBy?: string;
  dataSearch?: string;
  lstId?: Array<number>;
  textSearch?: string;
}
export class RoleDTO implements IRoleDTO {
  id?: number;
  roleCode?: string;
  roleName?: string;
  parentId?: string;
  status?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: string;
  updatedBy?: string;
  offset?: number;
  limit?: number;
  sort?: string;
  sortBy?: string;
  dataSearch?: string;
  lstId?: Array<number>;
  textSearch?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private baseService: BaseService,
    private jwtAuthService: JWTAuthService) { }

  public getLstRole(body: any) {
    let params = {};
    let data = JSON.stringify(body);
    return this.baseService.post("api/v1/roles/searchRolesByStaff", data, params, this.jwtAuthService.getJwtToken());
  }

  public checkRoleCode(roleCode: string) {
    let params = {};
    let data = JSON.stringify({
      "roleCode": roleCode
    });
    return this.baseService.post("api/v1/roles/checkRoleCode", data, params, this.jwtAuthService.getJwtToken());
  }

  public createRole(roleDTO: RoleDTO) {
    let params = {};
    let data = JSON.stringify(roleDTO);
    return this.baseService.post("api/v1/roles/addRole", data, params, this.jwtAuthService.getJwtToken());
  }

  public updateRole(roleDTO: RoleDTO) {
    let params = {};
    let data = JSON.stringify(roleDTO);
    return this.baseService.post("api/v1/roles/update/"+roleDTO.id, data, params, this.jwtAuthService.getJwtToken());
  }

  public deleteRole(id: number) {
    let params = {};
    let data = JSON.stringify({});
    return this.baseService.post("api/v1/roles/" + id, data, params, this.jwtAuthService.getJwtToken());
  }

  public getRoleById(id: number) {
    let params = {};
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/roles/" + id, params, headers);
  }
}
