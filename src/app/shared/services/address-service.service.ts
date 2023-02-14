import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {


  constructor(private http: HttpClient) {
   }


  public getCities(): Observable<any> {
    return this.http.get("./assets/data/cities.json");
  }

  public getDistricts(): Observable<any> {
    return this.http.get("./assets/data/districts.json");
  }

  public getWards(): Observable<any> {
    return this.http.get("./assets/data/wards.json");
  }


  // public getTinhs(): Observable<any> {
  //   return this.http.get("../thong-tin-hanh-chinh/tinh.json");
  // }

  // public getHuyens(): Observable<any> {
  //   return this.http.get("../thong-tin-hanh-chinh/huyen.json");
  // }

  // public getXas(): Observable<any> {
  //   return this.http.get("../thong-tin-hanh-chinh/xa.json");
  // }


}
