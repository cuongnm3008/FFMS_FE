import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { Component, OnInit } from '@angular/core';
import { SystemManagementService, UserDto } from 'src/app/shared/service-proxies/system-management-service';
import { Router } from '@angular/router';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { JWTAuthService } from 'src/app/shared/services/auth/jwtauth.service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _systemManagementService : SystemManagementService,
    private _router: Router,
    private modalService: NzModalService,
    private _authService: JWTAuthService
  ) { }

  dataItem = new UserDto();

  ngOnInit(): void {
  }

  submit(){
    if (AppUtilityService.isNullValidateForm("loginForm")) {
      AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
      return;
    }
    this._systemManagementService.login(this.dataItem)
    .subscribe(
      result => {
        if(result){
          this._authService.validateToken(result.accessToken, 'vi')
          .subscribe((result)=>{
            if(result){
              this._router.navigate(['/']);
            }
          });
        }
      }
    );
   }
}
