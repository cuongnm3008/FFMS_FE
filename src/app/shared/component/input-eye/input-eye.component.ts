import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'password-input',
  template: `
    <nz-input-group [nzSuffix]="suffixTemplate">
      <input
        [type]="passwordVisible ? 'text' : 'password'"
        nz-input
        [placeholder]="placeholder"
        [(ngModel)]="data"
        (ngModelChange)="onChangeInput($event)"
      />
    </nz-input-group>
    <ng-template #suffixTemplate>
      <span
        nz-icon
        [nzType]="passwordVisible ? 'eye-invisible' : 'eye'"
        (click)="passwordVisible = !passwordVisible"
      ></span>
    </ng-template>
  `,
  styles: [
    `
     nz-input-group input{
        width: 100%;
        height:100%;
      }
      i {
        cursor: pointer;
      }
      ng-template span{
        width: 100%;
      }
      nz-input{
        padding:0px 11px;
      }
    `
  ]
})

export class PasswordInputComponent implements OnInit {
  @Output() dataOutput = new EventEmitter<string>();
  @Input() placeholder;
  passwordVisible = false;

  data : string;

  ngOnInit(){

  }
  onChangeInput($event){
    this.dataOutput.emit($event);
  }
}

@NgModule({
	declarations: [
		PasswordInputComponent
	],
	exports: [
		PasswordInputComponent
	],
	imports: [
		CommonModule,
		FormsModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule
	]
})
export class PasswordInputModule { }
