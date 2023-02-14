import { SafePipe } from './../pipe/safe-pipe.component';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { SafePipeModule } from '../pipe/safe-pipe.component';
import { AppUtilityService } from '../../services/app-utility.service';

export type TypeViewFile = "url" | "base64";

@Component({
  selector: 'app-view-pdf-modal',
  templateUrl: './view-pdf-modal.component.html',
})
export class ViewPDFModalComponent implements OnInit {

  height: string;

  @Input() urlFile: string;

  @Input() value: string;

  @Input() type: TypeViewFile;

  @Input() isTemplate = false;

  ngOnInit(): void {
    this.height = window.innerHeight > 590 ? Math.ceil(window.innerHeight * 0.8) + 'px' : '600px';
    if (this.type == 'base64') {
      setTimeout(() => {
        AppUtilityService.viewsFileByBase64(this.value, "formViewsPDF");
      });
    }
  }

}

@NgModule({
  declarations: [
    ViewPDFModalComponent
  ],
  imports: [
    CommonModule,
    SafePipeModule,
  ]
})
export class AppViewPDFModule { }
