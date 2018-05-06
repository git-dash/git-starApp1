import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classFilter'
})
export class ClassFilterPipe implements PipeTransform {

  transform(value: any[], starRating: any, isFilterChanged: boolean)
    : any {
    console.log('came into filter pipe' + starRating);

    if (value === undefined ||
      (starRating.length === 0)
    ) {
      return value;
    }
    // filtervalues have changed
    // const temp = value.sort((a: any, b: any) => orderBy ? a.id - b.id : b.id - a.id);

    const temp2 = value.filter(el => {
      return starRating.length === 0 ? el :
        starRating.findIndex(x => x === el.starClass) !== -1;
    });

    return temp2;
  }

}
