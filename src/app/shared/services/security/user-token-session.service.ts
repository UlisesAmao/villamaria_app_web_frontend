import { Injectable } from '@angular/core';
import { UserToken } from 'src/app/models/auth/user-token';

@Injectable({
  providedIn: 'root'
})
export class UserTokenSessionService {

  constructor() { }

  setToken(data: string): void {
    localStorage.setItem('token', data);
  }

  getToken(): UserToken {
    return JSON.parse(localStorage.getItem('token'));
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  obtenerPermisosToken(): string[] {
    return JSON.parse(localStorage.getItem('token')).permission;
  }

  obtenerUsuarioId(): number {
    return JSON.parse(localStorage.getItem('token')).id;
  }
}
