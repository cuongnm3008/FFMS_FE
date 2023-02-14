import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import KTMenu from 'src/assets/metronic/js/menu.js';
import KTLayoutHeader from 'src/assets/metronic/js/layout-header.js';
import KTSticky from 'src/assets/metronic/js/sticky.js';
import KTScrolltop from 'src/assets/metronic/js/scrolltop.js';
import KTDrawer from 'src/assets/metronic/js/drawer.js';
import KTScroll from 'src/assets/metronic/js/scroll.js';
import { ResourceDTO, ResourceService } from '../services/resource/resource.service';
import { MenuService } from '../services/common/menu.service';
import { JWTAuthService } from '../services/auth/jwtauth.service';
import { BreadcrumbService } from '../services/common/breadcrumb.service';
import { Router } from '@angular/router';
export class MenuItem{
  id?: number;
  roleName?: string;
  resourceName?: string;
  icon?: string;
  status?: string;
  basePath?: string;
  children ?: ResourceDTO[];
}
@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  hidden = false;
  title: string;
  nameBtn: string;
  newBtn:string;
  activatedComponentReference:any

  isOtherInnerConent :boolean = true ;

	constructor(private readonly _renderer: Renderer2,
    private _menuService : MenuService,
    private _breadcrumbsService : BreadcrumbService,
     private _jwtAuthService: JWTAuthService,
     private _router: Router,
     private _resourceService : ResourceService,

     ) { }

  userDto : any ;
  width = 300;
  listResource : any[];
	ngOnInit(): void {
    this.listResource = this.listResource || [];
    this._resourceService.getResources().subscribe(
      result =>{
        result.forEach(
          item=>{
              this.listResource.push({
               name : item.basePath
             });
          }
        );
       let obj = this.listResource.find(x=> x.name == this._router.url);
       if (!obj) {
        //  this._router.navigate(['/404']);
       }
      }
    );

    this._menuService.getMenuitems()
    .subscribe(menuitems => {
      this._menuService.convertTreeMenuItem(menuitems);
    });
    this.userDto =  this._jwtAuthService.getUser();
    this.hidden = false;

      // console.log(this.nameBtn);
      // debugger;
    this.nameBtn = this._breadcrumbsService.getNameButton()
      ? this._breadcrumbsService.getNameButton() : "";


  }

  onActivate(activatedComponentReference) {
     let componentName = activatedComponentReference['componentName'];
    if (componentName == 'SaleComponent' || componentName =='ImportProductComponent' || componentName =='BaseComponent') {
      this.isOtherInnerConent = false;
    }else{
      this.isOtherInnerConent = true;
    }
    this.activatedComponentReference = activatedComponentReference;
  }

  getMenuitems(){
    return this._menuService.getMenuItems();
  }

  getBreadcrumbItems(){
    setTimeout(() =>{
      this.title = this._breadcrumbsService.getBreadcrumbs().length > 0
      ? this._breadcrumbsService.getBreadcrumbs()[this._breadcrumbsService.getBreadcrumbs().length -1] : "Trang chủ";
    },1000)
        this.nameBtn = this._breadcrumbsService.getNameButton()
      ? this._breadcrumbsService.getNameButton() : "";

       this.newBtn = this._breadcrumbsService.getNewButton()
      ? this._breadcrumbsService.getNewButton() : "";
    return this._breadcrumbsService.getBreadcrumbs();

  }
//   getNameBtn(){
//     setTimeout(() =>{
//       this.nameBtn = this._breadcrumbsService.getNameButton()
//       ? this._breadcrumbsService.getNameButton() : "";
//     },100)
//     return this._breadcrumbsService.getNameButton();
// }

  onBtnClick() {
    const childRouteComp = this.activatedComponentReference;
    childRouteComp.addOrEditModal();
 }
redirect() {
        this._router.navigate(['/import-product']);
 }
 redirectFootball() {
        this._router.navigate(['/co-so-detail']);
 }
  redirectBooking() {
        this._router.navigate(['/calendar']);
 }
  logout(){
    this._jwtAuthService.signout()
  }
	ngAfterViewInit(): void {

		// KTMenu.init();
		// KTSticky.init();
		// KTLayoutHeader.init();
		// KTScrolltop.init();
		// KTDrawer.init();
		// KTScroll.init();
	}


  headerTrigger(){
    this.isCollapsed = !this.isCollapsed;
    let classList =  document.getElementById('ffms-content').classList;
    if (classList.contains('sidbar-active')) {
      classList.remove('sidbar-active');
    }else{
      classList.add('sidbar-active');
    }
  }

}
