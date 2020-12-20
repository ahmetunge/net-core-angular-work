import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

const usersKey = 'users';
const appointmentsKey = 'appointments';
const users = JSON.parse(localStorage.getItem(usersKey) || '[]') || [];
let appointments = JSON.parse(localStorage.getItem(appointmentsKey) || '[]') || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    // tslint:disable-next-line:typedef
    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/appointments') && method === 'GET':
          return getAppoitments();
        case url.endsWith('/appointments') && method === 'POST':
          return addAppointment();
        case url.match(/\/appointments\/\d+$/) && method === 'GET':
          return getAppointmentById();
        case url.match(/\/appointments\/\d+$/) && method === 'PUT':
          return updateAppointment();
        case url.match(/\/appointments\/\d+$/) && method === 'DELETE':
          return deleteAppointment();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    // tslint:disable-next-line:typedef
    function authenticate() {
      const { username, password } = body;
      const user = users.find((x: { username: any; password: any; }) => x.username === username && x.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }

      return ok({
        ...basicDetails(user),
        token: 'fake-jwt-token'
      });
    }

    // tslint:disable-next-line:typedef
    function register() {
      const user = body;

      if (users && users.find((x: { username: any; }) => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      user.id = users.length ? Math
        .max(...users
          .map((x: { id: any; }) => x.id)) + 1 : 1;

      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
    }

    // tslint:disable-next-line:typedef
    function getAppoitments() {
      if (!isLoggedIn()) { return unauthorized(); }
      return ok(appointments
        .map((x: { id: any; name: any; startDate: any; endDate: any, isActive: any; description: any }) => basicAppointmentDetails(x)));
    }

    // tslint:disable-next-line:typedef
    function getAppointmentById() {
      if (!isLoggedIn()) { return unauthorized(); }

      const appointment = appointments.find((x: { id: number; }) => x.id === idFromUrl());
      return ok(basicAppointmentDetails(appointment));
    }

    // tslint:disable-next-line:typedef
    function updateAppointment() {
      if (!isLoggedIn()) { return unauthorized(); }

      const params = body;
      const appointment = appointments.find((x: { id: number; }) => x.id === idFromUrl());
      // update and save user
      Object.assign(appointment, params);
      localStorage.setItem(appointmentsKey, JSON.stringify(appointments));

      return ok();
    }

    // tslint:disable-next-line:typedef
    function addAppointment() {
      if (!isLoggedIn()) { return unauthorized(); }

      const appointment = body;

      appointment.id = appointments.length ? Math.max(...appointments.map((x: { id: any; }) => x.id)) + 1 : 1;
      appointments.push(appointment);
      localStorage.setItem(appointmentsKey, JSON.stringify(appointments));
      return ok();
    }


    // tslint:disable-next-line:typedef
    function deleteAppointment() {
      if (!isLoggedIn()) { return unauthorized(); }

      appointments = appointments.filter((x: { id: number; }) => x.id !== idFromUrl());
      localStorage.setItem(appointmentsKey, JSON.stringify(appointments));
      return ok();
    }

    // helper functions

    // tslint:disable-next-line:typedef
    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500)); // delay observable to simulate server api call
    }

    // tslint:disable-next-line:typedef
    function error(message: string) {
      return throwError({ error: { message } })
        // tslint:disable-next-line:max-line-length
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    // tslint:disable-next-line:typedef
    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorized' } })
        .pipe(materialize(), delay(500), dematerialize());
    }

    // tslint:disable-next-line:typedef
    function basicDetails(user: { id: any; username: any; firstName: any; lastName: any; }) {
      const { id, username, firstName, lastName } = user;
      return { id, username, firstName, lastName };
    }

    // tslint:disable-next-line:typedef
    function basicAppointmentDetails(appointment: { id: any; name: any; startDate: any; endDate: any; isActive: any, description: any }) {
      const { id, name, startDate, endDate, isActive, description } = appointment;
      return { id, name, startDate, endDate, isActive, description };
    }

    // tslint:disable-next-line:typedef
    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    // tslint:disable-next-line:typedef
    function idFromUrl() {
      const urlParts = url.split('/');
      // tslint:disable-next-line:radix
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
