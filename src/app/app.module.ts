import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { NgScrollbarModule } from 'ngx-scrollbar';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { IconComponent } from './icon/icon.component';
import { Sidenav2Component } from './sidenav2/sidenav2.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    IconComponent,
    Sidenav2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
