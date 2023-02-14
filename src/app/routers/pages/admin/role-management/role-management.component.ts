import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {

  constructor(
    private readonly _modalService: NzModalService,
  ) { }

  ngOnInit(): void {
  }

  createOrEdit(_dataItem?: any){
    // this._modalService.create({
    //     nzTitle: "Thêm hoặc sửa cái gì đó",
    //     nzContent: CustomerComponent,
    //     nzWidth: window.innerWidth > 1000 ? 950 : '90%',
    //     nzComponentParams: {
    //     }
    //   });




    }
}
