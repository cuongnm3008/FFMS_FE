import { MaintainHistoryVatChatDto } from './../../../../../../../shared/service-proxies/system-management-service';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { FoundationFieldsService } from 'src/app/shared/service-proxies/foundation-management-service';

@Component({
  selector: 'app-maintain-history-model',
  templateUrl: './maintain-history-model.component.html',
  styleUrls: ['./maintain-history-model.component.css']
})
export class MaintainHistoryModelComponent extends  AppModalComponentBase implements OnInit {

  constructor(
    private _footballFieldService: FoundationFieldsService,
    injector: Injector,

  ) {
    super(injector);
  }
    startDate: Date;
    endDate: Date;
    @Input() dataItem  = new MaintainHistoryVatChatDto();

    ngOnInit(): void {
      this.startDate = this.dataItem.timeToStart;
      this.endDate = this.dataItem.timeToEnd;
  }

}
