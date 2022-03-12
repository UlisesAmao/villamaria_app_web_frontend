import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Generic } from 'src/app/constants/common/generic';
import { Parameter } from 'src/app/models/common/parameter';
import { PadreService } from 'src/app/shared/services/admin/padre.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  submitted: boolean = false;
  file: File;
  formUpload: FormGroup;

  constructor(private _fb: FormBuilder,
    private _padreService: PadreService,
    private _router: Router) {
    this.formUpload = this._fb.group({
      file: [null, Validators.required]
    }); }

  ngOnInit(): void {
    if (this.formUpload.invalid || !this.file || this.file == null) {
      return
    }
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
    parametro.url = '/padre';
    parametro.request = 'FILE_FORM_POST';
    let param = new FormData();
    param.append('file', this.file);
    parametro.data = param;
    this._padreService.upload(parametro).subscribe(
      value => {
        alert("Archivo Cargado");
      }
    );
  }
}
