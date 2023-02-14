import { CommonModule } from "@angular/common";
import {
	Component,
	EventEmitter,
	forwardRef,
	Input,
	NgModule,
	OnChanges,
	Output,
	SimpleChanges,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import * as moment from "moment";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NgxMaskModule } from "ngx-mask";

@Component({
	selector: "range-picker",
	template: `
        <nz-range-picker
            #datePicker
            style="width: 100%;"
			      [nzMode]="mode"
            [nzDisabled]="isDisabled"
            [(ngModel)]="sModel"
            (ngModelChange)="sChange($event)"
            [nzPlaceHolder]="['Từ ngày','Đến ngày']"
            [nzFormat]="mode == 'year' ? 'yyyy' : mode == 'month' ? 'MM/yyyy' : 'dd/MM/yyyy'"
        >
        </nz-range-picker>
    `,
})
export class RangePickerComponent implements OnChanges {

	@Input() sModelStart: moment.Moment;

	@Output() sModelStartChange = new EventEmitter<moment.Moment>();

	@Input() sModelEnd: moment.Moment;

	@Output() sModelEndChange = new EventEmitter<moment.Moment>();

	@Output() sModelChange = new EventEmitter<Array<moment.Moment>>();

	@Input() mode: 'date' | 'week' | 'month' | 'year';

	@Input() isDisabled: boolean;

	@Input() sModel = Array<Date>();

	sChange(event_: Date[]): void {
		var _momentStart = undefined;
		var _momentEnd = undefined;
		if (event_ && event_.length == 2) {
			event_ = this.convertRangeDate(event_);
			_momentStart = moment(event_[0]);
			if (moment(_momentStart).isValid()) {
				_momentStart.set({ hour: 0, minute: 0, second: 0 })
				this.sModelStartChange.emit(_momentStart);
			} else {
				this.sModelStartChange.emit(undefined);
			}

			_momentEnd = moment(event_[1]);
			if (moment(_momentEnd).isValid()) {
				_momentEnd.set({ hour: 23, minute: 59, second: 59 })
				this.sModelEndChange.emit(_momentEnd);
			} else {
				this.sModelEndChange.emit(undefined);
			}
		} else {
			this.sModelStartChange.emit(undefined);
			this.sModelEndChange.emit(undefined);
		}

		this.sModelChange.emit([_momentStart , _momentEnd]);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.sModel
			&& changes['sModelStart']
			&& changes['sModelEnd']
			&& changes['sModelStart'].currentValue
			&& changes['sModelEnd'].currentValue) {

			let _arrValue: Date[] = [];
			_arrValue.push(changes['sModelStart'].currentValue.toDate());
			_arrValue.push(changes['sModelEnd'].currentValue.toDate());
			this.sModel = this.convertRangeDate(_arrValue);
		}
		else {
			this.sModel = Array<Date>();
		}
	}

	private convertRangeDate(event_: Date[]): Date[] {
		if (event_ && event_.length == 2) {
			event_[0].setHours(0);
			event_[0].setMinutes(0);
			event_[0].setSeconds(0);

			event_[1].setHours(23);
			event_[1].setMinutes(59);
			event_[1].setSeconds(59);
		}

		return event_;
	}
}

@NgModule({
	declarations: [
		RangePickerComponent
	],
	exports: [
		RangePickerComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NzIconModule,
		NzDatePickerModule,
		 NgxMaskModule.forRoot({ validation: false }),
	]
})
export class RangePickerModule { }
