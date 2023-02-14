import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, NgModule, Output, ViewChild } from '@angular/core';

import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { isNullOrUndefinedOrEmpty } from '../../utils/DataUtils';

@Component({
  selector: 'app-perrmission-tree',
  template: `
    <nz-tree

      #nzTreeComponent
      [nzData]="listPermission"
      nzCheckable
      [nzCheckedKeys]="defaultCheckedKeys"
      (nzClick)="nzClick($event)"
      (nzContextMenu)="nzClick($event)"
      (ngModelChange)="nzSelect($event)"
      (nzCheckBoxChange)="nzCheck($event)"
    ></nz-tree>
  `
})
export class PermissionTreeComponent implements AfterViewInit {
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;
  @Input() defaultCheckedKeys = [];

  lstNumber : Array<number> = [];

  @Output() lstIdRole = new EventEmitter();
  @Input() data : any = []; // gán data cho listPermission


  @Input() listPermission : NzTreeNodeOptions[] = [];

  nzClick(event: NzFormatEmitEvent): void {
  }

  nzCheck(event: NzFormatEmitEvent): void {
    this.lstNumber = [];
    if(!isNullOrUndefinedOrEmpty(this.nzTreeComponent.nzData)){
      this.nzTreeComponent.nzData.forEach((e) => {
        if(e.checked || e.expanded){
          this.lstNumber.push((Number).parseInt(e.key));
          if(!isNullOrUndefinedOrEmpty(e.children)){
            e.children.forEach((data) => {
              if(data.checked){
                this.lstNumber.push((Number).parseInt(data.key));
              }
            })
          }
        }
      })
    }
    this.lstIdRole.emit(this.lstNumber);
  }

 nzSelect(keys: string[]): void {
    console.log(keys, this.nzTreeComponent.getSelectedNodeList());
  }

  ngAfterViewInit(): void {
    // get node by key: '10011'
    console.log("DatePipe:"+JSON.stringify(this.defaultCheckedKeys));
    // use tree methods
    console.log(
      this.nzTreeComponent.getTreeNodes(),
      this.nzTreeComponent.getCheckedNodeList(),
      this.nzTreeComponent.getSelectedNodeList(),
      this.nzTreeComponent.getExpandedNodeList()
    );
  }
}

@NgModule({
	declarations: [
		PermissionTreeComponent
	],
	exports: [
		PermissionTreeComponent
	],
	imports: [
		CommonModule,
    NzTreeModule
	]
})
export class PermissionTreeModule { }

