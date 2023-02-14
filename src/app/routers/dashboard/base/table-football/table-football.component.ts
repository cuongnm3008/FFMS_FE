import { AppComponentBase } from 'src/app/shared/common/AppComponentBase';
import { Component, Injector, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { FootballFieldInputDto, FoundationFieldsService, MaterialFacilitiesInputDto } from 'src/app/shared/service-proxies/foundation-management-service';
import { FootballFielDto, VatChatDto } from 'src/app/shared/service-proxies/system-management-service';
import { isNullOrUndefinedOrEmpty } from 'src/app/shared/utils/DataUtils';

@Component({
  selector: 'app-table-football',
  templateUrl: './table-football.component.html',
  styleUrls: ['./table-football.component.css']
})
export class TableFootballComponent extends AppComponentBase implements OnInit {

  constructor(
     injector: Injector,
    private _footballFieldFields: FoundationFieldsService
  ) {
     super(injector);
   }

  listFootballField: FootballFielDto[] = [];
  objFilter = new FootballFieldInputDto();
  objFilterMaterial = new MaterialFacilitiesInputDto();
  listMaterialOfField:VatChatDto[] = [];
  listMaterialErrolOfField:VatChatDto[] = [];
  listMaterialErrolImportantOfField:VatChatDto[] = [];


  lstdata: any[] = [];

  ngOnInit(): void {
   this.objFilter.pageIndex = 0;
    this.objFilter.pageSize = 10;
    this.objFilter.status = "2";
    this.fetchData();
  }
    fetchData(){
      this.loading = true;
    this._footballFieldFields
      .getListFootballField(
        this.objFilter.status,
        this.objFilter.name,
        this.objFilter.pageIndex,
        this.objFilter.pageSize,
        this.objFilter.sort,
        this.objFilter.sortBy,
        this.objFilter.foundationType,
        this.objFilter.foundationId = 1,
        this.objFilter.textSearch
      )
      .subscribe((result) => {
        this.listFootballField = result['content'];
        this.objFilter.total =  result['totalElements'];
          result['content'].forEach(element => {
            element.pageSize = this.objFilter.pageIndex;
            element.pageIndex = this.objFilter.pageSize;
        });
        this.listFootballField = this.listFootballField.filter((s) => s.status == '2');
        this.listFootballField.forEach(element => {
           this._footballFieldFields.getListCoSoVatChatById(
        this.objFilterMaterial.footballId = element.id,
        this.objFilterMaterial.footballFieldName,
        this.objFilterMaterial.pageIndex = 0,
        this.objFilterMaterial.pageSize =20,
        this.objFilterMaterial.sort,
        this.objFilterMaterial.sortBy,
        this.objFilterMaterial.status,
        ).subscribe(
      (result1)=> {

       this.listMaterialOfField = result1['content'];
        element.TongVatChat = this.listMaterialOfField.length;
        // this.objFilterMaterial.total = result1['totalElements'];
        this.listMaterialErrolOfField = this.listMaterialOfField.filter(s => s.status != "1" && s.isSpecific == "0");
        this.listMaterialErrolImportantOfField = this.listMaterialOfField.filter(s => s.status != "1" && s.isSpecific == "1");
        element.VatChatSuCo = this.listMaterialErrolOfField.length;
        element.VatchatUuTienSuco = this.listMaterialErrolImportantOfField.length;
        });
        });
      });
      this.loading = false;
  }
   onChangeQuery(_params: NzTableQueryParams){
    this.objFilter.pageIndex = _params.pageIndex;
    this.objFilter.pageSize = _params.pageSize;
    if( _params.sort){
      let objSort = _params.sort.filter(x=> x.value != null);
      this.objFilter.sort = objSort[0]?.key == "customerCode" ? "customer_code" : objSort[0]?.key;
      this.objFilter.sortBy = objSort[0]?.value == "ascend"? "asc" : (objSort[0]?.value == "descend" ? "desc" : "");
    }
    this.objFilter.sort = isNullOrUndefinedOrEmpty(this.objFilter.sort) ?   "" : this.objFilter.sort;
    this.objFilter.sortBy = isNullOrUndefinedOrEmpty(this.objFilter.sortBy) ?   "" : this.objFilter.sortBy;
    this.objFilter.textSearch = isNullOrUndefinedOrEmpty(this.objFilter.textSearch) ?   "" : this.objFilter.textSearch;

    if(_params.pageIndex > 0){
      this.objFilter.pageIndex =  this.objFilter.pageIndex -1;
    }

    this.fetchData();
  }
};
