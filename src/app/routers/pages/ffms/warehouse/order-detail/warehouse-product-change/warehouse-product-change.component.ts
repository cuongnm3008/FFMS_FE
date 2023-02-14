import { Component, Injector, OnInit } from '@angular/core';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';

@Component({
  selector: 'app-warehouse-product-change',
  templateUrl: './warehouse-product-change.component.html',
  styleUrls: ['./warehouse-product-change.component.css']
})
export class WarehouseProductChangeComponent  extends AppModalComponentBase implements OnInit {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }
  ngOnInit(): void {
  }


}
