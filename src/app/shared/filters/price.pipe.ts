import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  transform(value: any[], price: any) {

    console.log(price);

    if (value === undefined // || (isFilterChanged === false)
    ) {
      return value;
    } else {

      const temp2 = value.filter(el => {
        return el.basicFare <= price;
        // return filterValues.starRating.length === 0 ? el :
        //  filterValues.starRating.findIndex(x => x === el.starClass) !== -1;
      });

      return temp2;
    }

  }

}
