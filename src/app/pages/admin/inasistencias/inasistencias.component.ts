import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Generic } from 'src/app/constants/common/generic';
import { InasistenciaEstudiante } from 'src/app/models/admin/inasistencia-estudiante';
import { Pagination } from 'src/app/models/common/pagination';
import { Parameter } from 'src/app/models/common/parameter';
import { InasistenciasService } from 'src/app/shared/services/admin/inasistencias.service';

@Component({
  selector: 'app-inasistencias',
  templateUrl: './inasistencias.component.html',
  styleUrls: ['./inasistencias.component.scss']
})
export class InasistenciasComponent implements OnInit {

  pagination: Pagination = new Pagination;
  inasistencias: InasistenciaEstudiante[];
  filterInasistencias: FormGroup;

  submitted: boolean = false;
  file: File;
  formUpload: FormGroup;

  constructor(private _inasistenciasService: InasistenciasService,
    private _fb: FormBuilder) {
    this.filterInasistencias = _fb.group({
      limit: 10,
      offset: 0,
      search: ''
    });
    this.formUpload = this._fb.group({
      file: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.formUpload.invalid || !this.file || this.file == null) {
      return
    }
  }



  getInasistencias(page: number){
    //this.filterInasistencias.get('offset').setValue((page==0?page:page-1)*this.filterInasistencias.get('limit').value);
    const parametro: Parameter = new Parameter;
    /*
    parametro.url = `/recojos?limit=${this.filterRecojos.get('limit').value}&offset=${this.filterRecojos.get('offset').value}&search=${this.filterRecojos.get('search').value}`;
    parametro.request = 'GET';
    this._inasistenciasService.getInasistencias(parametro).subscribe(
      value => {
        this.inasistencias = value.data.recojos;
        //this.pagination.numeroPaginas = value.data.paginas;
        //this.pagination.page = page==0?page+1:page;
      }
    );*/
  }
  
  uploadFileInasistence(){
    /*
    const parametro: Parameter = new Parameter;
    parametro.url = `/recojos/file?search=${this.filterRecojos.get('search').value}`;
    parametro.request = 'GET';
    this._recojosService.getFile(parametro).subscribe(
      value => {
        importedSaveAs(value.data.URL);
      }
    );*/
  }


  seleccionarArchivo(event: any){
    const archivos: FileList = event.target.files;
    if (archivos) {
      let name = archivos[0].name.split('.');
      if (name[name.length - 1] != 'xlsx') {
        this.file = null;
        alert('Solo se aceptan archivos .xlsx')
      } else {
        const tamanioMaximoFile = Generic.MAXIMO_TAMANIO_FILE * 1024 * 1024;
        if (archivos && archivos[0] && archivos[0].size > tamanioMaximoFile) {
          this.file = null;
          alert(`El archivo sobrepasa los ${Generic.MAXIMO_TAMANIO_FILE} MB`);
        } else {
          this.formUpload.get('file').setValue(archivos[0].name);
          this.file = archivos[0];
        }
      }
    }
  }

  loadFile() {
    const parametro: Parameter = new Parameter;
    parametro.url = '/inasistencias';
    parametro.request = 'FILE_FORM_POST';
    let param = new FormData();
    param.append('file', this.file);
    parametro.data = param;
    this._inasistenciasService.upload(parametro).subscribe(
      value => {
        alert("Archivo Cargado");
      }
    );
  }

}
