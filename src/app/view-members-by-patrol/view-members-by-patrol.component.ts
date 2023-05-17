import { Component } from '@angular/core';
import { OsmService } from '../osm.service';

@Component({
  selector: 'app-view-members-by-patrol',
  templateUrl: './view-members-by-patrol.component.html',
  styleUrls: ['./view-members-by-patrol.component.css']
})
export class ViewMembersByPatrolComponent {
  
  patrols: string[] = [];

  // constructor(public osmService:OsmService) { 
  //   osmService.MembersAttendance$.subscribe( (d) => {
  //     console.log( Array.from(new Set(d.items.map(item => item.patrol))));
  //     this.patrols = Array.from(new Set(d.items.map(item => item.patrol)))
  //       .filter(patrol => patrol) // This will remove blank, null, or undefined values
  //       .filter(patrol => patrol.indexOf('-') > 0)
  //       .sort(); // This will sort the array in ascending order
  //   });
  // }

}
