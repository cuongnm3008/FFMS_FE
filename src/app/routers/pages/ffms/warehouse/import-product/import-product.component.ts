import { PRODUCT_CATEGORY, UserDto } from 'src/app/shared/service-proxies/system-management-service';
import {  ProductDto, ProductWarehouseDto } from './../../../../../shared/service-proxies/system-management-service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ImportProductDto, WarehouseManagementService } from '../../../../../shared/service-proxies/warehouse-management-service';
import { SystemManagementService } from './../../../../../shared/service-proxies/system-management-service';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AppMessageService } from 'src/app/shared/services/app-message.service';
import { BreadcrumbService } from 'src/app/shared/services/common/breadcrumb.service';
import { JWTAuthService } from 'src/app/shared/services/auth/jwtauth.service';
import { AppUtilityService } from 'src/app/shared/services/app-utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import-product',
  templateUrl: './import-product.component.html',
  styleUrls: ['./import-product.component.css']
})
export class ImportProductComponent implements OnInit {

  // foundationCode : string;

  constructor(
    private  _warehouseManagementService : WarehouseManagementService,
    private _router: Router,
    private _systemManagementService : SystemManagementService,
    private _breadcrumbsService : BreadcrumbService,
    private jwtAuthService: JWTAuthService,
  ) { }

  componentName ="ImportProductComponent";
  productId : number;
  listProduct:  ProductWarehouseDto[] = [];
  dataItem = new ImportProductDto();
  createBy : string;
  listEmployees : any[] = [];
  listSupplilers : any[] = [];
  PRODUCT_CATEGORY = PRODUCT_CATEGORY;

  total;
  loading = false;
  pageSize = 10;
  pageIndex = 0;
  userDto : UserDto;

  ngOnInit(): void {
    this._breadcrumbsService.setBreadcrumb(["Quản lý kho ","Nhập hàng"]);
    this._breadcrumbsService.setNameButton("");
        this._breadcrumbsService.setNewButton("");

    this.dataItem.foundationId = 1;
    this.initData();
    this.userDto = this.jwtAuthService.getUser();
  }

  initData(){
    this.getAllSuppliers();
    this.getAllUsers();
  }

  modelChangeHangle(_productId : number){
    let _productWarehouseExistDto = this.listProduct.find(x=>x.productId == _productId);
    if(_productWarehouseExistDto){
      this.listProduct.map((obj)=>{
        if(obj.productId == _productId){
          obj.amount =  obj.amount + 1;
          obj.totalPrice = obj.amount*obj.product.price;
        }
      });
    }
    else if(_productId > 0){
      this._warehouseManagementService.getProductById(_productId).subscribe(
        (result)=>{
          this.listProduct = this.listProduct || [];
          let _productWarehouseDto = new ProductWarehouseDto();
          _productWarehouseDto.productId = result['id'];
          _productWarehouseDto.product = result;
          _productWarehouseDto.importDate = new Date();
          _productWarehouseDto.supplierId = this.dataItem.supplierId;
          _productWarehouseDto.categoryId = result['categoryId'];
          _productWarehouseDto.amount = 1;
          _productWarehouseDto.price = _productWarehouseDto.product.price;
          _productWarehouseDto.totalPrice = _productWarehouseDto.product.price;
          this.listProduct.push(_productWarehouseDto);
          this.calculator();
        }
      );
    }
  }

  calculator(){
    this.dataItem.totalPrice  =  this.listProduct.reduce((a, b) => {
      return a + (b.totalPrice);
    }, 0);

    this.dataItem.totalItem =   this.listProduct.reduce((a, b) => {
      return a + (+(b.amount));
    }, 0);
  }

  amountChange(_productWarehouse : ProductWarehouseDto){
    if(_productWarehouse.amount == 0){
        AppMessageService.confirm("","Bạn có muốn xóa sản phẩm đã chọn?",
        ()=>{
          this.listProduct =  this.listProduct.filter(x=>x.id != _productWarehouse.id);
        }
      );
    }else{
      this.listProduct.map((obj)=>{
        if(obj.productId == _productWarehouse.productId){
          obj.totalPrice = obj.amount*obj.product.price;
        }
      });
    }
    this.calculator();
  }

  importPriceChange(_productWarehouse : ProductWarehouseDto){
    this.listProduct.map((obj)=>{
      if(obj.productId == _productWarehouse.productId){
        obj.price = _productWarehouse.price;
        obj.totalPrice = obj.amount*obj.price;
      }
    });
    this.calculator();
  }

  manufactureDateChange(_productWarehouse : ProductWarehouseDto){
    this.listProduct.map((obj)=>{
      if(obj.productId == _productWarehouse.productId){

        obj.manufactureDate = _productWarehouse.manufactureDate;
      }
    });
  }

  expiryDateChange(_productWarehouse : ProductWarehouseDto){
    this.listProduct.map((obj)=>{
      if(obj.productId == _productWarehouse.productId){
        obj.expriredDate = _productWarehouse.expriredDate;
      }
    });
  }



  deleteProduct(_dataItem : ProductWarehouseDto){
    this.listProduct = this.listProduct.filter(x=>x.productId != _dataItem.productId);
    this.calculator();
  }

  getAllUsers(){
    this._systemManagementService.getAll()
    .subscribe(e => {
      if(e){
        e.forEach(res => {
          this.listEmployees.push({
            id : res.id,
            name : (res.firstName +" "+res.lastName)+" - "+res.username
          })
        })
      }
    })
  }

  getAllSuppliers(){
    this._warehouseManagementService.getSuppliers(null, null, "1", 0, 1000)
    .subscribe((e) => {
      if(e){
        e.content.forEach((res) => {
          this.listSupplilers.push({
            id : res.id,
            name : res.name + " - "+res.phone
          })
        })
      }
    })
  }


  productOverview(_dataItem: ProductDto) {
    const _url = `/product-detail/${encodeURIComponent(_dataItem.id)}`;
    //window.open(_url, "_blank");
    this._router.navigate(['/product-detail', _dataItem.id]);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
  }

  importProduct(){

    if(this.listProduct.length <= 0){
      AppMessageService.warning("","Bạn chưa chọn sản phẩm để nhập hàng!!!");
    }else{

    if(AppUtilityService.isNullValidateForm("importProduct")) {
        AppMessageService.error("","Thông tin nhập liệu chưa đúng!!!!");
        return;
     }
      AppMessageService.confirm("","Bạn có chắc muốn nhập hàng hay không",
      ()=>{
        this.dataItem.lstProductWareHouses = this.listProduct;
        this.dataItem.importBy = this.userDto.username;
        this._warehouseManagementService.importProduct(this.dataItem).subscribe(
          ()=>{
            Swal.fire({
							icon: 'success',
							title: "Nhập hàng thành công!",
							showCloseButton: true,
							focusConfirm: true,
							confirmButtonText: 'Xem lịch sử nhập hàng'
						}).then((result: { isConfirmed: boolean; }) => {
							if (result.isConfirmed) {
                this._router.navigate(['/import-history']);
							}
						});
            this.listProduct = [];
            // this.dataItem = new ImportProductDto();
          }
        );
      }
      );
    }
  }
}
