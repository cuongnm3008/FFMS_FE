import { ScannerComponent } from './../scanner/scanner.component';
import { ProductDto, PRODUCT_CATEGORY, SystemManagementService} from './../../../../../shared/service-proxies/system-management-service';
import { Component, OnInit } from '@angular/core';
import { OrderTabDto, WarehouseInputDto, WarehouseManagementService } from 'src/app/shared/service-proxies/warehouse-management-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import * as cloneDeep from 'lodash/cloneDeep';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { ViewPDFModalComponent } from 'src/app/shared/component/view-pdf/view-pdf-modal.component';
import { BookingService, SlotDto } from 'src/app/shared/service-proxies/booking-service';
import Swal from 'sweetalert2';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(
    private  _warehouseManagementService : WarehouseManagementService,
    private _systemManagementService : SystemManagementService,
    private readonly _modalService: NzModalService,
    private _breadcrumbsService : BreadcrumbService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _bookingService: BookingService,

  ) { }

  componentName ="SaleComponent";

  listProduct : ProductDto[];
  listProductClone : ProductDto[];

  visible = false;
  pageIndex : number ;
  // listCartItem : ProductDto[];
  isNote : boolean = false ;

  tabs : OrderTabDto[];

  selectedIndex = 0;
  paymentMethod : boolean = true;
  listCustomer : any[] ;
  loading = false;
  foundationId  = 1 ;
  categoryId = PRODUCT_CATEGORY.DO_AN;

  type: any;
  tienSan : number;
  timer : any;
  bookingId : number ;
  bookingDto : any;
  slotDto : SlotDto;
  orderDetailId : any ;
  formSubmit : string ;
  isPaid :boolean = false;
  closeTab(  index : number ) {
    this.tabs = this.tabs || [];
    // this.tabs = this.tabs.filter(x=>x.index != index);
    this.tabs.splice(index, 1);
    this.selectedIndex -=1;
  }

  newTab() {
    this.selectedIndex = this.tabs.length;
    let obj = new OrderTabDto();
    obj.index = this.selectedIndex;
    obj.products = obj.products || [];
    obj.name = 'Hóa đơn ' + (this.selectedIndex + 1);
    this.tabs = this.tabs || [];
    this.tabs.push(obj);
  }

  ChangeTab() {
    let obj = new OrderTabDto();
    // obj.name = this._Customer;
  }

  objFilter = new WarehouseInputDto();

  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý dịch vụ","Tạo hóa đơn"]);
    this._breadcrumbsService.setNameButton("");
    this._breadcrumbsService.setNewButton("");


    let obj = new OrderTabDto();
    obj.index = 0;
    this.tabs = this.tabs || [];
    this.tabs.push(obj);

    this.listCustomer = this.listCustomer || [];

    this.initTabParam();

    this._systemManagementService.getAll()
    .subscribe(e => {
      if(e){
        e.forEach(res => {
          this.listCustomer.push({
            id : res.id,
            name : (res.firstName +" "+res.lastName)+" - "+res.username
          })
        })
      }
    })

    this._activatedRoute.params.subscribe((params) => {
      this.type = params['type'];

      if(this.type == 'payment_slot'||this.type == 'payment'){
        this.posProduct();
      }

      if(this.type=='payment_slot'){
        this.bookingId = params['id'];
        this.fetchDataBooking(this.bookingId);
      }

      if (this.type == 'payment') {
      this._breadcrumbsService.setBreadcrumb(["Quản lý dịch vụ","Thanh toán hóa đơn"]);
      this.orderDetailId = params['id'];
        this._warehouseManagementService.getOrderDetailById(this.orderDetailId).subscribe(
          result=>{
            this.fetchDataBooking(result?.content[0]?.eventBookingId);
            this.tabs[this.selectedIndex].discount = result?.content[0]?.discount;
            this.tabs[this.selectedIndex].tienKhachDua = result?.content[0]?.amountPaid;
            this.tabs[this.selectedIndex].products = this.tabs[this.selectedIndex].products || [];
            result['content'].forEach(item => {
              let productDto = new ProductDto();
              productDto.id = item.productId;
              productDto.productCode = item.productCode;
              productDto.name = item.productName;
              productDto.price = item.price;
              productDto.totalAmount = item.amount;
              productDto.lstChangeProductImportHistories = item.lstChangeProductImportHistories;
              productDto.totalAmountReality =  productDto.totalAmount;

              if (item?.lstProductImportHistories) {
                productDto.originAmount = item?.lstProductImportHistories[0]?.amount;
              }

              if (item?.lstChangeProductImportHistories) {
                productDto.totalAmountReality = item?.lstChangeProductImportHistories[0]?.amount;
                if (productDto.totalAmountReality !=   productDto.originAmount) {
                  productDto.isAmountChange = true;
                }
              }

              productDto.lstProductImportHistories = item.lstProductImportHistories;
              this.tabs[this.selectedIndex].products.push(productDto);
            });
            this.caculatorMoney();
          }
        );
      }
    });

 // Khoi tao ban dau
    this.objFilter.pageIndex = 1;
    this.objFilter.pageSize = 6;
    this.objFilter.sort = "";
    this.objFilter.sortBy = "";
    this.objFilter.textSearch = "";
    this.objFilter.status = "1";
    this.fetchData();
}

