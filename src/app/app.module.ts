import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N} from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { Routes } from '@angular/router';
// import { LayoutModule } from './shared/layout/layout.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutModule } from './shared/layout/layout.module';

// registerLocaleData(en);
registerLocaleData(vi);

const routes: Routes = [];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    SharedModule,
    LayoutModule,
    // LayoutCustomerModule,
    NzLayoutModule,
    NzBreadCrumbModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
