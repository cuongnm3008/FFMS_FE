import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../../service-proxies/system-management-service';
import { LocalStoreService } from '../local-store.service';

@Injectable({
  providedIn: 'root'
})
export class JWTAuthService {

  token;
  isAuthenticated: Boolean;
  user: UserDto;

  signingIn: Boolean;
  JWT_TOKEN = 'CUSTOMER_JWT_TOKEN';
  APP_USER = 'CUSTOMER_MATX_USER';

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private modalService: NzModalService
  ) { }

  public validateToken(token: string, language: string) {
    const params = new HttpParams()
      .set('language', language);
    const headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
     }
    return this.http
      .get(`${environment.apiURL}/api/v1/user/userLogin`, { headers: headers, params: params })
      .pipe(
        map((userInfo: UserDto) => {
          this.setUserAndToken(token, userInfo, true);
          return userInfo;
        }),
        catchError((err) => {
          if (err.error.status == 401) {
            this.router.navigate(['/login'], {}).then(() => {
              window.location.reload();
              alert('Error Server to : ' + err.error.message);
              this.signout();
            });
          } else {
            if(err instanceof HttpErrorResponse){
              this.showMessageError(err.statusText)
            }else{
              this.showMessageError(err.error.message)
            }
          }
          throw err;
        })
      );
  }

  showMessageError(message: string): void {
    const modal = this.modalService.error({
      nzTitle: 'Thông báo lỗi',
      nzContent: message,
    });
    setTimeout(() => modal.destroy(), 1000);
  }
  public convertUserObject(userInfo: UserDto) {
    const user: any = {};
    return user;
  }

  public signout() {
    this.setUserAndToken(null, null, false);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/login']));
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }

  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, user: UserDto, isAuthenticated: Boolean) {
    this.signingIn = false;
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    //this.user$.next(user);

    this.ls.setItem(this.APP_USER, user);
    this.ls.setItem(this.JWT_TOKEN, token);
  }

}
