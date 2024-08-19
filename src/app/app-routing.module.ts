import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { Sidenav3Component } from './sidenav3/sidenav3.component';

const routes: Routes = [
  {
    path: 'sidenav2',
    component: SidenavComponent,
  },
  {
    path: 'sidenav3',
    component: Sidenav3Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
