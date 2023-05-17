import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
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
  '2023-05-11'?: string;
  '2023-05-18'?: string;
  '2023-05-25'?: string;
  '2023-06-01'?: string;
  '2023-04-20'?: string;
  '2023-04-27'?: string;
  '2023-05-04'?: string;
}