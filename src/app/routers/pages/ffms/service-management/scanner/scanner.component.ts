import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Injector } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent  extends AppModalComponentBase implements AfterViewInit {

  constructor(
    injector: Injector,
    private readonly _modalService: NzModalService,
  ) {
    super(injector);
  }
  content : string

  @ViewChild('action') scanner: NgxScannerQrcodeComponent;

  ngAfterViewInit(): void {
    this.scanner.start();

  }

  response(_data : any){
    this.content = _data;
  }

}
