import { Pipe, PipeTransform } from '@angular/core';
import { FilterValues } from '../../../entity/filter';

@Pipe({
  name: 'roomPreference'
})
export class RoomPreferencePipe implements PipeTransform {

  transform(value: any, filterValues: any, preferenceChanged: boolean, preferenceToggle?: boolean): any {
    // return null;
    if (!preferenceChanged) {
      return value;
    }
    return new FilterValues().roomTypePipe(value, filterValues);
  }

}
