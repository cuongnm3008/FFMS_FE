
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AppUtilityService } from '../services/app-utility.service';

@Component({
	selector: '<validation-custom>',
	template: `
   <span #mySpan class="form-control-feedback" style="display: none; margin-top: 8px; color: red;font-size: 13px;"
		[class]="isHidden ? '' : 'custom-error-validate'"
		[hidden]="isHidden">
        {{messages}}
    </span>
    <span *ngIf="isShowWarning" class="form-control-feedback custom-warning-validate" style="color: #ffa815;" >
        {{messages}}
    </span>`
})
export class ValidationCustomComponent implements OnChanges, AfterViewInit {

	@ViewChild('mySpan') _mySpan: ElementRef;

	@Input() sModel: any;
	@Input() sModelRepeat: any;
	@Input() sMaxlength: number;
	@Input() sType: "number" | "moment" | "boolean" | "boolean_true" | "email";
	@Input() messages: string;
	@Input() messagesRepeat: string;
	@Input() isNotValidateNullOrEmpty: boolean;
	@Input() nativeElement: any;

  @Input() nameField : string;

	isHidden: boolean = false;
	isShowWarning: boolean = false;
	isAfterViewInit: boolean = false;

	checkHidden(): void {
		this.messages = AppUtilityService.isNullOrEmpty(this.messages)
			? this.nameField+" không được để trống"
			: this.messages;

		this.isHidden = true;
		this.isShowWarning = false;
		if (this.sType === "boolean") {
			this.isHidden = AppUtilityService.isBoolean(this.sModel);
		}
		else if (this.sType === "number") {
			this.isHidden = AppUtilityService.isNumber(this.sModel);
		}
		else if (AppUtilityService.isNullOrWhitespace(this.sModel)) {
			this.isHidden = this.isNotValidateNullOrEmpty;
		}
		else if (this.sType == "email" && !AppUtilityService.isEmail(this.sModel)) {
			this.messages = "Email không đúng định dạng";
			this.isHidden = false;
		}
		else if (this.sType == "moment" && !AppUtilityService.isMoment(this.sModel)) {
			this.messages = "Nhập ngày/tháng/năm";
			this.isHidden = false;
		}
		else if (!AppUtilityService.isNullOrWhitespace(this.sModelRepeat) && this.sModelRepeat != this.sModel) {
			this.messages = AppUtilityService.isNullOrWhitespace(this.messagesRepeat)
				? "Giá trị nhập vào không giống nhau!"
				: this.messagesRepeat;
			this.isHidden = false;
		}
		else if (this.sType == "boolean_true" && this.sModel != true) {
			this.isHidden = false;
		}
    // if(this.sType == this.sModel){
    //   this.messages = "Nhập mật khẩu không khớp";
		// 	this.isHidden = false;
    // }
		if (this.sMaxlength > 0 && (typeof this.sModel === "string" || typeof this.sModel === "number") && this.sMaxlength <= this.sModel.toString().length) {
			this.messages = "Không được nhập quá " + this.sMaxlength + " ký tự";
			this.isHidden = !(this.sMaxlength < this.sModel.toString().length);
			//this.isShowWarning = this.sMaxlength == this.sModel.length;
		}

		if (this.isAfterViewInit && this.nativeElement && this.nativeElement.style) {
			this.nativeElement.style.cssText = this.isHidden
				? null
				: "color: #fd397a; border: 1px solid #fd397a;";
		}
	}

	ngOnChanges(_changes: SimpleChanges): void {
		if (this.isAfterViewInit) {
			this._mySpan.nativeElement.style.display = 'inline';
		}
		this.checkHidden();
	}

	ngAfterViewInit() {
		this.isAfterViewInit = true;
	}
}

@NgModule({
	declarations: [
		ValidationCustomComponent
	],
	exports: [
		ValidationCustomComponent
	],
	imports: [
		CommonModule
	],
})
export class ValidationCustomModule { }


