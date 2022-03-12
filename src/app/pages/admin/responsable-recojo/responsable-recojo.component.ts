import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/admin/usuario';
import { Pagination } from 'src/app/models/common/pagination';
import { Parameter } from 'src/app/models/common/parameter';
import { ResponsableRecojosService } from 'src/app/shared/services/admin/responsable-recojo.service';

@Component({
  selector: 'app-responsable-recojo',
  templateUrl: './responsable-recojo.component.html',
  styleUrls: ['./responsable-recojo.component.scss']
})
export class ResponsableRecojoComponent implements OnInit {

  pagination: Pagination = new Pagination;
  usuarios: Usuario[];
  filterResponsableRecojo: FormGroup;

  constructor(private _responsableRecojosService: ResponsableRecojosService,
    private _fb: FormBuilder) {
    this.filterResponsableRecojo = _fb.group({
      limit: 10,
      offset: 0,
      search: ''
    });
   }

  ngOnInit(): void {
  }

  getResponsableRecojo(page: number){
    this.filterResponsableRecojo.get('offset').setValue((page==0?page:page-1)*this.filterResponsableRecojo.get('limit').value);
    console.log(this.filterResponsableRecojo.value);
    const parametro: Parameter = new Parameter;
    parametro.url = `/autorizados?limit=${this.filterResponsableRecojo.get('limit').value}&offset=${this.filterResponsableRecojo.get('offset').value}&search=${this.filterResponsableRecojo.get('search').value}`;
    parametro.request = 'GET';
    this._responsableRecojosService.getResponsableRecojo(parametro).subscribe(
      value => {
        this.usuarios = value.data.usuarios;
        this.pagination.numeroPaginas = value.data.paginas;
        this.pagination.page = page==0?page+1:page;
      }
    );
  }

  changeStatus(user: Usuario){
    user.activo = !user.activo;
    this.updateStatus(user);
  }

  updateStatus(user: Usuario){
    const parametro: Parameter = new Parameter;
    parametro.url = `/usuarios/${user.id}/estado`;
    parametro.data = {
      estado: user.activo
    }
    parametro.request = 'PUT';
    console.log("DATA: ", parametro);
    this._responsableRecojosService.updateStatus(parametro).subscribe(
      value => {
        console.log(value);
        this.getResponsableRecojo(1);
      }
    );
  }
}
