import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidatorDTO } from '../model/validation-dto';
import { JWTAuthService } from '../services/auth/jwtauth.service';
import { BaseService } from '../services/base.service';
import { isNullOrUndefinedOrEmpty } from '../utils/DataUtils';
import { SupplierDto, ImportProductDto } from './warehouse-management-service';

export interface IPhoneDTO {
  id?: number ;
  userId?: number ;
  phone?: string ;
}
export class PhoneDTO implements IPhoneDTO {
  id?: number ;
  userId?: number ;
  phone?: string ;
}

export interface IObjFilter{
  page : number ;
  size : number ;
  sort: string ;
  sortBy : string ;
  textSearch : string ;
}

export interface IUserDto {
  id?: number ;
  username?: string ;
  password?: string ;
  firstName?: string ;
  lastName?: string ;
  parentId?: string ;
  pitchCode?: string ;
  about?: string ;
  email?: string ;
  profile?: string ;
  phones?: Array<PhoneDTO>;
  gender?: string ;
  birthDate?: Date ;
  otherInfomation?: string ;
  address?: Array<AddressDTO> ;
  type?: string ;
  language?: string ;
  page?: number ;
  size?: number ;
  sort?: string ;
  sortBy?: string ;
  fromDate?: Date ;
  toDate?: Date ;
  typeSearch?: string ;
  role?: string ;
  phone?: string ;
  textSearch?: string ;
  phone1?: string ;
  phone2?: string ;
  province?: string ;
  district?: string ;
  percinct?: string ;
  addressDetail?: string ;
  province1?: string ;
  district1?: string ;
  percinct1?: string ;
  addressDetail1?: string ;
  lstRoles?: Array<number> ;
  enable?: string ;
  foundationCode?: string ;

}

export class UserDto implements IUserDto {
  id?: number ;
  username?: string ;
  password?: string ;
  firstName?: string ;
  lastName?: string ;
  parentId?: string ;
  pitchCode?: string ;
  about?: string ;
  email?: string ;
  profile?: string ;
  phones?:PhoneDTO[] = new Array<PhoneDTO>;
  gender?: string ;
  birthDate?: Date ;
  otherInfomation?: string ;
  addresses?: AddressDTO[] = new Array<AddressDTO>;
  type?: string ;
  language?: string ;
  page?: number ;
  size?: number ;
  sort?: string ;
  sortBy?: string ;
  fromDate?: Date ;
  toDate?:Date;
  createdDate?: Date ;
  typeSearch?: string ;
  role?: any ;
  phone?: string ;
  textSearch?: string ;
  phone1?: string ;
  phone2?: string ;
  province?: string ;
  district?: string ;
  percinct?: string ;
  addressDetail?: string ;
  province1?: string ;
  district1?: string ;
  percinct1?: string ;
  addressDetail1?: string ;
  lstRoles?:number[];
  status?: string ;
  foundationCode?: string ;
  foundationName?: string;
  fullName?: string = this.firstName +" " + this.lastName;
  image?: string;
  enable?: string ;


