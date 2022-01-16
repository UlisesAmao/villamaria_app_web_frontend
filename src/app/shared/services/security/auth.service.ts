import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parameter } from 'src/app/models/common/parameter';
import { HttpRequestService } from '../common/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _request: HttpRequestService) { }

  auth(parametro: Parameter): Observable<any> {
    return this._request.http(parametro);
  }
}
