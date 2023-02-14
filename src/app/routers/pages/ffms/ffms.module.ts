import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCardModule } from 'src/app/shared/component/card/card.component';
import { ValidationCustomModule } from 'src/app/shared/validator/validation-custom';
import { RolesComponent } from './roles/roles.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddOrEditEmployeeComponent } from './employee/add-or-edit/add-or-edit.component';
import { AddOrEditRoleComponent } from './roles/add-or-edit/add-or-edit.component';
import { AppTableModule } from 'src/app/shared/component/table/table.module';
import { NgxMaskModule } from 'ngx-mask';
import { RangePickerModule } from 'src/app/shared/component/control/datetime/range-picker.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PermissionTreeModule } from 'src/app/shared/component/permission-tree/permission-tree.component';
import { FFMSRoutingModule } from './ffsm-routing.module';
import { CustomMenuModule } from 'src/app/shared/component/control/custom-menu/custom-menu.component';
import { DatePickerModule } from 'src/app/shared/component/control/datetime/date-picker.component';
import { PaginationModule } from 'src/app/shared/component/control/paging/paging.component';
import { SanBongCardModule } from 'src/app/shared/component/control/custom-card/san-bong-card.component';
import { CoSoVatChatCardModule } from 'src/app/shared/component/control/custom-card/co-so-vat-chat-card.component';
import { FfmsComponent } from './ffms.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { EmployeeTableModule } from './employee/employee-table/employee-table.component';
import { RoleTableModule } from './roles/role-table/role-table.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AppButtonActionModule } from 'src/app/shared/component/control/button/button-action';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ImportExportHistoryTableModule } from 'src/app/shared/component/custom-table/import-export-history.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { AddOrEditCoSoSanBongComponent } from './ccvc-trong-san-bong/co-so-modal/add-or-edit.component';
import { CoSoComponent } from './ccvc-trong-san-bong/co-so.component';
import { DetailComponent } from './ccvc-trong-san-bong/san-bong/detail/detail.component';
import { SanBongComponent } from './ccvc-trong-san-bong/san-bong/san-bong.component';
import { SanBongModalComponent } from './ccvc-trong-san-bong/san-bong/san-bong-modal/san-bong-modal.component';
import { CoSoSanBongCardModule } from 'src/app/shared/component/control/custom-card/co-so-san-bong-card.component';
import { HangLoiTableModule } from 'src/app/shared/component/custom-table/hang-loi-table.component';
import { UploadImageModule } from 'src/app/shared/component/upload/upload-image.component';
import { HeaderFoundationModule } from 'src/app/shared/component/header-foundation/header-foundation.component';
import { AppButtonIconModule } from 'src/app/shared/component/control/button/button-icon';
import { ProductTableModule } from 'src/app/shared/component/custom-table/product-table.component';
import { SaleComponent } from './service-management/sale/sale.component';
import { TinhComboBoxModule } from 'src/app/shared/component/control/combobox/tinh-combobox.component';
import { HuyenComboBoxModule } from 'src/app/shared/component/control/combobox/huyen-combobox.component';
import { XaComboBoxModule } from 'src/app/shared/component/control/combobox/xa-combobox.component';
import { SupplierTableModule } from 'src/app/shared/component/custom-table/supplier-table.component';
import { FoundationComboBoxModule } from 'src/app/shared/component/control/combobox/foundation-combobox.component';
import { ImportHistoryTableModule } from 'src/app/shared/component/custom-table/import-history.component';
import { EnterKeyModule } from 'src/app/shared/directive/enter-key.directive';
import { DoTapWarehouseTableModule } from 'src/app/shared/component/custom-table/do-tap-warehouse-table.component';
import { FootballFieldTableModule } from 'src/app/shared/component/custom-table/football-field-table.component';
import { FoundationTableModule } from 'src/app/shared/component/custom-table/foundation-table.component';
import { MaterialFacilitiesTableModule } from 'src/app/shared/component/custom-table/material-facilities-table.component ';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { OrderDetailTableModule } from 'src/app/shared/component/custom-table/order-detail-table.component';
import { CoSoDetailComponent } from './ccvc-trong-san-bong/co-so-detail/co-so-detail.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ProductInformationComponent } from './warehouse/produc-information/product-information.component';
import { ProductInforModalComponent } from './warehouse/produc-information/product-infor-modal/product-infor-modal.component';
import { WarehouseInformationComponent } from './warehouse/warehouse-information/warehouse-information.component';
import { NhapHangModalComponent } from './warehouse/warehouse-information/nhap-hang-modal/nhap-hang-modal.component';
import { VatChatComponent } from './ccvc-trong-san-bong/san-bong/vat-chat/vat-chat.component';
import { BaoDuongVatChatComponent } from './ccvc-trong-san-bong/san-bong/bao-duong-vat-chat/bao-duong-vat-chat.component';
import { ProductDetailComponent } from './warehouse/produc-information/product-detail/product-detail.component';
import { SupplierComponent } from './warehouse/supplier/supplier.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { SupplierModalComponent } from './warehouse/supplier/supplier-modal.component';
import { OrderDetailComponent } from './warehouse/order-detail/order-detail.component';
import { SanBongDetailModalComponent } from './ccvc-trong-san-bong/san-bong/san-bong-modal/san-bong-detail-modal/san-bong-detail-modal.component';
import { ScannerComponent } from './service-management/scanner/scanner.component';
import { CustomComboBoxModule } from 'src/app/shared/component/control/combobox/custom-combobox.component';
import { ProductComboBoxModule } from 'src/app/shared/component/control/combobox/product-combobox.components';
import { CheckBoxModule } from 'src/app/shared/component/control/checkbox/checkbox.component';
import { AppComboBoxModule } from 'src/app/shared/component/control/combobox/app-combobox.component';
import { FoundationGetIdComboBoxModule } from 'src/app/shared/component/control/combobox/foundation-get-id-combobox.component';
import { RoleComboBoxModule } from 'src/app/shared/component/control/combobox/roles-combobox.component';
import { DoAnWarehouseTableModule } from 'src/app/shared/component/custom-table/do-an-warehouse-table.component';
import { UnitComboBoxModule } from 'src/app/shared/component/control/combobox/unit-combobox.component';
import { ExchangeProductComponent } from './warehouse/warehouse-information/exchange-product/exchange-product.component';
import { CustomerComponent } from './customer/customer.component';
import { BookingModalComponent } from './booking/booking-modal/booking-modal.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CustomerModalComponent } from './customer/customer-modal/customer-modal.component';
import { CustomerTableModule } from './customer/customer-table/customer-table.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RefundHistoryComponent } from './warehouse/warehouse-information/refund-history/refund-history.component';
import { ImpportHistoryComponent } from './warehouse/warehouse-information/import-history/import-history.component';
import { ImportProductComponent } from './warehouse/import-product/import-product.component';
import { CalendarComponent } from './booking/calendar/calendar.component';
import { MaintainHistoryComponentComponent } from './ccvc-trong-san-bong/maintain-history.component/maintain-history.component.component';
import { MaintainHistoryModelComponent } from './ccvc-trong-san-bong/maintain-history.component/maintain-history-model/maintain-history-model/maintain-history-model.component';
import { FoundationDetailsComponent } from './ccvc-trong-san-bong/foundation-details/foundation-details.component';
import { PasswordInputModule } from 'src/app/shared/component/input-eye/input-eye.component';
import { MaintainHistoryTableModule } from './ccvc-trong-san-bong/maintain-history.component/maintain-history-table/maintain-history-table.component';
import { CustomAutocompleteModule } from 'src/app/shared/component/control/autocomplete/auto-complete-custom.component';
import { OrderDetailViewComponent } from './warehouse/order-detail/order-detail-view/order-detail-view.component';
import { RefundHistoryTableModule } from 'src/app/shared/component/custom-table/refund-history.component';
import { ImportHistoryDetailComponent } from './warehouse/warehouse-information/import-history/import-history-detail/import-history-detail.component';
import { RefundHistoryModuleComponent } from './warehouse/warehouse-information/refund-history/refund-history-module/refund-history-module.component';
import { BookingHistoryComponent } from './booking/booking-history/booking-history.component';
import { BookingHistoryTableModule } from './booking/booking-history/booking-history-table/booking-history-table';
import { SelectMultipleModule } from 'src/app/shared/component/control/select/multiple-select.component';
import { OrderChangeComponent } from './warehouse/order-detail/order-change/order-change.component';
import { WarehouseProductChangeComponent } from './warehouse/order-detail/warehouse-product-change/warehouse-product-change.component';
import { BookingHistoryModelComponent } from './booking/booking-history/booking-history-model/booking-history-model.component';
import { ImportHistoryModelComponent } from './warehouse/warehouse-information/import-history/import-history-model/import-history-model/import-history-model.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AppProductComboBoxModule } from 'src/app/shared/component/control/combobox/app-product-combobox.component';
// import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
@NgModule({
	declarations: [
    RolesComponent,
    EmployeeComponent,
    AddOrEditEmployeeComponent,
    AddOrEditRoleComponent,
    CoSoComponent,
    AddOrEditCoSoSanBongComponent,
    DetailComponent,
    FfmsComponent,
    SanBongComponent,
    SanBongModalComponent,
    CoSoDetailComponent,
    ProductInformationComponent,
    ProductInforModalComponent,
    WarehouseInformationComponent,
    NhapHangModalComponent,
    ExchangeProductComponent,
    VatChatComponent,
    BaoDuongVatChatComponent,
    ProductDetailComponent,
    ImpportHistoryComponent,
    SaleComponent,
    SupplierComponent,
    EmployeeDetailsComponent,
    SupplierModalComponent,
    OrderDetailComponent,
    SanBongDetailModalComponent,
    ScannerComponent,
    ImportProductComponent,
    CustomerComponent,
    CalendarComponent,
    BookingModalComponent,
    CustomerModalComponent,
    MaintainHistoryComponentComponent,
    MaintainHistoryModelComponent,
    FoundationDetailsComponent,
    RefundHistoryComponent,
    OrderDetailViewComponent,
    RefundHistoryComponent,
    ImportHistoryDetailComponent,
    RefundHistoryModuleComponent,
    BookingHistoryComponent,
    OrderChangeComponent,
    WarehouseProductChangeComponent,
    BookingHistoryModelComponent,
    OrderChangeComponent,
    WarehouseProductChangeComponent,
    ImportHistoryModelComponent,
  ],
	imports: [
    FFMSRoutingModule,
		CommonModule,
		FormsModule,
    ValidationCustomModule,
    AppCardModule,
    AppTableModule,
    NzModalModule,
    NzTabsModule ,
    CustomComboBoxModule,
    RangePickerModule,
    PermissionTreeModule,
    ProductTableModule,
    CustomMenuModule,
    DatePickerModule,
    SanBongCardModule,
    PaginationModule,
    CoSoSanBongCardModule,
    CoSoVatChatCardModule,
    UploadImageModule,
    ProductComboBoxModule,
    HangLoiTableModule,
    CheckBoxModule,
    NgxMaskModule.forRoot({ validation: false }),
    NzTreeModule,
    EmployeeTableModule,
    RoleTableModule,
    NzInputModule,
    DatePickerModule,
    NzCollapseModule,
    NzCheckboxModule,
    AppButtonActionModule,
    AppButtonIconModule,
    NzTableModule,
    ImportExportHistoryTableModule,
    NzSwitchModule,
    HeaderFoundationModule,
    AppComboBoxModule,
    TinhComboBoxModule,
    HuyenComboBoxModule,
    XaComboBoxModule,
    SupplierTableModule,
    FoundationComboBoxModule,
    FoundationGetIdComboBoxModule,
    ImportHistoryTableModule,
    EnterKeyModule,
    RoleComboBoxModule,
    DoTapWarehouseTableModule,
    DoAnWarehouseTableModule,
    UnitComboBoxModule,
    NzBreadCrumbModule,
    FootballFieldTableModule,
    FoundationTableModule,
    MaterialFacilitiesTableModule,
    NzBadgeModule,
    NzToolTipModule,
    NzPaginationModule,
    OrderDetailTableModule,
    NzBadgeModule,
    NzDrawerModule,
    NzRadioModule,
    NzAvatarModule,
    NgxScannerQrcodeModule,
    ProductTableModule,
    PasswordInputModule,
    CustomAutocompleteModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzSpaceModule,
    CustomerTableModule,
    NzDatePickerModule,
    MaintainHistoryTableModule,
    RefundHistoryTableModule,
    BookingHistoryTableModule,
    SelectMultipleModule,
    NzSelectModule,
    AppProductComboBoxModule
  ]

})
export class FFMSModule { }
