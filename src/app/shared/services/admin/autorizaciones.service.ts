import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../common/http-request.service';
import { Parameter } from 'src/app/models/common/parameter';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionesService {

  constructor(private _request: HttpRequestService) { }

  getAutorizaciones(parametro: Parameter): Observable<any> {
    return this._request.http(parametro);
  }

  getFile(parametro: Parameter): Observable<any> {
    return this._request.http(parametro);
  }
}
