import { SupplierComponent } from './warehouse/supplier/supplier.component';
import { SaleComponent } from './service-management/sale/sale.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { EmployeeComponent } from './employee/employee.component';
import { RolesComponent } from './roles/roles.component';
import { CoSoComponent } from './ccvc-trong-san-bong/co-so.component';
import { DetailComponent } from './ccvc-trong-san-bong/san-bong/detail/detail.component';
import { SanBongComponent } from './ccvc-trong-san-bong/san-bong/san-bong.component';
import { BaseComponent } from '../../dashboard/base/base.component';
import { ProductInformationComponent } from './warehouse/produc-information/product-information.component';
import { WarehouseInformationComponent } from './warehouse/warehouse-information/warehouse-information.component';
import { ProductDetailComponent } from './warehouse/produc-information/product-detail/product-detail.component';
import { OrderDetailComponent } from './warehouse/order-detail/order-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { ImpportHistoryComponent } from './warehouse/warehouse-information/import-history/import-history.component';
import { RefundHistoryComponent } from './warehouse/warehouse-information/refund-history/refund-history.component';
import { ImportProductComponent } from './warehouse/import-product/import-product.component';
import { CalendarComponent } from './booking/calendar/calendar.component';
import { MaintainHistoryComponentComponent } from './ccvc-trong-san-bong/maintain-history.component/maintain-history.component.component';
import { FoundationDetailsComponent } from './ccvc-trong-san-bong/foundation-details/foundation-details.component';
import { BookingHistoryComponent } from './booking/booking-history/booking-history.component';

const routes: Routes = [
  {
    path: '',
    component : LayoutComponent,
    children: [
      {
        path: '',
        component : BaseComponent,
        data: { preload: true },
      },
      {
        path: 'dashboard',
        component : BaseComponent,
        data: { preload: true },
      }
      ,
      {
        path: 'employee',
        component: EmployeeComponent,
        data: { preload: true },
      },
      {
        path: 'role',
        component: RolesComponent,
        data: { preload: true },
      },
      {
        path: 'co-so-san-bong',
        component: CoSoComponent,
      },
      {
        path: 'co-so-detail/:id',
        component: SanBongComponent,
      },
      {
        path: 'co-so-detail',
        component: SanBongComponent,
      },
      {
        path: 'vat-chat/:id',
        component: DetailComponent,
      },
      {
        path: 'product-information',
        component: ProductInformationComponent,
      },
      {
        path: 'warehouse-information/:id/:type',
        component: WarehouseInformationComponent,
      },
      {
        path: 'warehouse-information/:id',
        component: WarehouseInformationComponent,
      },
      {
        path: 'warehouse-information',
        component: WarehouseInformationComponent,
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'product-detail/:id/:type',
        component: ProductDetailComponent,
      },
      {
        path: 'import-history',
        component: ImpportHistoryComponent,
      },
      {
        path: 'import-product',
        component: ImportProductComponent,
      },
      {
        path: 'refund-history',
        component: RefundHistoryComponent,
      },
      {
        path: 'sale',
        component: SaleComponent,
      },
      {
        path: 'sale/:id/:type',
        component: SaleComponent,
      },
      {
        path: 'supplier',
        component: SupplierComponent,
      },
      {
        path: 'order-detail/:type',
        component: OrderDetailComponent,
      },
      {
        path: 'order-detail',
        component: OrderDetailComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
       {
        path: 'customer',
        component: CustomerComponent,
      },
       {
        path: 'maintain-history',
        component: MaintainHistoryComponentComponent,
      },
      {
        path: 'foundation-detail',
        component: FoundationDetailsComponent,
      },
      {
        path: 'history-booking',
        component: BookingHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FFMSRoutingModule {}
