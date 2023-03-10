import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  private ls = window.localStorage;
  private procedureData: string = 'ProcedureData';

  constructor() {}

  public setItem(key, value) {
    console.log(value);
    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    return true;
  }

  public getItem(key) {
    let value = this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  public clear() {
    this.ls.clear();
  }

  public clearProcedureData() {
    this.ls.removeItem(this.procedureData);
  }

}
