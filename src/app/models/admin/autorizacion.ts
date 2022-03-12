import { Usuario } from "./usuario";

export class Autorizacion{
    id: number;
    apoderado: Usuario;
    autorizado: Usuario;
    fecha_fin: String;
    fecha_inicio: String;
}