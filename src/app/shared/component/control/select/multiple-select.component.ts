import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import { ComboBoxBaseComponent } from '../combobox/combo-box-base.component';
@Component({
  selector: 'select-multiple',
  template: `
    <nz-select
      [nzMaxTagCount]="totalCount"
      [nzMaxTagPlaceholder]="tagPlaceHolder"
      nzMode="multiple"
      nzPlaceHolder="Chọn"
      [(ngModel)]="sModel"
      nzShowSearch
      (nzOnSearch)="search($event)"
      (ngModelChange)="sChange($event)"
      [nzDisabled]="isDisabled"
      [nzShowArrow]="true"
    >
      <nz-option *ngFor="let item of listData" [nzLabel]="item.name" [nzValue]="item.id"></nz-option>
    </nz-select>
    <ng-template #tagPlaceHolder let-selectedList>và {{ selectedList.length }} lựa chọn khác</ng-template>
  `,
  styles: [
    `nz-select {
        width: 100%;
      }
    `
  ]
})
export class SelectMultipleComponent implements OnInit {
  constructor() {

	}
  @Input() totalCount: number;
  @Input() listData: any[] = [];
  @Input() _listDataSeach: any[] = [];
  @Input() sModel : any[];
  @Input() isDisabled?: boolean;
  @Output() public sModelChange = new EventEmitter<any>();

  ngOnInit(): void {
    this._listDataSeach = this.listData;
  }

  sChange(_event){
    this.sModel = _event;
		this.sModelChange.emit(_event);
  }

  search(keyWord_: string) {
		if (this._listDataSeach) {
			this.listData =
				AppUtilityService.isNullOrEmpty(keyWord_)
					? this._listDataSeach
					: this._listDataSeach.filter(x => !AppUtilityService.isNullOrEmpty(x.name) && AppUtilityService.removeSignAndAllSpace(String(x.name)).indexOf(AppUtilityService.removeSignAndAllSpace(keyWord_)) !== -1);
		}
	}

}


@NgModule({
	declarations: [
		SelectMultipleComponent
	],
	exports: [
		SelectMultipleComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NzSelectModule,
	]
})
export class SelectMultipleModule { }
