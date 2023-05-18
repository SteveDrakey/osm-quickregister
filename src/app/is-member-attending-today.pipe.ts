import { Pipe, PipeTransform } from '@angular/core';
import { Item, Meetings } from './osm.service';

@Pipe({
  name: 'isMemberAttendingToday',
  pure: false
})
export class IsMemberAttendingTodayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var todayAsYYMMDD = new Date().toISOString().slice(0,10);

    const item = value as Item;
    
    
    if (item) {
      return item[todayAsYYMMDD];
    }
    return null;
  }
}
