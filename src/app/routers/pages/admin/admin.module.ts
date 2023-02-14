import { AppCardModule } from 'src/app/shared/component/card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ValidationCustomModule } from 'src/app/shared/validator/validation-custom';
@NgModule({
	declarations: [
    RoleManagementComponent
  ],
	imports: [
    CommonModule,
		FormsModule,
    ValidationCustomModule,
		// AdminRoutingModule,
    AppCardModule
	],
	providers: [
		// ArrayToTreeConverterService,
		// TreeDataHelperService
	]
})
export class AdminModule { }
