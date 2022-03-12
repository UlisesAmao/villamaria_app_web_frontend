import { Perfil } from "./perfil"

export class Usuario {
    id: number;
    nombres: String;
    ap_paterno: String;
    ap_materno: String;
    numero_documento: String;
    correo: String;
    activo: Boolean;
    perfil: Perfil
}