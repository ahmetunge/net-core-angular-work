import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/internal/operators/first';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllAppintments();
  }

  deleteAppointment(id: number): void {
    const appointment = this.appointments.find(x => x.id === id);
    appointment.isDeleting = true;
    this.appointmentService.deleteAppointment(id)
      .pipe(first())
      .subscribe(() => {
        this.appointments = this.appointments.filter(x => x.id !== id);
        this.toastr.success('Appointment deleted');
      });
  }

  getAllAppintments(): any {
    this.appointmentService.getAllAppointments()
      .pipe(first())
      .subscribe((appointments: any[]) => this.appointments = appointments);
  }

}
