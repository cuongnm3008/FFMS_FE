import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  breadcrumbs : Array<string>;
  nameBtn: string ;
  newBtn: string;

  constructor() { }

  setBreadcrumb(datas : Array<string>) : void{
    this.breadcrumbs = datas;
  }

  getBreadcrumbs(){
    return this.breadcrumbs;
  }
  setNameButton(name : string) :void{
    this.nameBtn = name;
  }
  getNameButton(){
    return this.nameBtn;
  }
   setNewButton(name : string) :void{
    this.newBtn = name;
  }
  getNewButton(){
    return this.newBtn;
  }
}
