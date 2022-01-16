import { DatePipe } from '@angular/common';

export class UtilFecha {

    static obtenerFechaActual(): Date {
        return new Date();
    }

    static obtenerAnioActual(): number {
        return new Date().getFullYear();
    }

    static generarFechaDesdeCadena(cadena: string): Date {
        let fecha: Date;
        if (cadena) {
            let elem = cadena.split('-');
            fecha = new Date(+elem[0], +elem[1] - 1, +elem[2]);
        }
        return fecha;
    }

    static generarFechaDesdeCadena2(cadena: string): Date {
        let fecha: Date;
        if (cadena) {
            let elem = cadena.split('/');
            fecha = new Date(+elem[2], +elem[1] - 1, +elem[0]);
        }
        return fecha;
    }

    static generarCadenaDesdeFecha(fecha: Date, formato: string): string {
        return new DatePipe('en-US').transform(fecha, formato);
    }

    static generarFecha(dia: number, mes: number, anio: number): string {
        let fecha = new Date(anio, mes - 1, dia);
        return this.generarCadenaDesdeFecha(fecha, 'yyyy-MM-dd');
    }

    static generarJsonDesdeFecha(fecha: string): any {
        let date= new DatePipe('en-US').transform(fecha, 'yyyy-MM-dd');
        let fechaFormat = this.generarFechaDesdeCadena(date);
        let fechajson = { year: fechaFormat.getFullYear(), day: fechaFormat.getDay(), month: fechaFormat.getMonth() };
        return fechajson;
    }
}