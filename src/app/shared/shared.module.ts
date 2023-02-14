import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountModule } from '../routers/account/account.module';
import { AppRoutingModule } from '../routers/app-routing.module';
import { DashboardModule } from '../routers/dashboard/dashboard.module';
import { FFMSModule } from '../routers/pages/ffms/ffms.module';
// import { TranslateModule } from '@node_modules/@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { CurrentLang } from './services/global/current-lang';
import { BaseService } from './services/base.service';

// #region third libs

// const THIRDMODULES: Type<any>[] = [TranslateModule];

// #endregion

// #region your componets & directives

const COMPONENTS: Type<any>[] = [];
const DIRECTIVES: Type<any>[] = [];

// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DashboardModule,
    AccountModule,
    FFMSModule,
    RouterModule,
    NgxSpinnerModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    // ...THIRDMODULES,
  ],
  providers: [CurrentLang, BaseService],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...SHARED_ZORRO_MODULES,
    // third libs
    // ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}
