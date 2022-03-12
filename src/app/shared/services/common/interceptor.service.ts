import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
            }
          },
          error => {
            console.log(error)
            let fire = {
              title: '',
              text: ''
            };
            if (error.status == 0) {
              fire.title = 'Alerta!';
              fire.text = 'El servidor no responde';
            } else if (error.status == 400) {
              fire.title = 'Alerta!';
              fire.text = error.error.message;
            } else if (error.status == 401) {
              localStorage.clear();
              this._router.navigateByUrl('/auth/login');
              fire.title = 'Alerta!';
              let msg = error.error.MensajeError ? error.error.MensajeError : 'Vuelva a ingresar por favor.';
              fire.text = 'Acceso denegado: ' + msg;
            } else {
              fire.title = 'Alerta!';
              // fire.text = error.statusText;
              fire.text = error.error.message;
            }
            Swal.fire({
              title: fire.title,
              text: fire.text,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          })
      )
  }
}
