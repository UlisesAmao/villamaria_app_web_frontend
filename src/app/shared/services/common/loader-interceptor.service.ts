import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  private counter = 0;

  constructor(private _loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('excludeLoader')) {
      this.showLoader();
    }

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (!req.headers.has('excludeLoader')) {
              this.onEnd();
            }
          }
        },
        (err: any) => {
          if (!req.headers.has('excludeLoader')) {
            this.onEnd();
          }
        }
      )
    );
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.counter++;
    this._loaderService.show();
  }

  private hideLoader(): void {
    this.counter--;
    if (this.counter === 0) {
      this._loaderService.hide();
    }
  }
}
