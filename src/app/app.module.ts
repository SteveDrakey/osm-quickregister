import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      // The domain and clientId were configured in the previous chapter
      domain: '8-26-scouts-todmorden.uk.auth0.com',
      clientId: 'SCLeT8ZIxCihEMKJeehT0KrJcNChRsUr',
    
      authorizationParams: {
        redirect_uri: window.location.origin,
        
        // Request this audience at user authentication time
        audience: 'https://8-26-scouts-todmorden.uk.auth0.com/api/v2/',
    
        // Request this scope at user authentication time
        scope: 'read:current_user',
      },
    
      // Specify configuration for the interceptor              
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://8-26-scouts-todmorden.uk.auth0.com/api/v2/' (note the asterisk)
            uri: '/.netlify/functions/*',
            // // tokenOptions: {
            // //   authorizationParams: {
            // //     // The attached token should target this audience
            // //     audience: 'https://8-26-scouts-todmorden.uk.auth0.com/api/v2/',
    
            // //     // The attached token should have these scopes
            // //     scope: 'read:current_user'
            // //   }
            // }
          }
        ]
      }
    })
    // AuthModule.forRoot({
    //   domain: '8-26-scouts-todmorden.uk.auth0.com',
    //   clientId: 'SCLeT8ZIxCihEMKJeehT0KrJcNChRsUr',
    //   authorizationParams: {
    //     redirect_uri: window.location.origin
    //   }
    // }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
