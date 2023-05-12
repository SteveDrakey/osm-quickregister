import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationModule } from './authentication/authentication.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'osm-quickregister';

  constructor(public auth: AuthenticationModule, private client: HttpClient ) {}
  
  async test() {
    // make http call
    //var result = await this.client.get('https://www.onlinescoutmanager.co.uk/ext/members/attendance/?action=get&sectionid=35289&termid=626418&section=scouts&nototal=true').toPromise();

    // make http call to hello-world
    var result = await this.client.get('/.netlify/functions/patrols').toPromise();
    
    console.log(result);

  }
}
