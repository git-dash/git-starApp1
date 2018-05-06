import { Pipe, PipeTransform } from '@angular/core';
import { FilterValues } from '../../../entity/filter';

@Pipe({
  name: 'servicePreference'
})
export class ServicePreferencePipe implements PipeTransform {

  transform(value: any[], commonServices: any, isFilterChanged: boolean, preferenceToggle?: boolean) {
    // return null;
    if (!isFilterChanged) {
      return value;
    }
    return new FilterValues().serviceTypePipe(value, commonServices);
  }

}
