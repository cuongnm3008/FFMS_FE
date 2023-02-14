
import { EventEmitter, Input, Output, Directive } from "@angular/core";
import { Int32ItemObj } from "src/app/shared/service-proxies/system-management-service";
import { AppUtilityService } from "src/app/shared/services/app-utility.service";

export class AInt32ItemObj {
	isDisabled!: boolean | undefined;
}

export type ComboBoxDto = Int32ItemObj;

@Directive()
export abstract class ComboBoxBaseComponent<TypeModel = string> {

	@Input() sModel: TypeModel;
	@Input() isDisabled?: boolean;
	@Input() sPlaceHolder: string = "Chọn...";
	@Input() sMode: 'multiple' | 'tags' | 'default' = 'default';

	 @Output() public sModelChange = new EventEmitter<TypeModel>();
	 @Output() public sControlChange = new EventEmitter<TypeModel>();
	 @Output() public sTextChange = new EventEmitter<string>();

  listData: ComboBoxDto[] = [];
	placeHolderSearch: string;
	protected _listDataAll: ComboBoxDto[] = [];
	protected _listDataSeach: ComboBoxDto[] = [];
	protected modelChangeFn: (value: TypeModel) => void;

	controlChange(event_: any): void {
		this.sChange(event_);
		this.sControlChange.emit(event_);
	}

	sChange(event_: TypeModel): void {
		this.sModel = event_;
		this.sModelChange.emit(event_);
		if (this.modelChangeFn) this.modelChangeFn(event_);
		if (event_) {
			var _data = this.listData.find(x => x.id.toString() === event_.toString());
			if (_data) this.sTextChange.emit(_data.name);
		} else {
			this.sTextChange.emit(undefined);
		}
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