fetchDataBooking(bookingId? :number){
  if(bookingId > 0){
  this._bookingService.getBookingById(bookingId).subscribe(
    response=>{
      this.bookingDto = response;
      this.slotDto = this.listSlot.filter(x=>x.id == response['slot'])[0];
      this.tabs[this.selectedIndex].totalPrice += (this.bookingDto['price'] -  this.bookingDto['deposit']);
      this.tabs[this.selectedIndex].thanhToan =  this.tabs[this.selectedIndex].totalPrice;
      this.caculatorMoney();
    }
  );
  }
}

  listSlot = [
    {
      id: 1,
      name: 'Ca 1',
      time: '7h30-9h'
    },
    {
      id: 2,
      name: 'Ca 2',
      time: '9h-10h'
    },
    {
      id: 3,
      name: 'Ca 3',
      time: '14h30-16h'
    },
    {
      id: 4,
      name: 'Ca 4',
      time: '16h-17h30'
    },
    {
      id: 5,
      name: 'Ca 5',
      time: '17h30-19h'
    },
    {
      id: 6,
      name: 'Ca 6',
      time: '19h-20h30'
    },
    {
      id: 7,
      name: 'Ca 7',
      time: '20h30-22h'
    }
  ]

  initTabParam(){
    this.tabs[this.selectedIndex].totalCartItem = 0;
    this.tabs[this.selectedIndex].totalPrice = 0;
    this.tabs[this.selectedIndex].discount = 0;
    this.tabs[this.selectedIndex].thanhToan = 0;
    this.tabs[this.selectedIndex].tienKhachDua = 0;
    this.tabs[this.selectedIndex].tienThua = 0;
  }

  fetchData(){
    this._warehouseManagementService.getProductBySearchAll(
      this.categoryId,
      this.foundationId,
      this.objFilter.pageIndex -1,
      this.objFilter.pageSize,
      this.objFilter.textSearch
    )
    .subscribe(
      (result)=> {
        this.listProduct = result['content'];
        this.listProductClone =  cloneDeep(result['content']);
        this.objFilter.total = result['totalElements'];
      }
    );
  }

  pageIndexChange(_index : number ){
    this.objFilter.pageIndex = _index;
    this.fetchData();
  }


  modelChangeHangle(_productId : number){
    this.tabs[this.selectedIndex].products = this.tabs[this.selectedIndex].products || [];
    let _productExistDto = (this.tabs[this.selectedIndex].products).find(x=> x.id == _productId);
    if(_productExistDto){
      this.tabs[this.selectedIndex].products.map((obj)=>{
        if(obj.id == _productId)
          obj.totalAmount += 1;

      });
    }
    else if(_productId > 0){
      this._warehouseManagementService.getProductById(_productId).subscribe(
        (result)=>{
          result['totalAmount'] = 1;
          this.tabs[this.selectedIndex].products.push(result);
        }
      );
    }
  }

  checkProductEnoughOrNot(_productId : number){
    let totalAmount = this.listProduct.find(x => x.id = _productId).totalAmount;
    if (totalAmount > 0) {
      return true;
    } else {
      return false;
    }
  }

  totalAmountChange(_productDto : ProductDto){
    if (_productDto.totalAmount == 0) {
      AppMessageService.confirm("","Bạn có muốn xóa sản phẩm đã chọn?",
        ()=>{
          this.deleteProduct(_productDto);
        }
      );
    } else{
      let productWarehouseDto = this.listProductClone.find(x=> x.id == _productDto.id);
      this.tabs[this.selectedIndex].products.map((obj)=>{
        if(obj.id == _productDto.id){
          let totalSelected = _productDto.totalAmount;
          if (totalSelected > productWarehouseDto.totalAmount) {
            obj.message = "Số lượng chọn lớn hơn số lượng có trong kho";
            this.caculatorAmount(_productDto.id,0);
            this.caculatorMoney();
          }
          else{
           this.caculatorAmount(_productDto.id,_productDto.totalAmount);
           this.caculatorMoney();
            obj.message = "";
          }
          if (totalSelected < 0) {
            obj.message = "Số lượng chọn phải lớn hơn 0";
          }
        }
      });
    }
  }

  discountChange(discount : number){
    this.caculatorMoney();
  }

  isMessageTienKhachDua: string;
  tienKhachDuaChange(totalMoney: number ){
    this.isMessageTienKhachDua = (this.tabs[this.selectedIndex].tienKhachDua < this.tabs[this.selectedIndex].thanhToan) ? "Tiền khách đưa không được nhỏ hơn tiền thanh toán" : "";
    this.caculatorMoney();
  }

  addProduct(_dataItem : ProductDto){
    if(_dataItem.totalAmount > 0){
      this.tabs[this.selectedIndex].products = this.tabs[this.selectedIndex].products || [];
      let _productExistDto = (this.tabs[this.selectedIndex].products).find(x=> x.id == _dataItem.id);
      if(_productExistDto){
        this.tabs[this.selectedIndex].products.map((obj)=>{
          if(obj.id == _dataItem.id)
          obj.totalAmount += 1;
        });
      }
      else{
        let productClone = cloneDeep(_dataItem);
        productClone.totalAmount = 1;
        productClone.totalPrice = _dataItem.price;
        this.tabs[this.selectedIndex].products = this.tabs[this.selectedIndex].products || [];
        this.tabs[this.selectedIndex].products.push(productClone);
      }
      this.listProduct.map((obj)=>{
        if (obj.id == _dataItem.id) {
          obj.totalAmount =  obj.totalAmount - 1;
        }
      });
      this.caculatorMoney();
    }
    else{
      AppMessageService.warning("","Số lượng mặt hàng đã hết, vui lòng chọn mặt hàng khác!!!");
    }
  }


  caculatorAmount(_productId : number, totalSelected : number){
    this.listProductClone = this.listProductClone || [];
    let totalAmountBegin = this.listProductClone.find(x=>x.id ==_productId)?.totalAmount;
    this.listProduct.map((obj)=>{
      if(obj.id == _productId)
        obj.totalAmount =  totalAmountBegin - totalSelected ;
    });
  }

  caculatorMoney(){
    if(this.tabs[this.selectedIndex].products){
      this.tabs[this.selectedIndex].totalCartItem = this.tabs[this.selectedIndex].products.reduce((a, b) => {
        return a + (+(b.totalAmount));
      }, 0);

      this.tabs[this.selectedIndex].totalPrice = this.tabs[this.selectedIndex].products.reduce((a, b) => {
        return a + (+(b.price*b.totalAmount));
      }, 0);

      if(this.bookingDto?.price){
        this.tabs[this.selectedIndex].totalPrice += this.bookingDto?.price - this.bookingDto?.deposit;
      }
    }

    if(this.tabs[this.selectedIndex].discount > 0){
     this.tabs[this.selectedIndex].thanhToan = this.tabs[this.selectedIndex].totalPrice *(1- (this.tabs[this.selectedIndex].discount)/100);
    }else{
      this.tabs[this.selectedIndex].thanhToan = this.tabs[this.selectedIndex].totalPrice;
    }

    if(this.tabs[this.selectedIndex].tienKhachDua > 0 && (this.tabs[this.selectedIndex].tienKhachDua >= this.tabs[this.selectedIndex].thanhToan)){
      this.tabs[this.selectedIndex].tienThua =  this.tabs[this.selectedIndex].thanhToan - this.tabs[this.selectedIndex].tienKhachDua;
    }
  }


  deleteProduct(_dataItem : ProductDto){
    this.tabs[this.selectedIndex].products = this.tabs[this.selectedIndex].products.filter(x=>x.id != _dataItem.id);
    this.caculatorAmount(_dataItem.id,0);
    this.caculatorMoney();
  }

  payment(_dataItem : OrderTabDto){
    if (AppUtilityService.isNullValidateForm("createOrder")) {
      AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
      return;
   }
    if (_dataItem.products ||this.type) {
      AppMessageService.confirm("","Bạn muốn tạo hóa đơn",
      ()=>{
          _dataItem.foundationId = 1;
          _dataItem.paymentId = 1;
          _dataItem.customerId = this.bookingDto?.customer?.id;
          _dataItem.eventSchedulerBookingId = +this.bookingId;
          if (_dataItem.products) {
            _dataItem.products.map(
              (obj)=>{
                obj.amount = obj.totalAmount;
              }
            );
          }
          _dataItem.id = this.orderDetailId;
          _dataItem.tienKhachDua = _dataItem.totalPrice;
          this._warehouseManagementService.payment(_dataItem).subscribe(
            (res)=>{
              this.isPaid = true;
              if(res){
                Swal.fire({
                  icon: 'success',
                  title:  "Tạo hóa đơn thành công!",
                  showCloseButton: true,
                  focusConfirm: true,
                  confirmButtonText:  'Xem hóa đơn vừa tạo'
                }).then((result: { isConfirmed: boolean; }) => {
                  if (result.isConfirmed) {
                    this._router.navigate(['/order-detail']);
                  }
                });
              }
            }
          );
        }
      );
    }else{
      AppMessageService.warning("","Vui lòng chọn sản phẩm!!!");
    }
  }


  paymentSlot(_dataItem : OrderTabDto){
    if (AppUtilityService.isNullValidateForm("createOrder")) {
      AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
      return;
      }
      AppMessageService.confirm("", "Bạn muốn thanh toán hóa đơn?",
      ()=>{
          _dataItem.foundationId = 1;
          _dataItem.paymentId = 1;
          _dataItem.customerId = this.bookingDto?.customer?.id;
          _dataItem.eventSchedulerBookingId = +this.bookingId;
          if (_dataItem.products) {
            _dataItem.products.map(
              (obj)=>{
                obj.amount = obj.totalAmount;
              }
            );
          }
          _dataItem.id = this.orderDetailId;
          _dataItem.tienKhachDua = _dataItem.totalPrice;
          this._warehouseManagementService.payment(_dataItem).subscribe(
            (res)=>{
              this.isPaid = true;
              if(res){
                Swal.fire({
                  icon: 'success',
                  title:  "Thanh toán hóa đơn thành công!",
                  showCloseButton: true,
                  focusConfirm: true,
                  confirmButtonText:'Xem hóa đơn vừa thanh toán'
                }).then((result: { isConfirmed: boolean; }) => {
                  if (result.isConfirmed) {
                    this._router.navigate(['/order-detail/paid']);
                  }
                });
              }
            }
          );
        }
      );
  }


  pay(_dataItem : OrderTabDto){
    let isConfirmAll = true ;
    if (AppUtilityService.isNullValidateForm("createOrder")) {
      AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
      return;
    }
    if ( this.type == 'payment') {
      _dataItem.products.forEach(
        (item)=>{
          if(item.isAmountChange == true && item.isConfirm == null){
            isConfirmAll = false;
            AppMessageService.warning("","Bạn cần xác nhận sự thay đổi để thanh toán");
            return;
          }
        }
      );
    }

    if(!isConfirmAll){
      // AppMessageService.warning("","Bạn cần xác nhận sự thay đổi để thanh toán");
    }else{
      if (_dataItem.products ||this.type) {
        AppMessageService.confirm("", "Bạn muốn thanh toán hóa đơn?",
        ()=>{
            _dataItem.foundationId = 1;
            _dataItem.paymentId = 1;
            _dataItem.customerId = this.bookingDto?.customer?.id;
            _dataItem.eventSchedulerBookingId = +this.bookingId;
            if ( this.type == 'payment') {
              _dataItem.products = _dataItem.products.filter(x=>x.isConfirm == true);
            }
            if (_dataItem.products) {
              _dataItem.products.map(
                (obj)=>{
                  obj.amount = obj.totalAmount;
                }
              );
            }
            _dataItem.id = this.orderDetailId;
            _dataItem.tienKhachDua = _dataItem.totalPrice;
            this._warehouseManagementService.pay(_dataItem).subscribe(
              (res)=>{
               this.isPaid = true;
                if(res){
                  Swal.fire({
                    icon: 'success',
                    title: "Thanh toán hóa đơn thành công!",
                    showCloseButton: true,
                    focusConfirm: true,
                    confirmButtonText: 'Xem hóa đơn vừa thanh toán'
                  }).then((result: { isConfirmed: boolean; }) => {
                    if (result.isConfirmed) {
                      this._router.navigate(['/order-detail/paid']);
                    }
                  });
                }
              }
            );
          }
        );
      }
    }
  }


  close(): void {
    this.visible = false;
  }

  productOverview(_dataItem : ProductDto){
    const _url = `/product-detail/${encodeURIComponent(_dataItem.id)}`;
    // window.open(_url, "_blank");
    this._router.navigate([ `/product-detail/${encodeURIComponent(_dataItem.id)}/sale`]);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
  }



  checkOptionsOne = [
    { label: 'Đồ ăn', value: '1', checked: true },
    { label: 'Đồ tập', value: '2', checked: false },
  ];

  updateSingleChecked(_value : any[]): void {
    if (this.checkOptionsOne[0].checked && !this.checkOptionsOne[1].checked ) {
      this.categoryId = PRODUCT_CATEGORY.DO_AN;
    }else if(!this.checkOptionsOne[0].checked && this.checkOptionsOne[1].checked){
      this.categoryId = PRODUCT_CATEGORY.DO_TAP;
    }else {
      this.categoryId = null;
    }
    this.fetchData();
  }

  isbooking : boolean = false;

  posProduct(){
    this.isbooking = !this.isbooking;
    const productSection = document.getElementById('product-section');
    if (this.isbooking) {
      productSection.classList.add('collapsible');
    }else{
      productSection.classList.remove('collapsible');
    }

  }

  searchHandle(){
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
        this.fetchData();
    }, 1000)
  }

  confirm(_dataItem : ProductDto){
      this.tabs[this.selectedIndex].products.map((obj)=>{
        if(obj.id == _dataItem.id)
        obj.isConfirm = true;
    });
  }

  rejectItem(_dataItem : ProductDto){
    this.tabs[this.selectedIndex].products.map((obj)=>{
      if(obj.id == _dataItem.id)
      obj.isConfirm = false;
  });
}

unDo(_dataItem : ProductDto){
    this.tabs[this.selectedIndex].products.map((obj)=>{
      if(obj.id == _dataItem.id)
      obj.isConfirm = undefined;
  });
}

}
