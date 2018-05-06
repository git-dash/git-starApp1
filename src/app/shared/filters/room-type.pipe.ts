import { Pipe, PipeTransform } from '@angular/core';
import { FilterValues } from '../../entity/filter';
@Pipe({
  name: 'roomType'
})
export class RoomTypePipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }

  transform(value: any[], filterValues: any, isFilterChanged: boolean)
    : any {
    console.log('came into filter pipe' + filterValues);

    // if (value === undefined || filterValues.length === 0) {
    //   return value;
    // }

    // const temp3 = value.filter(list => filterValues.length === 0 ? list :
    //   filterValues.some(val => list.services.indexOf(val) >= 0)
    // );

    // const temp2 = value.filter(el => {
    //   return filterValues.length === 0 ? el :
    //     filterValues.indexOf(el.roomType) >= 0;
    // });

    return new FilterValues().roomTypePipe(value, filterValues);

    // console.log(temp2);




  }

}
