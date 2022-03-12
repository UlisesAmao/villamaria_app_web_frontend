import { Injectable } from '@angular/core';
import { User } from 'src/app/models/auth/user';
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

  obtenerNombreUsuario(): String {
    const usuario: User = JSON.parse(localStorage.getItem('token')).userBD;
    return usuario.nombres.split(' ')[0] + ' ' + usuario.ap_paterno;
  }

  obtenerImagenUsuario(): String {
    return JSON.parse(localStorage.getItem('token')).userBD.foto;
  }

  obtenerPerfilUsuario(): String {
    return JSON.parse(localStorage.getItem('token')).userBD.id_perfil;
  }
}
