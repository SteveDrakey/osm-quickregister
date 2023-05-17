import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distinctPatrol'
})
export class DistinctPatrolPipe implements PipeTransform {

  transform(items: any[]): any[] {
    return Array.from(new Set(items.map(item => item.patrol)));
  }

}
