
export interface generalObject {
  [key: string]: any;
}

export function findIndexInArray(targetObj: generalObject, objArr: generalObject[], keyName: string): number {
  objArr.forEach((element, index) => {
    if (element[keyName] === targetObj[keyName]) {
      return index;
    }
  });
  return -1;
}
