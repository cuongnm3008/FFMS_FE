import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FoundationFieldsService } from '../../service-proxies/foundation-management-service';
import { CoSoSanBongDto } from '../../service-proxies/system-management-service';
import { CustomComboBoxModule } from '../control/combobox/custom-combobox.component';

@Component({
  selector: 'app-header-foundation',
  templateUrl: './header-foundation.component.html',
  styleUrls: ['./header-foundation.component.css']
})
export class HeaderFoundationComponent implements OnInit {

  listCoSoSanBongDto : CoSoSanBongDto[];

  constructor(private _foundationFields : FoundationFieldsService,
    ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    // this._foundationFields.getListCoSo().subscribe(data => {
    //   if(data){
    //     console.log("getListCoSo"+JSON.stringify(data));
    //     this.listCoSoSanBongDto = data;
    //   }
    // })
  }
}

@NgModule({
	declarations: [
		HeaderFoundationComponent
	],
	exports: [
		HeaderFoundationComponent
	],
	imports: [
		CommonModule,
    CustomComboBoxModule
	]
})
export class HeaderFoundationModule { }
