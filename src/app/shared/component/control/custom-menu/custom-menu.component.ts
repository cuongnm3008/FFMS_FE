import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'custom-menu',
  template: `
    <div class="wrapper">
      <button nz-button nzType="primary" (click)="toggleCollapsed()">
        <span nz-icon></span>
      </button>
      <ul nz-menu nzMode="inline" nzTheme="light" [nzInlineCollapsed]="isCollapsed">
        <li
          nz-menu-item
          nz-tooltip
          nzTooltipPlacement="right"
          [nzTooltipTitle]="isCollapsed ? 'Navigation One' : ''"
          nzSelected
        >
          <span nz-icon nzType="mail"></span>
          <span>Navigation One</span>
        </li>
        <li nz-submenu nzTitle="Navigation Two" nzIcon="appstore">
          <ul>
            <li nz-menu-item>Option 5</li>
            <li nz-menu-item>Option 6</li>
            <li nz-submenu nzTitle="Submenu">
              <ul>
                <li nz-menu-item>Option 7</li>
                <li nz-menu-item>Option 8</li>
              </ul>
            </li>
          </ul>
        </li>
        <li nz-submenu nzTitle="Navigation Three" nzIcon="setting">
          <ul>
            <li nz-menu-item>Option 9</li>
            <li nz-menu-item>Option 10</li>
            <li nz-menu-item>Option 11</li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .wrapper {
        width: 240px;
      }

      button {
        margin-bottom: 12px;
      }
    `
  ]
})
export class CustomMenuComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}

@NgModule({
	declarations: [
		CustomMenuComponent
	],
	exports: [
		CustomMenuComponent
	],
	imports: [
		CommonModule,
		FormsModule,
    NzMenuModule,
    NzToolTipModule
	]
})
export class CustomMenuModule { }
