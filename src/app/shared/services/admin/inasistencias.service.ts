import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../common/http-request.service';
import { Parameter } from 'src/app/models/common/parameter';

@Injectable({
  providedIn: 'root'
})
export class InasistenciasService {

  constructor(private _request: HttpRequestService) { }

  getInasistencias(parametro: Parameter): Observable<any> {
    return this._request.http(parametro);
  }

  upload(parametro: Parameter): Observable<any> {
    return this._request.http(parametro);
  }
}
