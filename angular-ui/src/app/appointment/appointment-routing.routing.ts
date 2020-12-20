import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentComponent } from './appointment.component';

const routes: Routes = [
  {
    path: '', component: AppointmentComponent,
    children: [
      { path: '', component: AppointmentListComponent },
      { path: 'new', component: AppointmentEditComponent },
      { path: ':id/edit', component: AppointmentEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
