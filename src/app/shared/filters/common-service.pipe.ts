import { Pipe, PipeTransform } from '@angular/core';
import { FilterValues } from '../../entity/filter';

@Pipe({
  name: 'commonService'
})
export class CommonServicePipe implements PipeTransform {



  transform(value: any[], commonServices: any, isFilterChanged: boolean)
    : any {
    console.log('came into filter pipe' + commonServices);

    return new FilterValues().serviceTypePipe(value, commonServices);

  }

}
