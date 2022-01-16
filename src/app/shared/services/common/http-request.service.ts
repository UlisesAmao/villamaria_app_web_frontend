import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parameter } from 'src/app/models/common/parameter';
import { environment } from 'src/environments/environment';
import { UserTokenSessionService } from '../security/user-token-session.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private _http: HttpClient,
    private _userTokenSessionService: UserTokenSessionService) { }

  public http(parametro: Parameter): Observable<any> {
    parametro.url = parametro.url.includes('http') || parametro.url.includes('https') ? parametro.url : environment.backendService + parametro.url;
    console.log(parametro.url)
    return this.callHttpClient(parametro);
  }

  private callHttpClient(parametro: Parameter): Observable<any> {
    let rpta: Observable<any>;
    switch (parametro.request) {
      case 'GET':
        rpta = this._http.get(parametro.url, this.getHttpOptions(parametro.excludeLoader, parametro.useToken));
        break;
      case 'DELETE':
        rpta = this._http.delete(parametro.url, this.getHttpOptions(parametro.excludeLoader, parametro.useToken));
        break;
      case 'PUT':
        rpta = this._http.put(parametro.url, parametro.data, this.getHttpOptions(parametro.excludeLoader, parametro.useToken));
        break;
      case 'POST':
        rpta = this._http.post<any>(parametro.url, parametro.data, this.getHttpOptions(parametro.excludeLoader, parametro.useToken));
        break;
      case 'FILE':
        rpta = this._http.get(parametro.url, this.getHttpOptionsFile());
        break;
      case 'FILE_FORM_POST':
        rpta = this._http.post(parametro.url, parametro.data, this.getHttpOptionsFileForm(parametro.excludeLoader));
        break;
      case 'FILE_FORM_PUT':
        rpta = this._http.put(parametro.url, parametro.data, this.getHttpOptionsFileForm(parametro.excludeLoader));
        break;
    }
    return rpta;
  }

  getHttpOptions(excludeLoader: string, useToken: boolean): any {
    let cabeceras = {};

    cabeceras['Content-Type'] = 'application/json';
    if (useToken)
      cabeceras['Authorization'] = this._userTokenSessionService.getToken().AuthenticationResult.IdToken;
    if (+excludeLoader)
      cabeceras['excludeLoader'] = excludeLoader;
    return { headers: new HttpHeaders(cabeceras) };
  }

  getHttpOptionsFile(): any {
    let httpOptions;
    if (this._userTokenSessionService.getToken()) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this._userTokenSessionService.getToken().AuthenticationResult.IdToken
        }),
        responseType: 'blob'
      };
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        responseType: 'blob'
      };
    }
    return httpOptions;
  }

  getHttpOptionsFileForm(excludeLoader: string): any {
    let header;
    if (+excludeLoader) {
      header = {
        'Authorization': this._userTokenSessionService.getToken().AuthenticationResult.IdToken,
        'excludeLoader': excludeLoader
      }
    } else {
      header = {
        'Authorization': this._userTokenSessionService.getToken().AuthenticationResult.IdToken,
      }
    }
    return { headers: new HttpHeaders(header) };
  }
}
