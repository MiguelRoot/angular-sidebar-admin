import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sidenav2Component } from './sidenav2/sidenav2.component';

const routes: Routes = [
  {
    path: 'sidenav2',
    component: Sidenav2Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
