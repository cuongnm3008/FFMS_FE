import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from 'src/app/shared/services/common/menu.service';
import { ResourceDTO } from 'src/app/shared/services/resource/resource.service';
export class MenuItem{
  id?: number;
  roleName?: string;
  resourceName?: string;
  status?: string;
  icon?: string;
  basePath?: string;
  children ?: ResourceDTO[];
  NzToolTipModule;
}

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
 isCollapsed = false;


  constructor(private _menuService : MenuService) { }

  ngOnInit(): void {
    this._menuService.getMenuitems()
    .subscribe(menuitems => {
      this._menuService.convertTreeMenuItem(menuitems);
    });
  }
toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  getMenuitems(){
    return this._menuService.getMenuItems();
  }

}
