import { BookingCustomerDto } from './booking-service';
import { BookingDto } from 'src/app/shared/service-proxies/booking-service';
import { en_US } from 'ng-zorro-antd/i18n';
// import { ProductWarehouseDto } from './system-management-service';
// import { ProductDto, ProductWarehouseDto } from 'src/app/shared/service-proxies/system-management-service';
import { DATE_PIPE_DEFAULT_TIMEZONE } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JWTAuthService } from "../services/auth/jwtauth.service";
import { BaseService } from "../services/base.service";
import { isNullOrUndefinedOrEmpty } from "../utils/DataUtils";
import { ProductDto, ProductWarehouseDto, WarehouseDto } from "./system-management-service";

@Injectable({
  providedIn: 'root',
})
export class WarehouseManagementService {

  constructor(
    private baseService: BaseService,
    private jwtAuthService: JWTAuthService
  ) {

  }

  getListProducts(_name?: string, _productCode?: string, _brand?: string, _productStatus?: string, _page?: number, _size?: number, _sort?: string | null, _sortBy?: string | null,
    _categoryId?: number | string, _foundationId?: number | string, _textSearch?: string | null): Observable<ProductDto[]> {
    let params = {
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch? _textSearch : "",
      categoryId: _categoryId ? _categoryId : "",
      foundationId: _foundationId ? _foundationId : "",
      status: _productStatus ? _productStatus : "",
      name: _name ? _name : "",
      productCode: _productCode ? _productCode : "",
      brand: _brand ? _brand : ""
    }
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/products/search", params, headers);
  }

  getListOrderDetails(
    _customerName?: string,
    _status?:string|number,
    _orderCode?: string,
    _fromDate?: any,
    _toDate?:any,
    _employeeName?: string,
    _page?: number,
    _size?: number,
    _sort?: string | null,
     _sortBy?: string | null,
    _textSearch?: string | null): Observable<any[]> {

    let params  = {
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      orderCode: _orderCode ? _orderCode : "",
      employeee: _employeeName ? _employeeName : "",
      customerName: _customerName ? _customerName : "",
      status : _status,
      textSearch: _textSearch? _textSearch : "",
    }

    if(_fromDate){
      params['fromDate'] = _fromDate;
    }
    if(_toDate){
      params['toDate'] = _toDate;
    }
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/pos/search", params, headers);
  }

