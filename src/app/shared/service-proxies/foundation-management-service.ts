import { MaintainHistoryVatChatDto, MaintainHistoryVatChatInputDto } from './system-management-service';
import { CoSoSanBongDto, FootballFielDto, VatChatDto } from 'src/app/shared/service-proxies/system-management-service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JWTAuthService } from "../services/auth/jwtauth.service";
import { BaseService } from "../services/base.service";
import { isNullOrUndefinedOrEmpty } from '../utils/DataUtils';

@Injectable({
  providedIn: 'root',
})
export class FoundationFieldsService {

  constructor(
    private _http: HttpClient,
    private baseService: BaseService,
    private jwtAuthService: JWTAuthService
  ) {

  }

 public getListCoSoCombobox(): Observable<CoSoSanBongDto[]> {

    let params: CoSoSanBongDto = null;

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/foundationFields/me", params, headers);
  }

  public getListCoSo( _name?: string,_foundationCode?: string,_foundationStatus?: string, _page?: number
    , _size?: number, _sort?: string | null, _sortBy?: string | null,
    _textSearch?: string | null): Observable<CoSoSanBongDto[]> {
    let params: CoSoSanBongDto = {
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch ? _textSearch : "",
      name: _name ? _name : "",
      foundationCode: _foundationCode ? _foundationCode : "",
      status: _foundationStatus ? _foundationStatus : "",
    }

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/foundationFields", params, headers);
  }

  public search(textSearch : any): Observable<any> {

    let params = {
      textSearch : textSearch
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/foundationFields", params, headers);
  }

  public create(data : CoSoSanBongDto): Observable<CoSoSanBongDto[]> {

    let params = null
    let body = JSON.stringify(data);
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.post("api/v1/foundationFields", body ,params, this.jwtAuthService.getJwtToken());
  }
  public update(data : CoSoSanBongDto): Observable<CoSoSanBongDto[]> {

    let params = null
    let body = JSON.stringify(data);
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.post("api/v1/foundationFields/"+data.id, body ,params, this.jwtAuthService.getJwtToken());
  }
  //  public deleteFootballField(data : FootballFielDto): Observable<FootballFielDto[]> {

  //   let params = null
  //   let body = JSON.stringify(data);
  //   let headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
  //   };

  //   return this.baseService.post("api/v1/foundationFields/"+data.id, body ,params, this.jwtAuthService.getJwtToken());
  // }

   getFootballById(_footballId: number): Observable<any> {
    let params = {
      'id': _footballId ,
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/footballFields/"+_footballId,params, headers);
  }

  getListSanBongByCoSoId(_foudationId: number): Observable<any> {
    let params = {
        'foundationFieldId' : _foudationId,
        // 'status' : isNullOrUndefinedOrEmpty(status) ? '' : status,
        // 'type' : isNullOrUndefinedOrEmpty(type) ? '' : type
    };

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/footballFields", params, headers);
  }

  getListSanBongByCoSo(): Observable<any> {
    let params: FootballFielDto = null;

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("/api/v1/footballFields", params, headers);
  }
 getListFootballField(_footballFieldStatus: string,_footballFieldSName: string, _page?: number, _size?: number, _sort?: string | null, _sortBy?: string | null,
    _footballFieldType?: number | null, _foundationId?: number | null, _textSearch?: string | null): Observable<FootballFielDto[]> {
      if(_sort == "startDate"){
        _sort = "start_date";
      }
      let params: FootballFielDto = {
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch ? _textSearch : "",
      foundationFieldId: _foundationId ? _foundationId : "",
      type: _footballFieldType ? _footballFieldType : "",
      status: _footballFieldStatus ? _footballFieldStatus : "",
      name: _footballFieldSName ? _footballFieldSName : "",
    }

    // if (!isNullOrUndefinedOrEmpty(_footballFieldType)) {
    //   params.type = _footballFieldType;
    // }

    // if (!isNullOrUndefinedOrEmpty(_foundationId)) {
    //   params.foundationFieldId = _foundationId;
    // }

    if (!isNullOrUndefinedOrEmpty(_textSearch)) {
      params.textSearch = _textSearch;
    }

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };

    return this.baseService.get("api/v1/footballFields", params, headers);
  }
  getListCoSoVatChat(_footballFielId: number) {
    let params: CoSoSanBongDto = null;

    //  if(!isNullOrUndefinedOrEmpty(_categoryId)){
    //   params.categoryId = _categoryId;
    // }

    // if(!isNullOrUndefinedOrEmpty(_foundationId)){
    //   params.foundationFieldId = _foundationId;
    // }

    // if(!isNullOrUndefinedOrEmpty(_textSearch)){
    //   params.textSearch = _textSearch;

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/products/search", params, headers);
  }

  getListCoSoVatChatById(_footballFieldId: number,
    _materialFSName: string,
     _page?: number,
      _sizePage?: number,
      _sort?: string | null,
       _sortBy?: string | null,
    _materialFStatus?: string | null, _textSearch?: string | null): Observable<VatChatDto[]> {
      let params = {
      page: _page,
      sizePage: _sizePage,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch ? _textSearch : "",
      footballId: _footballFieldId ? _footballFieldId : 0,
      name: _materialFSName ? _materialFSName : "",
      status: _materialFStatus ? _materialFStatus : "",
    }

    //  if(!isNullOrUndefinedOrEmpty(_categoryId)){
    //   params.categoryId = _categoryId;
    // }

    // if(!isNullOrUndefinedOrEmpty(_foundationId)){
    //   params.foundationFieldId = _foundationId;
    // }

    // if(!isNullOrUndefinedOrEmpty(_textSearch)){
    //   params.textSearch = _textSearch;

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/materialFacilitiesInFields", params, headers);
  }

   getMaintainHistory(
    // _materialFacilitiesId: number ,
    _footballFieldName: string,
    _name: string,
     _page?: number,
      _size?: number,
      _sort?: string | null,
       _sortBy?: string | null,
    _status?: string | null,
    _timeToEnd?:Date,
    _timeToStart?:Date,
    _description?:string,
     _textSearch?: string | null): Observable<MaintainHistoryVatChatDto[]> {
      let params : MaintainHistoryVatChatInputDto = {
      page: _page,
      size: _size,
      sort: _sort ? _sort : "",
      sortBy: _sortBy ? _sortBy : "",
      textSearch: _textSearch ? _textSearch : "",
      // materialFacilitiesId: _materialFacilitiesId ? _materialFacilitiesId : "",
      footballFieldName: _footballFieldName ? _footballFieldName :"",
      name: _name ? _name : "",
      status: _status ? _status : "",
    }

     if(!isNullOrUndefinedOrEmpty(_timeToStart)){
      params.timeToStart = _timeToStart;
    }

    if(!isNullOrUndefinedOrEmpty(_timeToEnd)){
      params.timeToEnd = _timeToEnd;
    }

    // if(!isNullOrUndefinedOrEmpty(_materialFacilitiesId)){
    //   params.materialFacilitiesId = _materialFacilitiesId;
    // }

    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtAuthService.getJwtToken()
    };
    return this.baseService.get("api/v1/auditFix", params, headers);
  }

