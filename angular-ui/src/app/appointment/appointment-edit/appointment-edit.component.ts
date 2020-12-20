import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/internal/operators/first';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {

  form: any;
  id = 0;
  isAddMode = true;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isActive: [true],
      description: [''],
    });

    if (!this.isAddMode) {
      this.appointmentService.getAppointmentById(this.id)
        .pipe(first())
        .subscribe((x: any) => {
          this.form.patchValue(x);
        });
    }
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createAppointment();
    } else {
      this.updateAppointment();
    }
  }

  private createAppointment(): void {
    this.appointmentService.addAppointment(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('Appointment added successfully');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (error: any) => {
          this.toastr.error(error);
          this.loading = false;
        }
      });
  }

  private updateAppointment(): void {
    this.appointmentService.updateAppointment(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastr.success('Update successful');
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (error: any) => {
          this.toastr.error(error);
          this.loading = false;
        }
      });
  }

}
