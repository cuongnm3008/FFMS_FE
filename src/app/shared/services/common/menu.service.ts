import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../../layout/layout.component';
// import { MenuItem } from '../../layout/component/aside/aside.component';
import { JWTAuthService } from '../auth/jwtauth.service';
import { BaseService } from '../base.service';
import { ResourceDTO } from '../resource/resource.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu$: MenuItem[];

  constructor(private _baseService : BaseService,
    private _jwtAuthService : JWTAuthService) { }

  getMenuitems(){
    let params = {};
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._jwtAuthService.getJwtToken()
    };
    return this._baseService.get("api/v1/resources/getLstResource", params, headers);
  }
  convertTreeMenuItem(lstResource : ResourceDTO[]) {
    let menuItems  : MenuItem[] = [];
    var lstResourcesWithOutParentId = lstResource.filter(e => e.parentResouceId === null);
    lstResourcesWithOutParentId.forEach(r => {
      var data : MenuItem = new MenuItem();
      data.resourceName = r.resourceName;
      data.icon = r.icon;
      data.id =r.id;
      var lstResourcesWithParentId = lstResource.filter(f => f.parentResouceId === r.id+"");
      data.basePath = r.basePath;
      let children : Array<ResourceDTO> = new Array<ResourceDTO>();
      lstResourcesWithParentId.forEach(g => {
        children.push({
          id: g.id,
          roleName: g.roleName,
          icon: g.icon,
          resourceName: g.resourceName,
          parentResouceId : g.parentResouceId,
          basePath : g.basePath
        })
      })
      data.children = children;
      menuItems.push(data);
    })
    this.setMenuItems(menuItems);
  }
  public getMenuItems(){
    return this.menu$;
  }

  public setMenuItems(data : any){
    this.menu$ = data;
  }
}
