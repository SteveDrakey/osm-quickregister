import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();

  public refreshtoken: string = '';
  public accesstoken: string = '';

  // https://www.onlinescoutmanager.co.uk/oauth/authorize?response_type=code&client_id=UwWpOD1MePc54hXI8waTLFwbqH8gCBKy&scope=section%3Aattendance%3Awrite%20section%3Aadministration%3Aread&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private location: Location) {
    this.activatedRoute.queryParams.subscribe(async (s) => {
      const code = s['code'];
      const scope = s['scope'];
      if (code) {
        console.log('calling login');
        this.authorizeToken(code).then(() => { this.location.go('/') });
      } else {
        // Can we just refresh the token?
        console.log('calling refresh');
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
          this.refreshAuthToken(refresh_token);
        }
      }
    });
  }

  public connectToOSM() {
    const baseUrl = 'https://www.onlinescoutmanager.co.uk/oauth/authorize';
    const queryParams = {
      response_type: 'code',
      client_id: 'ZzOQMeM0Tpz1x86T9aK2yUIFfpDv9xmC',
      scope: 'section:attendance:write section:administration:read',
      redirect_uri: `${location.origin}`,
    };
    const params = new URLSearchParams(queryParams);
    const urlWithParams = `${baseUrl}?${params.toString()}`;
    // navigate to urlWithParams
    window.location.href = urlWithParams;
  }

  async authorizeToken(code: string) {
    const reply = await firstValueFrom(this.http.get<any>(`/.netlify/functions/callback?code=${code}`));
    this.refreshtoken = reply.refresh_token;
    this.accesstoken = reply.access_token;
    console.log(reply);
    localStorage.setItem('refresh_token', this.refreshtoken);
    localStorage.setItem('accesstoken', this.accesstoken);
    this.loggedInSubject.next(true);
  }

  async refreshAuthToken(refresh_token: string) {
    const reply = await firstValueFrom(this.http.post<any>(`/.netlify/functions/callback`, refresh_token));
    console.log('test',reply);

    if (!reply.error) {

      this.refreshtoken = reply.refresh_token;
      this.accesstoken = reply.access_token;
      console.log(reply);
      localStorage.setItem('refresh_token', this.refreshtoken);
      localStorage.setItem('accesstoken', this.accesstoken);
      this.loggedInSubject.next(true);
    } else {
      this.clearLocalStorage();
    }

  }
  clearLocalStorage() {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('accesstoken');
    this.loggedInSubject.next(false);
  }
}
