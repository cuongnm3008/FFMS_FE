import { HeaderComponent } from './component/header/header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ValidationCustomModule } from '../validator/validation-custom';
import { AsideComponent } from './component/aside/aside.component';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './component/footer/footer.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		NzModalModule,
		ValidationCustomModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzToolTipModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzDescriptionsModule
	],
	 declarations: [
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class LayoutModule { }
