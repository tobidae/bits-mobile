export function objToArr(obj) {
  let arr = [];
  for (let key in obj) {
    let element = obj[key];
    element.$key = key;
    arr.push(element);
  }
  return arr;
}

export const factorySectors = [{
  sectorId: 'A1'
},{
  sectorId: 'A2'
},{
  sectorId: 'A3'
},{
  sectorId: 'B1'
},{
  sectorId: 'B2'
},{
  sectorId: 'B3'
},{
  sectorId: 'C1'
},{
  sectorId: 'C2'
},{
  sectorId: 'C3'
}];
