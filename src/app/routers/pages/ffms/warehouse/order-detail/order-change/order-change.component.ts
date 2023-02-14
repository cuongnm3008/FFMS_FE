import { WarehouseProductChangeComponent } from './../warehouse-product-change/warehouse-product-change.component';
import { Component, Injector, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppModalComponentBase } from 'src/app/shared/common/AppModalComponentBase';
import { OrderDetailDto, WarehouseInputDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { PRODUCT_CATEGORY } from 'src/app/shared/service-proxies/system-management-service';
import { BookingService, OrderProductDto, OrderProductWarehouse, SubmitOrderProductChangeDto } from 'src/app/shared/service-proxies/booking-service';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';

@Component({
  selector: 'app-order-change',
  templateUrl: './order-change.component.html',
  styleUrls: ['./order-change.component.css']
})
export class OrderChangeComponent  extends AppModalComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private readonly _modalService: NzModalService,
    private  _warehouseManagementService : WarehouseManagementService,
    private _bookingService: BookingService,
    private _router: Router,
  ) {
    super(injector);
  }
  categoryId = PRODUCT_CATEGORY.DO_AN;
  listProduct : any [];
  textSearch : string;
  dataItem : OrderDetailDto;
  bookingDto : any;
  lstItem = new Array<OrderProductDto>();
  listProductWarehouse = new Array<any>();
  lstIdSuggestProducts : number[];
  submitDto = new SubmitOrderProductChangeDto();
  isConfirm : boolean = false;
  isConfirmSuccess = false;

  ngOnInit(): void {
     this.fetchProductWarehouse(1);
  }



  fetchDataBooking(bookingId? :number){
    if(bookingId > 0){
    this._bookingService.getBookingById(bookingId).subscribe(
      result=>{
      if (result) {
        this.bookingDto = result;
      }});
    }
  }

   fetchProductWarehouse(_productCategory :number) : any {
   let  objFilter = new WarehouseInputDto();
   objFilter.pageIndex = 0;
   objFilter.pageSize = 500;
   objFilter.sort = "";
   objFilter.sortBy = "";
   objFilter.textSearch = "";
   objFilter.status = "1";

    this._warehouseManagementService.getListProductWarehouse(
      objFilter.foundationId,
      objFilter.pageIndex,
      objFilter.pageSize,
      objFilter.sort = "import_date",
      objFilter.sortBy = "ascend",
      objFilter.productName,
      objFilter.productId,
      objFilter.supplierName,
      _productCategory,
      objFilter.importCouponCode,
      objFilter.returnStatus,
      objFilter.status,
      objFilter.startDate,
      objFilter.textSearch
    )
    .subscribe(
       result => {
      let list = new Array<any>();
       result['content'].forEach(
        item => {
         if (item.amount > 0) {
            list.push({
              id : item.id,
              productCode: item?.product?.productCode,
              name : item.importCouponCode +"_"+ item?.product?.productCode +"- Sl :"+item.amount,
              importCouponCode : item.importCouponCode,
              productId:item?.productId,
              supplierId : item?.supplierId,
              price: item?.product?.price
            }
          );}
        });
        this._warehouseManagementService.getOrderDetailById(this.dataItem.id).subscribe(
            (result)=> {
              if(result){
                this.lstItem = result.content;
                this.lstItem.forEach(
                  item=>{
                    item.listProductWarehouse = list.filter(x=>x.productCode == item.productCode);
                  }
                );
                this.fetchDataBooking(this.dataItem.eventSchedulerBookingId);
              }
            }
        );
       }
    );
  }

  addProductWarehouse(_productWarehouseId : number,cartItemId? : number){
   if (_productWarehouseId > 0) {
    this.lstItem.forEach(
      item=>{
        if (cartItemId  == item.id) {
          let pw = item.listProductWarehouse.find(x=>x.id == _productWarehouseId);
          pw.amount = 1;
          item.pwChange = pw;
        }
      }
    );
   }
  }

  deletePWC(cartItemId? : number){
    this.lstItem.forEach(
      item=>{
        if(cartItemId == item.id){
          item.pwChange = null;
        }
      }
    );

  }

  approve(cartItemId? : number){
    this.lstItem.forEach(
      item=>{
        if(item.pwChange.amount > 0){
          if(cartItemId == item.id){
            item.pwChange.status = '1';
            item.messageAmount = "";
          }
        }else{
          item.messageAmount = "Số lượng không được trống";
        }
      }
    );
  }


  amountChange(_amount:number, pwcId:number,cartItemId? : number){
    this.lstItem.forEach(
      item=>{
        if(cartItemId == item.id){
          item.pwChange.amount =_amount;
        }
      }
    );
  }

  confirmAll() {
    if (AppUtilityService.isNullValidateForm("orderChangeForm")) {
      AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
      return;
   }
    AppMessageService.confirm("","Xác nhận thông tin lấy hàng",
    ()=>{

      this.isConfirm = true;
      this.lstItem.forEach(
        item=>{
          if (item.pwChange) {
            if (item.pwChange?.amount > 0) {
              item.pwChange.status = '1';
              item.messageAmount = "";
            }else{
              item.messageAmount = "Số lượng không được trống";
              return;
            }
          }
        }
      );

      this.submitDto.orderId = this.dataItem.id;
      this.submitDto.type = '1';
      this.lstItem.forEach(
        (item)=>{
          let lstIdSuggestProducts = new Array<number>();
          let lstProductWarehoue =  new Array<any>();

          if(item.lstProductImportHistories){
            item.lstProductImportHistories.forEach(
              item1=>{
                lstIdSuggestProducts.push(item1.id);
            });
          }

          if (item.pwChange) {
           lstProductWarehoue.push(
            {
              id : item.pwChange.id,
              amount : item.pwChange.amount,
              productId: item.pwChange.productId,
              supplierId : item.pwChange.supplierId,
              price: item.pwChange.price
           });
          }

          if (lstProductWarehoue.length > 0) {
            this.submitDto.lstSuggestProducts.push(
              {
                lstIdSuggestProducts : lstIdSuggestProducts,
                lstProductWarehoue : lstProductWarehoue
              }
          );}

        }
      );

      this.isConfirmSuccess = true ;
      this._bookingService.approveOrder(this.submitDto).subscribe(
        ()=>{
          Swal.fire({
            icon: 'success',
            title: "Xác nhận thành công!",
            showCloseButton: true,
            focusConfirm: false,
            // confirmButtonText: 'Thanh toán đơn hàng'
          }).then((result: { isConfirmed: boolean; }) => {
            if (result.isConfirmed) {
              // this._router.navigate([`/sale/${encodeURIComponent(this.submitDto.orderId)}/payment`]);
            }
          });
        }
      );
    });
  }

  save(){
    this._router.navigate([`/sale/${encodeURIComponent(this.submitDto.orderId)}/payment`]);
    this.close();
  }

}
