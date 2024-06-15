import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sidenav2Component } from './sidenav2/sidenav2.component';
import { Sidenav3Component } from './sidenav3/sidenav3.component';

const routes: Routes = [
  {
    path: 'sidenav2',
    component: Sidenav2Component,
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
