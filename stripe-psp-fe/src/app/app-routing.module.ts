import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StripePspComponent} from "./stripe-psp/stripe-psp.component";

const routes: Routes = [
  {
    path: '',
    component: StripePspComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
