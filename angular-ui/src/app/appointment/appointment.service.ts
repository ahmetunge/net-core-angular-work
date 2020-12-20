import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../environments/environment';
import { Appointment } from '../shared/models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  addAppointment(appointment: Appointment): any {
    return this.http.post(`${environment.apiUrl}/appointments`, appointment);
  }

  getAllAppointments(): any {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/appointments`);
  }

  getAppointmentById(id: number): any {
    return this.http.get<Appointment>(`${environment.apiUrl}/appointments/${id}`);
  }

  updateAppointment(id: number, params: Appointment): any {
    return this.http.put(`${environment.apiUrl}/appointments/${id}`, params);
  }

  deleteAppointment(id: number): any {
    return this.http.delete(`${environment.apiUrl}/appointments/${id}`);
  }

}
