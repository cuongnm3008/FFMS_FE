export function isEmpty(str) {
  return (!str || str.length === 0);
}
export function isNullOrUndefinedOrEmpty(data : any){
  return data == null || data == undefined || isEmpty(data);
}
