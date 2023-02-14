import { Component, EventEmitter, Input, NgModule, Output } from "@angular/core";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
@Component({
  selector: "date-picker",
  template: `
      <nz-date-picker class="w-100"
        [nzDisabled]="isDisabled"
        [nzPlaceHolder]="sPlaceHolder"
        [(ngModel)]="sModel"
        (ngModelChange)="onChange($event)"
        [nzDisabledDate]="disabledDate"
        [nzFormat]="sFormat"
        [nzMode]="nzMode"
        ></nz-date-picker>
    `,
  styles: [`
      nz-date-picker {
        border-radius: 8px!important;
        height: 40px!important;
        padding: 4px 12px!important;
      }
      .ant-picker {
        border-radius: 4px;
        height: 34px!important;
      }

    `]
})
export class DatePickerComponent {

  @Input() sModel: Date;
	@Input() isDisabled?: boolean;
  @Output() onDateChange = new EventEmitter();
  @Input() sFormat : string ='dd/MM/yyyy';
  @Input() sPlaceHolder : string ='Chọn ngày';
  @Input() nzMode: string;
  constructor() { }
  disabledDate = (_current: Date): boolean => {
		return false;
	};


  onChange(result: Date): void {
    this.sModel = result;
    this.onDateChange.emit(result);
  }

}

@NgModule({
  declarations: [
    DatePickerComponent
  ],
  exports: [
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    NzDatePickerModule,
    FormsModule
  ]
})
export class DatePickerModule { }