  constructor(data?: IUserDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
export interface IAddressDTO {
  province: string ;
  district: string ;
  percinct: string ;
  addressDetail: string ;
  type: string ;

}

export class AddressDTO implements IAddressDTO {
  province: string ;
  district: string ;
  percinct: string ;
  addressDetail: string ;
  type: string ;
  fullAddress? : string;
}

export interface IEmployeeInputDto {
  sorting: string ;
  skipCount: number ;
  maxResultCount: number ;
  startDate: Date ;
  endDate: Date ;
  filter: string ;
}
export class EmployeeInputDto implements IEmployeeInputDto {
  sorting!: string ;
  skipCount!: number;
  maxResultCount!: number;
  startDate!: Date ;
  endDate!: Date ;
  filter!: string ;
  roleSearch! : string;
  fullname! : string;
  username!: string;
  gender!: string;
  statusSearch : string = "1";
  pageIndex!: number | undefined;
  pageSize!: number | undefined;
  sort!: string;
  sortBy!: string;
  textSearch!: string;
  total!: number;


  constructor(data?: IEmployeeInputDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class SystemManagementService {
  constructor(
  private _http : HttpClient,
  private baseService : BaseService,
  private jwtAuthService : JWTAuthService
  ){

  }

  login(_userDto : UserDto) : Observable<any> {
    let body = JSON.stringify(_userDto);
    return this.baseService.postWithOutToken("auth/v1/signin",body,null);
  }

  createOrEditEmployee(_userDto : UserDto) : Observable<any> {
    let params = {};
    let data = JSON.stringify(_userDto);
    return this.baseService.post("api/v1/staff/create", data, params, this.jwtAuthService.getJwtToken());
  }
  updateEditEmployee(_userDto: UserDto): Observable<any> {
    let params = {};
    let data = JSON.stringify(_userDto);
    return this.baseService.post(
      'api/v1/staff/'+_userDto.id,
      data,
      params,
      this.jwtAuthService.getJwtToken()
    );
  }
  validate(_validate : ValidatorDTO):Observable<any> {
    let params = {};
    let data = JSON.stringify(_validate);
    return this.baseService.post(
      'api/v1/staff/validatate',
      data,
      params,
      this.jwtAuthService.getJwtToken()
    );
  }

  getListEmployees(
    _gender?: string | null,
    _foundationCode?: string | null,
    page?: number,
    size?: number,
    sort?: string | null,
    sortBy?: string | null,
    fromDate?: Date | null,
    toDate?: Date | null,
    role?: string | null,
    textSearch?: string,
    status?: string | null,
    fullname?: string | null,
    username?: string | null,

  ): Observable<any> {
    let params: UserDto = {
      page: page,
      size: size,
      sort: isNullOrUndefinedOrEmpty(sort) ? '' : sort,
      sortBy: isNullOrUndefinedOrEmpty(sortBy) ? '' : sortBy,
      role: isNullOrUndefinedOrEmpty(role) ? '' : role,
      textSearch: isNullOrUndefinedOrEmpty(textSearch) ? '' : textSearch,
      username: isNullOrUndefinedOrEmpty(username) ? '' : username,
      fullName: isNullOrUndefinedOrEmpty(fullname) ? '' : fullname,
    };

    if(!isNullOrUndefinedOrEmpty(fromDate)){
      params.fromDate = fromDate;
    }

    if(!isNullOrUndefinedOrEmpty(toDate)){
      params.toDate = toDate;
    }

    if(!isNullOrUndefinedOrEmpty(status)){
      params.status = status;
    }

    if(!isNullOrUndefinedOrEmpty(_foundationCode)){
      params.foundationCode = _foundationCode;
    }


    if(!isNullOrUndefinedOrEmpty(_gender)){
      params.gender = _gender;
    }

    let headers = {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+ this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/staff/search",params,headers)
  }

  deleteEmployee(_employeeId: any): Observable<any> {
    let params = {};
    let body = [];
    body.push(_employeeId);
    let data = JSON.stringify(body);
    return this.baseService.post("api/v1/staff/delete", data, params, this.jwtAuthService.getJwtToken());
  }

  getAllOptionSeniority() {
    let params = {};
    let headers = {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+ this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/options/getAllOptionSeniority",params,headers)
  }

  getListGender(){
    return [
      {
        id: "M",
        name: 'Nam',
      },
      {
        id: "F",
        name: 'Nữ',
      },
    ];
  }

  getAll() : Observable<UserDto[]>{
    let params: UserDto = {
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+ this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/staff/getAll",params,headers)
  }

  getCustomer(
    foundationId ? : number,
     _customerCode? : string,
      // _facebook ?  : string,
    _page?: number,
     _size?: number,
    // _email?: string | null,
    _address?: string | null,
     _fullName ?: string | null,
      // _phone ?: string | null,
      _sort ?: string | null,
      _sortBy  ?: string | null,
      _status  ?: string | null,
      _birthDate   ?: Date | null,
     _textSearch?: string | null
    ): Observable<any> {
    let params: CustomerInputDto = {
      customerCode: _customerCode ? _customerCode : "",
      page: _page ,
      size: _size,
      status: _status,
      fullName: _fullName ? _fullName :"",
      // phone: _phone ? _phone : "",
      // email: _email ? _email : "",
      address: _address ? _address : "",
      textSearch: _textSearch ? _textSearch : ""
    }
    // if(!isNullOrUndefinedOrEmpty(_birthDate)){
    //   params.birthDate = _birthDate;
    // }
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/customer", params, headers);
  }
    createOrUpdateCustomer(_customerDto?: CustomerDto): Observable<any> {
    let data = JSON.stringify(_customerDto);
    let params = {
    };
    return this.baseService.post(_customerDto?.id > 0 ? ("api/v1/customer/" + _customerDto?.id) : "api/v1/customer", data, params, this.jwtAuthService.getJwtToken());
  }

  EditImportHistory(_importProductDto?: ImportProductDto): Observable<any> {
    let data = JSON.stringify(_importProductDto);
    let params = {
    };
    return this.baseService.post("api/v1/products/import/"+_importProductDto.id, data, params, this.jwtAuthService.getJwtToken());
  }

  deleteCustomer(_customerDto: SupplierDto): Observable<any> {
    let params = {};
    _customerDto.lstId = [_customerDto.id]
    let data = JSON.stringify(_customerDto);
    return this.baseService.post("api/v1/customer/delete", data, params, this.jwtAuthService.getJwtToken());
  }
  deleteImportProduct(_importProductDto: ImportProductDto): Observable<any> {
    let params = {};
    _importProductDto.lstId = [_importProductDto.id]
    let data = JSON.stringify(_importProductDto);
    return this.baseService.post("api/v1/products/import/delete/"+_importProductDto.id, data, params, this.jwtAuthService.getJwtToken());
  }

}
export class CitiesDto implements ICitiesDto {
  code!: number;
  name!: string ;
  slug! : string;
  type! : string;
  name_with_type! : string;
}

export interface ICitiesDto {
  code: number;
  name: string ;
  slug : string;
  type : string;
  name_with_type: string;
}


export class Int32ItemObj implements IInt32ItemObj {
  id!: string | number;
  name!: string ;
  parentId!: string;

  constructor(data?: IInt32ItemObj) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.name = _data['name'];
      this.parentId = _data['parentId'];
    }
  }

  static fromJS(data: any): Int32ItemObj {
    data = typeof data === 'object' ? data : {};
    let result = new Int32ItemObj();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['name'] = this.name;
    data['parentId'] = this.parentId;
    return data;
  }
}

export interface IInt32ItemObj {
  id: string|number;
  name: string ;
}


export interface IFootballFieldDto {
  id: number ;
  name: string ;
  type: number ;
  width: number ;
  length: number ;
  height: number ;
  startDate: Date ;
  price: number ;
  description: string ;
  foundationFieldId : number ;
  status: number ;
  codeFootballField:string;

}

export class FootballFielDto{
  // codeFootballField?: string;
  id?: number;
  name?: string;
  type?: number | string;
  width?: number;
  length?: number;
  heigth?: number;
  startDate?: Date;
  price?: number;
  description?: string;
  foundationFieldId?: number| string;
  status?: number | string;
   lstIds? : number[] ;
  page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
  foundationName?:string;
  listMaterial?: [];
  TongVatChat?: number;
  VatChatSuCo?: number;
  VatchatUuTienSuco?:number;
  image?:string;
   foundationId?:string;
}
export class FootballActive{
  country:string;
  tongvc:string;
  vchong:string;
}
export enum SANBONG_CATEGORY {
  SAN_DA_5 = 1,
  SAN_DA_7 = 2,
  SAN_DA_11 = 3,
}
export enum FOOTBALL_FIELD_STATUS {
  DUNG_HOAT_DONG = "0",
  HOAT_DONG = "1",
  BAO_TRI = "2",
}

export interface ICoSoSanBongDto {
  id: number ;
  user_id : number ;
  foundationCode : string ;
  longtitude?: number ;
  latitude?: number ;
  name: string ;
  address? : AddressDTO;
  province?: string ;
  district?: string ;
  percinct?: string ;
  addressDetail?: string ;
  user: number ;
  status: number ;
  description: string ;
  image: string ;
  textSearch : string ;
}

export interface ISanBongBaoTri{
  idSanBong:number,
  nameSanBong:string;
}
export class SanBongBaoTriDto implements ISanBongBaoTri{
  idSanBong: number;
  nameSanBong: string;

}

export class CoSoSanBongDto {
   page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
  id?: number ;
  user_id? : number ;
  foundationCode? : string ;
  longtitude?: number ;
  startDate?: Date;
  latitude?: number ;
  name?: string ;
  address?: AddressDTO;
  province?: string ;
  district?: string ;
  percinct?: string ;
  addressDetail?: string ;
  user?: number ;
  status?: number |string;
  description?: string ;
  image?: string ;
  lstFootballFields?: Array<SanBongBaoTriDto>;
  SoSanTrucTrac?: number;
  TongSoSan?: number;
  lstId ?: number[] = new Array();
}

export enum TRANG_THAI_CO_SO_SAN_BONG {
  HOAT_DONG = 1,
  DUNG_HOAT_DONG = 2,
  BAO_TRI = 3,
}


export class ProductDto {
  lstId? : number[] ;
  page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;

  id?: number;
  name?: string;
  productCode?: string;
  categoryId?: number | string;
  brand?: string ;
  unit?: string;
  unitName? : string;
  foundationId?: number | string;
  description?: string;
  image?: string;
  status?: number | string;
  lstFoundationId? : number[];
  price : number ;
  amount? : number ;
  totalAmount? : number ;
  totalAmountReality? : number ;
  isNote?: boolean;
  message?: string;
  isConfirm?: boolean = null;
  originAmount? : number ;
  isAmountChange?: boolean = false;
  lstChangeProductImportHistories = new Array<any>();
  lstProductImportHistories = new Array<any>();
}

export enum PRODUCT_CATEGORY {
  DO_AN = 1,
  DO_TAP = 2,
}

export enum FOUNDATION_NUMBER {
  CO_SO_A = 1,
  CO_SO_B = 2,
}

export interface IProductWarehouseDto {
  id: number ;
  productId: number ;
  fromDate: Date ;
  manufacturingDate: Date ;
  expiryDate: Date ;
  supplier: string ;
  supplier_phone_number: string ;
  packageName: string ;
  packagePrice: number ;
  amount: number ;
  retailPrice: number ;
  description: string ;
  foundationId: number|string ;
}
export class ProductWarehouseDto {
  page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;

  id?: number;
  productId?: number | string;
  categoryId?: number | string;
  fromDate?: Date;
  manufacturingDate?: Date;
  expriredDate?: Date;
  supplierId?: number| string;
  supplier_phone_number?: string;
  packagePrice?: number;
  amount: number;
  // returnAmount:number;
  retailPrice?: number;
  description?: string;
  foundationId?: number|string;
  price : number ;
  totalPrice : number ;
  manufactureDate? : Date;
  importDate? : Date;
  returnStatus? : string ;
  supplier? : SupplierDto;
  product : ProductDto;
  isRefund?: boolean;
  importCouponCode? : string;
  productWareHouseCode?: string;
  productName?: string;
  supplierName?: string;
  statusReturn?: string;
  status?: string;
  unitName?: string;
  fromImportDate?: Date;
}


export enum STATUS_NUMBER {
  DANG_CHO = 1,
  DANG_XU_LY = 2,
  DA_XU_LY = 3,
}

export class WarehouseDto {
  page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;

  id?: number;
  productId?: number | string;
  categoryId?: number | string;
  fromDate?: Date;
  manufacturingDate?: Date;
  expiryDate?: Date;
  supplierId?: number| string;
  supplier_phone_number?: string;
  packagePrice?: number;
  retailPrice?: number;
  description?: string;
  foundationId?: number|string;
  consignmentName? : string;
  manufactureDate? : Date;
  expriredDate? : Date;
  importDate? : Date;
  returnStatus? : string ;
  isRefund?: boolean;
  importCouponCode? : string;
  productWareHouseCode?: string;
  productName?: string;
  supplierName?: string;
  statusReturn?: string;
  status?: string;
  fromImportDate?: Date;
}

export interface IVatChatDto {
  id: number ;
  name: string ;
  price: number ;
  unit: number ;
  size: string ;
  installation_time: Date ;
  finish_time: Date ;
  maintenance_time: Date ;
  status: number ;
  amount: number ;
  description: string ;
  image: string ;
  repair_cost: string ;
  repair_amount: number ;
  isSpecific: boolean ;
}
export class VatChatDto {
   page?: number;
  sizePage?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
  installationTime?: Date;
  finishTime?: Date;
  maintenanceTime?: Date;
  repairCost?: string;
  repairAmount?: number;
  repairAmountError?: number;
  amount?:number;
  isSpecific?: string;
  soLuongBiHong?: number;
  id?: number;
  name?: string;
  price?: number;
  unit?: number;
  size?: string;
  status?: string;
  description?: string;
  image?: string;
  chiPhiSuaChua?: string | undefined;
  footballFieldId?: number;
   lstIds? : number[] ;
}


export enum CCVC_ENUM {
  HOAT_DONG = 1,
  BAO_TRI = 2,
}

export class MaintainHistoryVatChatDto {
   page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;

  installationTime?: Date;
  timeToEnd?: Date;
  timeToStart?: Date;
  repairCost?: string;
  repairAmount?: number;
  amount?:number;
  isSpecific?: boolean;
  soLuongBiHong?: number;
  materialFacilitiesId?:number;
  id?: number;
  name?: string;
  price?: number;
  unit?: number;
  status?: string;
  description?: string;
  image?: string;
  footballFieldId?: number;
  footballFieldName?: string;
   lstIds? : number[] ;
    total?:number;
}
export class MaintainHistoryVatChatInputDto {
   page?: number;
  size?: number;
  sort?: string;
  sortBy?: string;
  textSearch?: string;
  name?:string;
  installationTime?: Date;
    materialFacilitiesId?:number;
   timeToEnd?: Date;
  timeToStart?: Date;
  repairCost?: string;
  repairAmount?: number;
  amount?:number;
  status?: string;
  description?: string;
  image?: string;
  footballFieldId?: number;
  footballFieldName?: string;
   lstIds? : number[] ;
   total?:number;
}

export class CustomerDto {
  id?: number ;
  fullName?: string ;
  birthDate?: Date ;
  email?: string ;
  address?: string ;
  customerCode?: string ;
  facebook?: string ;
  foundationId?: number ;
  image?: string ;
  phone?: string ;
  status?: string ;
  gender?: string ;


  // page?: number ;
  // size?: number ;
  // sort?: string ;
  // sortBy?: string ;
  // fromDate?: Date ;
  // textSearch?: string ;
}

export class CustomerInputDto {
  fullName?: string ;
  birthDate?: Date ;
  email?: string ;
  address?: string ;
  customerCode?: string ;
  facebook?: string ;
  foundationId?: number ;
  image?: string ;
  phone?: string ;
  status?: string ;
  gender?: string ;

  page?: number ;
  size?: number ;
  sort?: string ;
  sortBy?: string ;
  fromDate?: Date ;
  textSearch?: string ;
  total?: number;

}
