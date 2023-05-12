import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule {
  refreshToken: any; 
  accesstoken: any;
  // https://www.onlinescoutmanager.co.uk/oauth/authorize?response_type=code&client_id=UwWpOD1MePc54hXI8waTLFwbqH8gCBKy&scope=section%3Aattendance%3Awrite%20section%3Aadministration%3Aread&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback

  constructor(private http: HttpClient,private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.queryParams.subscribe( async (s) => {

      console.log(s);

      const code = s['code'];
      const scope = s['scope'];

      if (code) {
        console.log('calling login');
        this.authorizeToken(code);
      } else {
        // Can we just refresh the token?
        console.log('calling refresh');
      }
    });
  }

  public connectToOSM()
  {
    const baseUrl = 'https://www.onlinescoutmanager.co.uk/oauth/authorize';
    const queryParams = {
      response_type: 'code',
      client_id: 'ZzOQMeM0Tpz1x86T9aK2yUIFfpDv9xmC',
      scope: 'section:attendance:write section:administration:read',
      //scope: 'section:attendance:write',
      redirect_uri: `${location.origin}`,
    };
    const params = new URLSearchParams(queryParams);
    const urlWithParams = `${baseUrl}?${params.toString()}`;
    // navigate to urlWithParams
    window.location.href = urlWithParams;
  }

  async authorizeToken(code: string) {
    
    const reply = await firstValueFrom(this.http.get<any>(`/.netlify/functions/callback?code=${code}`));

    console.log('authorizeToken', reply);
    console.log('authorizeToken - refresh_token', reply['refresh_token']);

    this.refreshToken = reply.refresh_token;
    this.accesstoken = reply.access_token;
    
    //AuthenticationModule.accesstoken = reply.access_token;

    localStorage.setItem('refresh_token', this.refreshToken);
    localStorage.setItem('accesstoken', this.accesstoken);
    // this.LoggedIn.next(reply.athlete);
  }


}
