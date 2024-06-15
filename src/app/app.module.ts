import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconComponent } from './icon/icon.component';
import { Sidenav2Component } from './sidenav2/sidenav2.component';
import { Sidenav3Component } from './sidenav3/sidenav3.component';
import { SidebarComponent } from './sidenav3/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    IconComponent,
    Sidenav2Component,
    Sidenav3Component,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgScrollbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