  createOrEditCoSoSanBong(_coSoSanBongDto?: CoSoSanBongDto): Observable<any> {
    let data = JSON.stringify(_coSoSanBongDto);
    let params = {
    };
    return this.baseService.post(_coSoSanBongDto?.id > 0 ? ("api/v1/products/" + _coSoSanBongDto?.id) : "api/v1/products", data, params, this.jwtAuthService.getJwtToken());
  }

  createOrEditFootballField(_sanBongDto?: FootballFielDto): Observable<any> {
    let data = JSON.stringify(_sanBongDto);
    let params = {
    };
    return this.baseService.post(_sanBongDto?.id > 0 ? ("api/v1/footballFields/" + _sanBongDto?.id) : "api/v1/footballFields", data, params, this.jwtAuthService.getJwtToken());
  }
  deleteFootballField(_footballFielDto: FootballFielDto): Observable<any> {
    let params = {};
    _footballFielDto.lstIds = [_footballFielDto.id];
    let data = JSON.stringify(_footballFielDto);
    return this.baseService.post("api/v1/footballFields/delete", data, params, this.jwtAuthService.getJwtToken());
  }
  createOrEditCCVC(_vatChatDto?: VatChatDto): Observable<any> {
    let data = JSON.stringify(_vatChatDto);
    let params = {
    };
    return this.baseService.post(_vatChatDto?.id > 0 ? ("api/v1/materialFacilitiesInFields/" + _vatChatDto?.id) : "api/v1/materialFacilitiesInFields", data, params, this.jwtAuthService.getJwtToken());
  }

  deleteCCVC(_vatChatDto: VatChatDto): Observable<any> {
    let params = {};
    _vatChatDto.lstIds = [_vatChatDto.id];
    let data = JSON.stringify(_vatChatDto);
    return this.baseService.post("api/v1/materialFacilitiesInFields/delete", data, params, this.jwtAuthService.getJwtToken());
  }

    MaintainCCVC(_vatChatDto?: VatChatDto): Observable<any> {
    let data = JSON.stringify(_vatChatDto);
    let params = {
    };
    return this.baseService.post("api/v1/materialFacilitiesInFields/status/"+ _vatChatDto?.id, data, params, this.jwtAuthService.getJwtToken());
  }

  deleteFoundationField(_foundationtDto: CoSoSanBongDto): Observable<any> {
    let params = {};
    _foundationtDto.lstId.push(_foundationtDto.id);
    let data = JSON.stringify(_foundationtDto);
    return this.baseService.post("api/v1/foundationFields/delete", data, params, this.jwtAuthService.getJwtToken());
  }
}
export class  FootballFieldInputDto  {
  pageIndex!: number | undefined;
  pageSize!: number  | undefined;
  sort!: string;
  sortBy!: string;
  textSearch!: string;
  total!: number;
  foundationId!: number ;
  foundationType!: number ;
   status !: string;
   name :string;
   soSanHong :number;
}

export class  FoundationInputDto  {
  pageIndex!: number | undefined;
  pageSize!: number  | undefined;
  sort!: string;
  sortBy!: string;
  textSearch!: string;
  total!: number;
  foundationName!:string
  foundationCode!: string ;
  status : string = "1";
}
export class  MaterialFacilitiesInputDto  {
  pageIndex!: number | undefined;
  pageSize!: number  | undefined;
  sort!: string;
  sortBy!: string;
  textSearch!: string;
  total!: number;
  status !: string;
  name !:string;
  footballFieldName:string;
  footballFieldType:string;
  footballId:number;
  materialFacilitiesSpecific!: string ;
}
