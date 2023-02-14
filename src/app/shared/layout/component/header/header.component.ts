import { UserDto } from './../../../service-proxies/system-management-service';
import { Component, OnInit } from '@angular/core';
import { JWTAuthService } from 'src/app/shared/services/auth/jwtauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private _jwtAuthService: JWTAuthService) { }

  userDto : any ;
  ngOnInit(): void {
   this.userDto =  this._jwtAuthService.getUser();
  }

  logout(){
    this._jwtAuthService.signout()
  }


}
