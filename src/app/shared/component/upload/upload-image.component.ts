import { OnInit, Input } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { JWTAuthService } from '../../services/auth/jwtauth.service';
import { isNullOrUndefinedOrEmpty } from '../../utils/DataUtils';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'upload-image',
  template: `
    <div class="clearfix">
      <nz-upload
        style="display: flex;"
        nzListType="picture-card"
        [nzShowButton]="true"
        [nzPreview]="handlePreview"
        [nzLimit] = "1"
        nzAction="http://103.195.239.226:8888/ffms_service/api/v1/file/upload"
        [nzHeaders]="{ Authorization: 'Bearer '+getToken() }"
        [(nzFileList)] = "fileList"
        (nzChange)="onChange($event)"
      >
        <div>
          <span nz-icon nzType="plus"></span>
          <div style="margin-top: 8px">Upload</div>
        </div>
      </nz-upload>
      <nz-modal
        [nzVisible]="previewVisible"
        [nzContent]="modalContent"
        [nzFooter]="null"
        (nzOnCancel)="previewVisible = false"
      >
        <ng-template  #modalContent>
          <img [src]="previewImage" [ngStyle]="{ width: '100%' }" />
        </ng-template>
      </nz-modal>
    </div>
  `
})
export class UploadImageComponent implements OnInit{

 @Input() fileList: NzUploadFile[];

 loading = false;
 avatarUrl?: string;
 previewImage: string | undefined = '';
 previewVisible = false;
 @Output() urlImage =  new EventEmitter<string>();

 constructor(
  private jwtAuthService: JWTAuthService
 ){

 }
  ngOnInit(): void {
  }

  onChange(event_: any){
    if(event_){
      if(!isNullOrUndefinedOrEmpty(event_.file.response.resourceURL)){
        this.urlImage.emit(event_.file.response.resourceURL)
      }
    }
  }

  getToken() {
    return this.jwtAuthService.getJwtToken();
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

}

@NgModule({
	declarations: [
		UploadImageComponent
	],
	exports: [
		UploadImageComponent
	],
	imports: [
		CommonModule,
		FormsModule,
    NzUploadModule,
    NzModalModule
	]
})
export class UploadImageModule { }
