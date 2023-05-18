import { Component } from '@angular/core';
import { Item, Meetings, OsmService } from '../osm.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-view-members-by-patrol',
  templateUrl: './view-members-by-patrol.component.html',
  styleUrls: ['./view-members-by-patrol.component.css']
})
export class ViewMembersByPatrolComponent {

  patrols: string[] = [];
  filteredMembers: Item[] = [];
  allMembers: Item[] = [];
  meetings: Meetings | undefined;
  currentFilter = 0;


  constructor(public osmService: OsmService) {
    osmService.MembersAttendance$.subscribe((d) => {
      console.log(Array.from(new Set(d.items.map(item => item.patrol))));

      this.patrols = Array.from(new Set(d.items.map(item => item.patrol)))
        .filter(patrol => patrol) // This will remove blank, null, or undefined values
        .filter(patrol => patrol.indexOf('-') > 0)
        .sort(); // This will sort the array in ascending order

      this.allMembers = d.items;
      this.meetings = d.meetings;

      if (this.currentFilter === 0) {
        this.filteredMembers = this.allMembers.filter(item => item.patrolid === this.currentFilter || item.patrolid === 140057);
      } else {
        this.filteredMembers = this.allMembers.filter(item => item.patrolid === this.currentFilter);
      }
    });
  }

  filterMembers(patrol: string) {
    // lets find the patrolid for this patrol
    this.currentFilter = this.allMembers.find(item => item.patrol.indexOf(patrol) > 0)?.patrolid || 0;
    console.log('filterMembers',this.currentFilter);
    if (this.currentFilter === 0) {
      this.filteredMembers = this.allMembers.filter(item => item.patrolid === this.currentFilter || item.patrolid === 140057);
    } else {
      this.filteredMembers = this.allMembers.filter(item => item.patrolid === this.currentFilter);
    }
  }

  trackByScoutId(index: number, item: Item): number {
    return item.scoutid;
  }

  async registerMember(member: Item) {
    await firstValueFrom(this.osmService.updateMembersAttendance(member.scoutid, new Date()));

  }

}