  getAllImportOfMonth(_year:number): Observable<any>{
    let params = {
      year: _year?_year:""
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

      return this.baseService.get("api/v1/dashbroad/getProductImportStatistics", params, headers);
  }


   getAllOrderOfMonth(_year:number): Observable<any>{
    let params = {
      year: _year?_year:""
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

      return this.baseService.get("api/v1/dashbroad/getInvoiceStatistics", params, headers);
  }
  getOrderDetailById(_orderId: string): Observable<any> {
    let params = {
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/pos/order/" + _orderId, params, headers);
  }
  getProductBySearchAll(_categoryId?: number, _foundationId?: number,
   _pageIndex?: number, _pageSize ?: number, _textSearch?: string): Observable<ProductDto[]> {
    let params = {
      page: _pageIndex,
      size: _pageSize,
      textSearch: _textSearch? _textSearch : "",
      categoryId: _categoryId ? _categoryId : "",
      foundationId: _foundationId ? _foundationId : "",
    }
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/products/getAll", params, headers);
  }
 getProductByHistoryImport(
  _importCouponCode?: string,
    _page?: number,
    _size?: number,
    _sort?: string | null,
     _sortBy?: string | null,
    _textSearch?: string): Observable<ProductDto[]> {
    let params = {
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch? _textSearch : "",
      importCouponCode: _importCouponCode ? _importCouponCode : "",
    }
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/product/history/search", params, headers);
  }

  createOrEditProduct(_productDto?: ProductDto): Observable<any> {
    let data = JSON.stringify(_productDto);
    let params = {
  };
    return this.baseService.post(_productDto?.id > 0 ? ("api/v1/products/" + _productDto?.id) : "api/v1/products", data, params, this.jwtAuthService.getJwtToken());
  }

  deleteProduct(_productDto: ProductDto): Observable<any> {
    let params = {
      lstId : _productDto.lstId,
    };
    let data = JSON.stringify(_productDto);
    return this.baseService.post("api/v1/products/delete", data, params, this.jwtAuthService.getJwtToken());
  }

  getProductById(_productId: number): Observable<any> {
    let params = {
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/products/" + _productId, params, headers);
  }


  getproductTransactionHistoryById(_productId: number | string): Observable<any> {
    let params = {
      productId: _productId ? _productId : "",
      page: 0,
      size: 5,
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/product/history/search", params, headers);
  }

  getPackageTransactionHistoryById(_oldId: number | string): Observable<any> {
    let params = {
      // oldId: 95,
      // page: 0,
      // size: 10,
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/productRefundHistory/search", params, headers);
  }

    returnPackageById(_productWarehouseDto?: ProductWarehouseDto): Observable<any> {
    let data = JSON.stringify(_productWarehouseDto);
    let params = {
        };
    return this.baseService.post("api/v1/productsWarehouse/refund/"+_productWarehouseDto.id, data, params, this.jwtAuthService.getJwtToken());
  }
  getListUnit(): Observable<any> {
    let params = {

    }
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/options/getAllTypeUnit", params, headers);
  }

  getListCategory() {
    return [
      {
        id: 1,
        name: 'Đồ ăn',
      },
      {
        id: 2,
        name: 'Đồ tập',
      },
    ];
  }

  getListProductWarehouse(
    _foundationId?: number,
    _page?: number,
    _size?: number,
    _sort?: string | null,
    _sortBy?: string | null,
    _productName?: string | null,
    _productId?: number | null,
    _supplierName?: string | null,


    // _amount?: number | null,
    _categoryId?: number | null,
    _importCouponCode?: string| null,
    _exchangeStatus?: string,
    _status?:string,
    _fromDate?: Date | null,
    _textSearch?: string | null): Observable<ProductWarehouseDto[]> {
    let params : WarehouseDto = {

      foundationId: _foundationId ? _foundationId : "",
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch ? _textSearch : "",
      productName: _productName ? _productName : "",
      supplierName: _supplierName ? _supplierName : "",
      categoryId: _categoryId ? _categoryId : "",
      importCouponCode: _importCouponCode ? _importCouponCode : "",
      returnStatus: _exchangeStatus ? _exchangeStatus : "",
      status: _status ? _status : "",

    }
    if(!isNullOrUndefinedOrEmpty(_fromDate)){
      params.fromImportDate = _fromDate;
    }

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/productsWarehouse", params, headers);
  }


  getListProductHistoryWarehouse(
    _productId?: number | string,
    _foundationId ?: number,
    _page?: number,
    _size?: number,
    _sort?: string | null,
    _sortBy?: string | null,
    _importCouponCode?: string | null,
    _supplier?: string | null,
    // _categoryId ?: number,
    _importBy?:string|null,
    _status?:string,
    _importDate?: Date | null,
    _textSearch?: string | null): Observable<ProductTransactionHistoryDto[]> {
    let params : ProductTransactionHistoryInput= {
      productId: _productId ? _productId : "",
      foundationId: _foundationId ? _foundationId : "",
      // categoryId: _categoryId ? _categoryId : "",
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch ? _textSearch : "",
      importCouponCode: _importCouponCode ? _importCouponCode : "",
      importBy: _importBy ? _importBy :"",
      // supplier: _supplier ? _supplier : "",
      status: _status ? _status : "",

    }
    if(!isNullOrUndefinedOrEmpty(_importDate)){
      params.importDate = _importDate;
    }

     let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/product/history/search", params, headers);
  }

  updateProductWarehouse(_productWarehouseDto?: ProductWarehouseDto): Observable<any> {
    let data = JSON.stringify(_productWarehouseDto);
    let params = {
    };

    return this.baseService.post("api/v1/productsWarehouse/" + _productWarehouseDto?.id, data, params, this.jwtAuthService.getJwtToken());
  }

  getSuppliers(_name: string, _phone: string, _status : string,
    _page: number, _size: number,
    _email?: string | null,
    _address?: string | null,
     _textSearch?: string | null
    ): Observable<any> {
    let params: any = {
      page: _page,
      size: _size,
      status: _status,
      name: _name ? _name : "",
      phone: _phone ? _phone : "",
      email: _email ? _email : "",
      address: _address ? _address : "",
      textSearch: _textSearch ? _textSearch : ""
    }
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/supplier/search", params, headers);
  }


  createOrUpdateSupplier(_supplierDto?: SupplierDto): Observable<any> {
    let data = JSON.stringify(_supplierDto);
    let params = {
    };
    return this.baseService.post(_supplierDto?.id > 0 ? ("api/v1/supplier/" + _supplierDto?.id) : "api/v1/supplier/create", data, params, this.jwtAuthService.getJwtToken());
  }

  deleteSupplier(_supplierDto: SupplierDto): Observable<any> {
    let params = {};
    _supplierDto.lstId = [_supplierDto.id]
    let data = JSON.stringify(_supplierDto);
    return this.baseService.post("api/v1/supplier/delete", data, params, this.jwtAuthService.getJwtToken());
  }



  importProduct(_importProductDto?: ImportProductDto): Observable<any> {
    let data = JSON.stringify(_importProductDto);
    let params = {

    };
    return this.baseService.post("api/v1/products/import", data, params, this.jwtAuthService.getJwtToken());
  }

  searchImportProduct(_searchImportProductDto?: ImportProductDto): Observable<any> {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    let params = {
      description : isNullOrUndefinedOrEmpty(_searchImportProductDto.description) ? "" : _searchImportProductDto.description,
      foundationId : isNullOrUndefinedOrEmpty(_searchImportProductDto.foundationId) ? "" : _searchImportProductDto.foundationId,
      importBy : isNullOrUndefinedOrEmpty(_searchImportProductDto.importBy) ? "" : _searchImportProductDto.importBy,
      importCouponCode : isNullOrUndefinedOrEmpty(_searchImportProductDto.importCouponCode) ? "" : _searchImportProductDto.importCouponCode,
      supplierId : isNullOrUndefinedOrEmpty(_searchImportProductDto.supplierId) ? "" : _searchImportProductDto.supplierId,
      totalPrice : isNullOrUndefinedOrEmpty(_searchImportProductDto.totalPrice) ? "" : _searchImportProductDto.totalPrice,
      status: isNullOrUndefinedOrEmpty(_searchImportProductDto.status) ? "" :_searchImportProductDto.status,
      sort: isNullOrUndefinedOrEmpty(_searchImportProductDto.sort) ? "" :_searchImportProductDto.sort,
      sortBy: isNullOrUndefinedOrEmpty(_searchImportProductDto.sortBy) ? "" :_searchImportProductDto.sortBy,
      size: isNullOrUndefinedOrEmpty(_searchImportProductDto.pageSize) ? "" :_searchImportProductDto.pageSize,
      page: isNullOrUndefinedOrEmpty(_searchImportProductDto.pageIndex)? "" : _searchImportProductDto.pageIndex,
    };

    if(!isNullOrUndefinedOrEmpty(_searchImportProductDto.importDate)){
      params['importDate'] = _searchImportProductDto.importDate;
    }
    return this.baseService.get("api/v1/products/import/search", params, headers);
  }


  searchReturnProduct(
      _page?: number,
    _size?: number,
    _sort?: string | null,
    _sortBy?: string | null,
    _textSearch?: string | null,
    _importCouponCode?:string| null,
    _productName?:string| null,
     _supplier?:string| null,
    _status?:string| null,
    _importDate?:Date |null,


    ): Observable<ReturnProductDto> {

    let params : ReturnProductInputDto =  {
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch ? _textSearch : "",
      importCouponCode: _importCouponCode ? _importCouponCode : "",
      productName: _productName ? _productName : "",
      supplier: _supplier ? _supplier : "",
      status: _status ? _status : "",
    }
     if(!isNullOrUndefinedOrEmpty(_importDate)){
      params.importDate = _importDate;
    }
    // debugger;
 let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    // if(!isNullOrUndefinedOrEmpty(_searchReturnProductDto.importDate)){
    //   params['importDate'] = _searchReturnProductDto.importDate;
    // }
    return this.baseService.get("api/v1/productRefundHistory/search", params, headers);
  }

  payment(_orderTabDto: OrderTabDto): Observable<any> {
    let orderReq = {
      "customerId": _orderTabDto.customerId,
      "customerPaid": _orderTabDto.tienKhachDua,
      "description": _orderTabDto.description,
      "discount": _orderTabDto.discount,
      "foundationId": _orderTabDto.foundationId,
      "lstProducts": _orderTabDto.products,
      "paymentId": _orderTabDto.paymentId,
      "eventSchedulerBookingId" : _orderTabDto.eventSchedulerBookingId,
    }
    let data = JSON.stringify(orderReq);
    let params = {

    };
    return this.baseService.post(_orderTabDto.id ?("api/v1/pos/update/" +_orderTabDto.id): "api/v1/pos/sale", data, params, this.jwtAuthService.getJwtToken());
  }


  pay(_orderTabDto: OrderTabDto): Observable<any> {
    let orderReq = {
      "customerId": _orderTabDto.customerId,
      "customerPaid": _orderTabDto.tienKhachDua,
      "description": _orderTabDto.description,
      "discount": _orderTabDto.discount,
      "foundationId": _orderTabDto.foundationId,
      "lstProducts": _orderTabDto.products,
      "paymentId": _orderTabDto.paymentId,
      "eventSchedulerBookingId" : _orderTabDto.eventSchedulerBookingId,
    }
    let data = JSON.stringify(orderReq);
    let params = {

    };
    return this.baseService.post("api/v1/pos/pay/" +_orderTabDto.id, data, params, this.jwtAuthService.getJwtToken());
  }

  getFilePdfByOrder(_orderId: number | string): Observable<any> {
    let params = {
      id: _orderId ? _orderId : "",
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/pos/print/"+_orderId, params, headers);
  }

  getImportPdf(_importId: number | string): Observable<any> {
    let params = {
      id: _importId ? _importId : "",
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/products/import/print/"+_importId, params, headers);
  }

  getListTrangThaiSoLuongSp() {
    return [
      {
        id: 1,
        name: 'Còn hàng',
      },
      {
        id: 2,
        name: 'Gần hết hàng',
      },
      {
        id: 3,
        name: 'Hết hàng',
      },
    ];
  }

  getListTTDoAn() {
    return [
      {
        id: "1",
        name: 'Bình thường',
      },
      {
        id: "2",
        name: 'Sắp hết hạn',
      },
      {
        id: "3",
        name: 'Hết Hạn',
      },
    ];
  }

  getListTTDoTap() {
    return [
      {
        id: "1",
        name: 'Bình thường',
      },
      {
        id: "2",
        name: 'Hỏng',
      },
    ];
  }

  getListTTDoiTra() {
    return [
      {
        id: 1,
        name: 'Hàng nhập mới',
      },
      {
        id: 2,
        name: 'Hàng đã đổi trả',
      }
    ];
  }

  getListProductStatus() {
    return [
      {
        id: "1",
        name: 'Đang kinh doanh',
      },
      {
        id: "0",
        name: 'Không kinh doanh',
      },
    ];
  }
}



export enum RETURN_STATUS {
  HANG_NHAP_MOI = 1,
  HANG_DA_DOI_TRA = 2,
  HANG_CHUA_DOI_TRA = 3,
}

export enum WAREHOUSE_STATUS {
  HANG_NHAP_MOI = 1,
  HANG_DA_DOI_TRA = 2,
}



export enum QUALITY_STATUS {
  BINH_THUONG = 1,
  SAP_HET_HAN = 2,
  HET_HAN = 3,
}


export class ProductInputDto {
  pageIndex!: number | undefined;
  pageSize!: number | undefined;
  sort!: string;
  sortBy!: string;
  textSearch!: string;
  name!: string;
  productCode!: string;
  brand!: string ;
  total!: number;
  unit!: number;
  status !: string;
}

export class WarehouseInputDto {
  pageIndex!: number | undefined;
  pageSize!: number | undefined;
  sort!: string;
  sortBy!: string;
  textSearch!: string;
  total!: number;
  categoryId!: number;
  productId!: number;
  supplierName! : string ;
  productName?: string;
  importCouponCode!: string;
  foundationId? : number ;
  startDate!: Date ;
  endDate!: Date ;
  returnStatus!:string;
  fromImportDate!:Date;

  status?: string;
}

export class SupplierDto {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: string;
  createdDate?: Date;
  lstId ?: number[] = new Array();
}

export class SupplierInputDto {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: string;
  sort?: string;
  sortBy?: string;
  createdDate?: Date;
  pageIndex?: number = 0;
  pageSize?: number = 10;
  total?: number;
  textSearch?: string;
}


export class ProductTransactionHistoryDto {
  productId?: number ;
  productName?: string;
  productWareHouseId?: number | string;
  importCouponCode?: string;
  importDate?: Date;
  supplier?: string;
  amount?: number;
  price?: number;
  totalPrice?: number;
  status?: string;
  importBy?:string;
  importByFirtsName?:string;
  importByLastName?:string;
  pageIndex?: number = 0;
  pageSize?: number = 10;
  total?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
}
export class ProductTransactionHistoryFilterDto {
  foundationId?: number |undefined;
  productCode?: string;
   productId!: number;
  productWareHouseId?: number | string;
  importCouponCode?: string;
  importDate?: Date;
  supplier?: string;
  amount?: number;
  price?: number;
  totalPrice?: number;
  status?: string;
  importBy?:string;
  importByFirtsName?:string;
  importByLastName?:string;
  size?: number = 0;
  page?: number = 10;
  total?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
  consignmentName?:string;
  name?:string ;
  categoryId?:number | string;
}

export class ProductTransactionHistoryInput {
  productId?:number | string;
  foundationId?: number | string;
  importCouponCode?: string;
  importDate?: Date;
  supplier?: string;
  status?: string;
  importBy?:string;
  importByFirtsName?:string;
  importByLastName?:string;
  size?: number;
  page?: number;
  total?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
}

export class PackageTransactionHistoryDto {
  productId?: number | string;
  productName?: string;
  categoryId?: number | string;
  oldId?: number;
  newId?: number;
  consignmentName?: string;
  newConsignmentName?: string;
  importDate?: Date;
  supplier?: string;
  amount?: number;
  price?: number;
  status?: string;
}


export class OrderTabDto {
  index?:number ;
  name?: string;
  products? : ProductDto[];
  customerId?: number;
  foundationId?:number;
  paymentId?:number;
  description?: string;
  totalPrice?: number;
  discount?: number;
  totalCartItem?: number;
  tienKhachDua? : number;
  tienThua? : number;
  thanhToan? : number;
  eventSchedulerBookingId?:number;
  status?: string;
  id?:string;

}

export class OrderDetailDto{
  id?:string;
  customerName?:string;
  codeOrder?:string;
  orderDate?:Date;
  employeeName?:string;
  lstproducts?:ProductDto [];
  pageIndex?: number = 0;
  pageSize?: number = 10;
  total?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
  amountPaid?:number;
  billNumber?:string;
  description?:string;
  discount?:string;
  paymentName?:string;
  status?:string;
  value?:string;
  totalPrice?:number;
  index?:number;
  saleOrderDetails?: any =[] ;
  eventSchedulerBookingId?:number;
  eventSchedulerBookingInfoBO?:BookingCustomerDto;
}
export class OrderDetailInputDto {
  page!: number | undefined;
  size!: number | undefined;
  sort!: string;
  sortBy!: string;
  textSearch!: string;
  orderCode!: string;
  customerName!: string ;
  employeeName!:string;
  fromDate?:Date;
  toDate?:Date;
  orderDate?:Date;
  status?: number|string;
}

export class OrderCountDto {
  page!: number | undefined;
  size!: number | undefined;
  sort!: string;
  sortBy!: string;
  textSearch!: string;
  orderCode!: string;
  customerName!: string ;
  employeeName!:string;
  fromDate?:Date;
  toDate?:Date;
  orderDate?:Date;
  status?: number|string;
}

export class ImportProductDto {
  id?:number;
  foundationId? : number;
  importBy?: string;
  importName?: string;
  importCouponCode?: string;
  lstProductWareHouses?: ProductWarehouseDto[];
  supplierId?: number;
  supplierName?: string;
  totalPrice?: number ;
  totalItem?: number;
  importDate?: Date;
  description?: string;
  status?: string;
  lstId ?: number[] = new Array();

  pageIndex?: number = 1;
  pageSize?: number = 10;
  total?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
}
export class ReturnProductDto {
  foundationId? : number;
  importBy?: string;
  importName?: string;
  importCouponCode?: string;
  // lstProductWareHouses?: ProductWarehouseDto[];
  supplierId?: number;
  supplierName?: string;
  supplier?: string;
  categoryId?:string;
  categoryName?:string;
  consignmentName?:string;
  newConsignmentName?:string;
  newId?:string;
  oldId?:string;
  price?:string;
  importDate?:Date;
  // supplier?:string;
  productId?:string;
  productName?:string;
  // totalPrice?: number ;
  // totalItem?: number;
  returnDate?: Date;
  amount?: number;
  description?: string;
  status?: string;
  pageIndex?: number = 0;
  pageSize?: number = 10;
  total?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;

}
export class ReturnProductInputDto {
  importCouponCode?: string;
  supplier?: string;
  importDate?: Date;
  productName?:string;
  status?: string;
  page?: number = 0;
  size?: number = 10;
  total?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
}


