import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from './base/base.component';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { DashboadRoutingModule } from './dashboard-routing.module';
import { SanBongChartComponent } from './base/san-bong-chart/san-bong-chart.component';
import { ThuChiComponent } from './base/thu-chi/thu-chi.component';
import { AppComboBoxModule } from 'src/app/shared/component/control/combobox/app-combobox.component';
import { ThongKeSanBongChartComponent } from './base/thong-ke-san-bong-chart/thong-ke-san-bong-chart.component';
import { TableFootballComponent } from './base/table-football/table-football.component';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { TableWarehouseComponent } from './base/table-warehouse/table-warehouse.component';
import { BookingChartComponent } from './base/booking-chart/booking-chart.component';
import { OrderChartComponent } from './base/order-chart/order-chart.component';
import { WarehouseChartTableModule } from './base/table-warehouse/table-warehouse-ant/warehouse-table-chart.component';
import { FootballChartTableModule } from './base/table-football/football-chart-table/football-table-chart.component';
@NgModule({
	declarations: [
    BaseComponent,
    ThuChiComponent,
    SanBongChartComponent,
    ThongKeSanBongChartComponent,
    TableFootballComponent,
    TableWarehouseComponent,
    BookingChartComponent,
    OrderChartComponent,
  ],
	imports: [
		CommonModule,
		FormsModule,
    NzModalModule,
    DashboadRoutingModule,
    AppComboBoxModule,
    NzDatePickerModule,
    WarehouseChartTableModule,
    FootballChartTableModule
	],
})
export class DashboardModule { }
