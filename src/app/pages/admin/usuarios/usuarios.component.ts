import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/admin/usuario';
import { Pagination } from 'src/app/models/common/pagination';
import { Parameter } from 'src/app/models/common/parameter';
import { UsuarioService } from 'src/app/shared/services/admin/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  pagination: Pagination = new Pagination;
  usuarios: Usuario[];
  filterUsuarios: FormGroup;

  constructor(private _usuarioService: UsuarioService,
    private _fb: FormBuilder) {
    this.filterUsuarios = _fb.group({
      limit: 10,
      offset: 0,
      search: ''
    });
   }

  ngOnInit(): void {
  }

  getUsers(page: number){
    this.filterUsuarios.get('offset').setValue((page==0?page:page-1)*this.filterUsuarios.get('limit').value);
    console.log(this.filterUsuarios.value);
    const parametro: Parameter = new Parameter;
    parametro.url = `/usuarios?limit=${this.filterUsuarios.get('limit').value}&offset=${this.filterUsuarios.get('offset').value}&search=${this.filterUsuarios.get('search').value}`;
    parametro.request = 'GET';
    this._usuarioService.getUsers(parametro).subscribe(
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
    this._usuarioService.updateStatus(parametro).subscribe(
      value => {
        console.log(value);
        this.getUsers(1);
      }
    );
  }
}
