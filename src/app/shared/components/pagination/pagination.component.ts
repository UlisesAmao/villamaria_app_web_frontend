import { Component, OnInit, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from 'src/app/models/common/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() numeroPaginas: number;
  @Input() paginaActual: number = 1;
  @Output() onSubmit = new EventEmitter<any>();
  paginas: number[];
  desdePage: number;
  hastaPage: number;

  constructor() { }

  ngOnInit() {
    this.initPaginacion();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    let paginacionActualizado = simpleChanges['numeroPaginas'];
    let paginaActualizado = simpleChanges['paginaActual'];
    if (paginacionActualizado.previousValue) {
      this.initPaginacion();
    }
    if (paginaActualizado.previousValue) {
      this.initPaginacion();
    }
  }

  initPaginacion() {
    this.desdePage = Math.min(Math.max(1, this.paginaActual - 4), this.numeroPaginas - 5);
    this.hastaPage = Math.max(Math.min(this.numeroPaginas, this.paginaActual + 4), 6);
    if (this.numeroPaginas > 5) {
      this.paginas = Array(this.hastaPage - this.desdePage + 1).fill(0).map((_valor, indice) => indice + this.desdePage);
    } else {
      this.paginas = Array(this.numeroPaginas).fill(0).map((_valor, indice) => indice + 1);
    }
  }

  buscador(pagina: number) {
    this.paginaActual = pagina;
    this.onSubmit.emit(this.paginaActual);
    this.initPaginacion();
  }

}
