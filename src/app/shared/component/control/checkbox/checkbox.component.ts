import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@Component({
  selector: 'check-box',
  template: ` <label nz-checkbox [(ngModel)]="sModel" (ngModelChange)="onChange($event)">{{title}}</label> `
})
export class CheckboxComponent {

 @Input() sModel = false;
 @Input() title = true;
 @Output() onValueChange = new EventEmitter<boolean>();

 CheckboxComponent(){

 }

  onChange(_dataItem : boolean) : void{
    this.sModel = _dataItem;
    this.onValueChange.emit(this.sModel);
  }

}

@NgModule({
	declarations: [
		CheckboxComponent
	],
	exports: [
		CheckboxComponent
	],
	imports: [
		CommonModule,
		FormsModule,
    NzCheckboxModule
	]
})
export class CheckBoxModule { }
