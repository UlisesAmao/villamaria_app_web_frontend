import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pagination } from 'src/app/models/common/pagination';
import { Parameter } from 'src/app/models/common/parameter';
import { AutorizacionesService } from 'src/app/shared/services/admin/autorizaciones.service';
import { saveAs as importedSaveAs } from 'file-saver';
import { AutorizacionGeneral } from 'src/app/models/admin/autorizacion-general';

@Component({
  selector: 'app-autorizaciones',
  templateUrl: './autorizaciones.component.html',
  styleUrls: ['./autorizaciones.component.scss']
})
export class AutorizacionesComponent implements OnInit {
  
  pagination: Pagination = new Pagination;
  autorizaciones: AutorizacionGeneral[];
  filterAutorizaciones: FormGroup;

  constructor(private _autorizacionesService: AutorizacionesService,
    private _fb: FormBuilder) {
    this.filterAutorizaciones = _fb.group({
      limit: 10,
      offset: 0,
      search: ''
    });
  }

  ngOnInit(): void {
  }


  getAutorizaciones(page: number){
    this.filterAutorizaciones.get('offset').setValue((page==0?page:page-1)*this.filterAutorizaciones.get('limit').value);
    const parametro: Parameter = new Parameter;
    parametro.url = `/autorizaciones?limit=${this.filterAutorizaciones.get('limit').value}&offset=${this.filterAutorizaciones.get('offset').value}&search=${this.filterAutorizaciones.get('search').value}`;
    parametro.request = 'GET';
    this._autorizacionesService.getAutorizaciones(parametro).subscribe(
      value => {
        this.autorizaciones = value.data.autorizaciones;
        this.pagination.numeroPaginas = value.data.paginas;
        this.pagination.page = page==0?page+1:page;
      }
    );
  }
  
  getFile(){
    const parametro: Parameter = new Parameter;
    parametro.url = `/autorizaciones/file?search=${this.filterAutorizaciones.get('search').value}`;
    parametro.request = 'GET';
    this._autorizacionesService.getFile(parametro).subscribe(
      value => {
        importedSaveAs(value.data.URL);
      }
    );
  }
}
