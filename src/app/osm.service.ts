import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, take, tap } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class OsmService {

  private membersAttendanceSubject = new ReplaySubject<GetMemberAttendanceResponse>(1);
  MembersAttendance$: Observable<GetMemberAttendanceResponse> = this.membersAttendanceSubject.asObservable();

  private members: Item[] = [];

  constructor(private http: HttpClient, private authservice: AuthenticationService) {
    console.log('OsmService constructor');
    authservice.loggedIn.subscribe((loggedIn) => { if (loggedIn) this.getMemberAttendance() });
  }

  getMemberAttendance() {
    console.log('getMemberAttendance');
    // https://www.onlinescoutmanager.co.uk/ext/members/attendance/?action=get&sectionid=35289&termid=626418&section=scouts&nototal=true
    this.http.get<GetMemberAttendanceResponse>('/.netlify/functions/members-attendance-get').subscribe(
      (d) => this.membersAttendanceSubject.next(d)
    );
  }

  updateMembersAttendance(scoutid: number, meetingDate: Date) {
    // convert metting date to yyyy-mm-dd
    let formattedDate = `${meetingDate.getFullYear()}-${('0' + (meetingDate.getMonth() + 1)).slice(-2)}-${('0' + meetingDate.getDate()).slice(-2)}`;
    console.log('updateMembersAttendance');
    // https://www.onlinescoutmanager.co.uk/ext/members/attendance/?action=get&sectionid=35289&termid=626418&section=scouts&nototal=true

    //    this.http.post<GetMemberAttendanceResponse>('/.netlify/functions/members-attendance-update', {scoutid: scoutid, meetingDate: formattedDate});
    //this.getMemberAttendance();
    return this.http.post<GetMemberAttendanceResponse>('/.netlify/functions/members-attendance-update', { scoutid: scoutid, meetingDate: formattedDate })
      .pipe(
        tap(() => 
        {
          this.MembersAttendance$.pipe(take(1)).subscribe((d) => {
            // find the member in the array
            let member = d.items.find(item => item.scoutid === scoutid);
            if (member) {
              member[formattedDate] = 'Yes';
              this.membersAttendanceSubject.next(d);
            }
          });
        }
      ));
  }
}

export interface GetMemberAttendanceResponse {
  identifier: string;
  label: string;
  items: Item[];
  meetings: Meetings;
}

export interface Meetings {
  meetings: Record<string, string>;
}

export interface Item {
  //mettings: Record<string, string>;
  firstname: string;
  lastname: string;
  photo_guid?: string;
  patrolid: number;
  patrolleader: string;
  patrol: string;
  dob: string;
  sectionid: number;
  enddate?: any;
  startdate: string;
  age: string;
  patrol_role_level_label: string;
  active: boolean;
  total: number;
  scoutid: number;
  _filterString: string;
  [key: string]: string | any;
}