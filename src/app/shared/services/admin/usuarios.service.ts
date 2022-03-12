import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../common/http-request.service';
import { Parameter } from 'src/app/models/common/parameter';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _request: HttpRequestService) { }

  getUsers(parametro: Parameter): Observable<any> {
    return this._request.http(parametro);
  }

  updateStatus(parametro: Parameter): Observable<any> {
    return this._request.http(parametro);
  }
}
