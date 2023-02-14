import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JWTAuthService } from './auth/jwtauth.service';
import { CurrentLang } from './global/current-lang';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private jwtAuthService: JWTAuthService,
    private currentLang: CurrentLang,
    private router: Router,
    private modalService: NzModalService) { }

  public get(endPoint, params, headers): Observable<any> {
    this.spinner.show();
    return this.http
      .get(`${environment.apiURL}/${endPoint}`, {
        params: params,
        headers: headers,
      })
      .pipe(
        map((data) => {
          this.spinner.hide();
          return data;
        }),
        catchError((err) => {
          if (err.error.status == 401) {
            this.jwtAuthService.signout();
            this.spinner.hide();
            this.router.navigate(['/login'], {}).then(() => {
              window.location.reload();
              alert('Error Server to : ' + err.error.message);
            });

          } else {
            this.showMessageError(err.message);
          }
          this.spinner.hide();
          throw err;
        })
      );
  }

  public getNonAutho(endPoint, params, headers): Observable<any> {
    //const headers = { 'content-type': 'application/json' };
    this.spinner.show();
    return this.http
      .get(`${environment.apiURL}/${endPoint}`, {
        params: params,
        headers: headers,
      })
      .pipe(
        map((data) => {
          this.spinner.hide();
          return data;
        }),
        catchError((err) => {
          if (err.error.status == 401) {
            this.jwtAuthService.signout();
            this.spinner.hide();
            this.router.navigate(['/login'], {}).then(() => {
              window.location.reload();
              alert('Error Server to : ' + err.error.message);
            });
          } else {
            this.showMessageError(err.error.message);
          }
          this.spinner.hide();
          // return;
          throw err;
        })
      );
  }

  public getWithoutToken(endPoint, params): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    this.spinner.show();
    return this.http
      .get(`${environment.apiURL}/${endPoint}`, {
        params: params,
        headers: headers,
      })
      .pipe(
        map((data) => {
          this.spinner.hide();
          return data;
        }),
        catchError((err) => {
          if (err.error.status == 401) {
            this.jwtAuthService.signout();
            this.spinner.hide();
            this.router.navigate(['/login'], {}).then(() => {
              window.location.reload();
              alert('Error Server to : ' + err.error.message);
            });
          } else {
            this.showMessageError(err.error.message);
          }
          this.spinner.hide();
          // return;
          throw err;
        })
      );
  }

  public post(endPoint, body, params, token): Observable<any> {

    const headers = {
      'content-type': 'application/json',
      'Authorization': 'Bearer '+ token
    };
    this.spinner.show();
    return this.http
      .post(`${environment.apiURL}/${endPoint}`, body, {
        headers: headers,
        params: params,
      })
      .pipe(
        tap((data) => {
          this.spinner.hide();
          return data
        }),
        catchError((err) => {
          if (err.error.status == 401) {
            this.jwtAuthService.signout();
            this.spinner.hide();
            this.router.navigate(['/login'], {}).then(() => {
              window.location.reload();
              alert('Error Server to : ' + err.error.message);
            });
          } else {
            this.showMessageError(err.error.message);
          }
          this.spinner.hide();
          // return;
          throw err;
        })
      );
  }


  public postFromData(endPoint, body, params, token): Observable<any> {

    const headers = {
      'content-type': 'multipart/form-data',
      'Authorization': 'Bearer '+ token
    };
    this.spinner.show();
    return this.http
      .post(`${environment.apiURL}/${endPoint}`, body, {
        headers: headers,
        params: params,
      })
      .pipe(
        tap((data) => {
          this.spinner.hide();
          return data
        }),
        catchError((err) => {
          if (err.error.status == 401) {
            this.jwtAuthService.signout();
            this.spinner.hide();
            this.router.navigate(['/login'], {}).then(() => {
              window.location.reload();
              alert('Error Server to : ' + err.error.message);
            });
          } else {
            this.showMessageError(err.error.message);
          }
          this.spinner.hide();
          // return;
          throw err;
        })
      );
  }

  public postWithOutToken(endPoint, body, params): Observable<any> {

    const headers = {
      'content-type': 'application/json',
    };
    this.spinner.show();
    return this.http
      .post(`${environment.apiURL}/${endPoint}`, body, {
        headers: headers,
        params: params,
      })
      .pipe(
        tap((data) => {
          this.spinner.hide();
          return data
        }),
        catchError((err) => {
          if (err.error.status == 401) {
            this.jwtAuthService.signout();
            this.spinner.hide();
            this.router.navigate(['/login'], {}).then(() => {
              window.location.reload();
              alert('Error Server to : ' + err.error.message);
            });
          } else {
            this.showMessageError(err.error.message);
          }
          this.spinner.hide();
          // return;
          throw err;
        })
      );
  }
  public getWithoutSpinner(endPoint, params, headers): Observable<any> {
    return this.http
      .get(`${environment.apiURL}/${endPoint}`, {
        params: params,
        headers: headers,
      })
      .pipe(
        map((data) => {
          this.spinner.hide();
          return data;
        }),
        catchError((err) => {
          if (err.error.status == 401) {
            this.jwtAuthService.signout();
            this.spinner.hide();
            this.router.navigate(['/login'], {}).then(() => {
              window.location.reload();
              alert('Error Server to : ' + err.error.message);
            });
          } else {
            this.showMessageError(err.error.message);
          }
          this.spinner.hide();
          // return;
          throw err;
        })
      );
  }

  public postWithoutSpinnerAndContent(endPoint, body, params, token): Observable<any> {
    const headers = {
      'Authorization': token
    };
    return this.http
      .post(`${environment.apiURL}/${endPoint}`, body, {
        headers: headers,
        params: params,
      })
      .pipe(
        map((data) => {
          this.spinner.hide();
          return data;
        }),
        catchError((err) => {
          if (err.error.status == 401) {
            this.jwtAuthService.signout();
            this.spinner.hide();
            this.router.navigate(['/login'], {}).then(() => {
              window.location.reload();
              alert('Error Server to : ' + err.error.message);
            });
          } else {
            this.showMessageError(err.error.message);
          }
          this.spinner.hide();
          // return;
          throw err;
        })
      );
  }

  showMessageError(message: string): void {
    const modal = this.modalService.error({
      nzTitle: 'Thông báo lỗi',
      nzContent: message,
    });
    // setTimeout(() => modal.destroy(), 1000);
  }
}
