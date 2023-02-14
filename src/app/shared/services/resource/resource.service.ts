import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWTAuthService } from '../auth/jwtauth.service';
import { BaseService } from '../base.service';

export interface IResourceDTO {
  id?: number;
  roleName?: string;
  resourceName?: string;
  status ?: string;
  icon ?: string;
  basePath ?: string;
  description ?: string;
  parentResouceId ?: string;
  createdDate ?: Date;
  createdBy ?: string;
  updatedDate ?: Date;
  updatedBy?: string;
}

export class ResourceDTO implements IResourceDTO {
  id?: number;
  roleName?: string;
  resourceName?: string;
  status?: string;
  icon ?: string;
  basePath?: string;
  description?: string;
  parentResouceId?: string;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private _baseService : BaseService,
    private _jwtAuthToken : JWTAuthService) { }

  public getResources(resourceDTO?: ResourceDTO) : Observable<ResourceDTO[]>{
    let params = {
    };
    let headers = {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+ this._jwtAuthToken.getJwtToken()
    };
    return this._baseService.get("api/v1/resources/getLstResource",params, headers);

  }

  public getAll(resourceDTO?: ResourceDTO) : Observable<ResourceDTO[]>{
    let params = {
    };
    let headers = {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+ this._jwtAuthToken.getJwtToken()
    };
    return this._baseService.get("api/v1/resources/getAll",params, headers);

  }

}
