import { Autorizacion } from "./autorizacion";
import { AutorizacionEstudiante } from "./autorizacion-estudiante";
import { Usuario } from "./usuario";

export class Recojo{
    id: number;
    fecha_recojo: string;
    aut_est: AutorizacionEstudiante;
    supervisor: Usuario;
}