import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCardModule } from 'src/app/shared/component/card/card.component';
import { ValidationCustomModule } from 'src/app/shared/validator/validation-custom';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
	declarations: [
		LoginComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
    ValidationCustomModule,
    AppCardModule,
    AccountRoutingModule
	],
})
export class AccountModule { }
