import { FootballFielDto } from 'src/app/shared/service-proxies/system-management-service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';

@Component({
  selector: 'app-san-bong-detail-modal',
  templateUrl: './san-bong-detail-modal.component.html',
  styleUrls: ['./san-bong-detail-modal.component.css']
})
export class SanBongDetailModalComponent extends AppModalComponentBase {

 constructor(
    injector: Injector,
     private _foundationFieldsService : FoundationFieldsService,
  ) {
    super(injector);
  }
 @Input() dataItem = new  FootballFielDto();
  ngOnInit(): void {
  }

}
