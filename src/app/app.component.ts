import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'osm-quickregister';

  constructor(public auth: AuthService, private client: HttpClient ) {}
  
  async test() {
    // make http call
    var result = await this.client.get('https://www.onlinescoutmanager.co.uk/ext/members/attendance/?action=get&sectionid=35289&termid=626418&section=scouts&nototal=true').toPromise();
    
    console.log(result);

    this.auth.idTokenClaims$.subscribe((claims) => console.log(claims));
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => console.log(isAuthenticated));
    this.auth.user$.subscribe((profile) => console.log(profile));


  }
}
