import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { ViewMembersByPatrolComponent } from './view-members-by-patrol/view-members-by-patrol.component';
import { AuthInterceptor } from './authentication/auth.interceptor';
import { DistinctPatrolPipe } from './distinct-patrol.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ViewMembersByPatrolComponent,
    DistinctPatrolPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }

