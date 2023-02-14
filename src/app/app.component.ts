import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JWTAuthService } from './shared/services/auth/jwtauth.service';
import { ResourceService } from './shared/services/resource/resource.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'capstone_project';
  constructor(
      private spinner: NgxSpinnerService,
      private jwtAuthService: JWTAuthService,
      private _router: Router,
      private _resourceService : ResourceService,
    ){
  }
  ngOnInit() {
    // In-house components initialization
    /** spinner starts on init */
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 3000);

    const user = this.jwtAuthService.getUser();
    if(!user)
    {
      this._router.navigate(['/login']);
    }

  }
}
