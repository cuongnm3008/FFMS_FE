export interface ICityDTO {
  "name" : string;
  "code" : string;
}

export class CityDTO implements CityDTO {
  "name" : string;
  "code" : string;
}

export interface IDistrictDTO {
  "name" : string;
  "code" : string;
  "parent_code" : string;
}

export class DistrictDTO implements IDistrictDTO {
  "name" : string;
  "code" : string;
  "parent_code" : string;
}

export interface IWardsDTO {
  "name" : string;
  "code" : string;
  "parent_code" : string;
}

export class WardsDTO implements IDistrictDTO {
  "name" : string;
  "code" : string;
  "parent_code" : string;
}
