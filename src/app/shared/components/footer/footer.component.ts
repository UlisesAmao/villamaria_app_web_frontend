import { Component, OnInit } from '@angular/core';
import { UtilFecha } from '../../util/util.fecha';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  anio: number;

  constructor() { }

  ngOnInit() {
    this.anio = UtilFecha.obtenerAnioActual();
   }

}
