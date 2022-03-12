import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pagination } from 'src/app/models/common/pagination';
import { Parameter } from 'src/app/models/common/parameter';
import { RecojosService } from 'src/app/shared/services/admin/recojos.service';
import { saveAs as importedSaveAs } from 'file-saver';
import { Recojo } from 'src/app/models/admin/recojo';

@Component({
  selector: 'app-recojos',
  templateUrl: './recojos.component.html',
  styleUrls: ['./recojos.component.scss']
})
export class RecojosComponent implements OnInit {
  
  pagination: Pagination = new Pagination;
  recojos: Recojo[];
  filterRecojos: FormGroup;

  constructor(private _recojosService: RecojosService,
    private _fb: FormBuilder) {
    this.filterRecojos = _fb.group({
      limit: 10,
      offset: 0,
      search: ''
    });
  }

  ngOnInit(): void {
  }

  getRecojos(page: number){
    this.filterRecojos.get('offset').setValue((page==0?page:page-1)*this.filterRecojos.get('limit').value);
    const parametro: Parameter = new Parameter;
    parametro.url = `/recojos?limit=${this.filterRecojos.get('limit').value}&offset=${this.filterRecojos.get('offset').value}&search=${this.filterRecojos.get('search').value}`;
    parametro.request = 'GET';
    this._recojosService.getRecojos(parametro).subscribe(
      value => {
        this.recojos = value.data.recojos;
        this.pagination.numeroPaginas = value.data.paginas;
        this.pagination.page = page==0?page+1:page;
      }
    );
  }
  
  getFile(){
    const parametro: Parameter = new Parameter;
    parametro.url = `/recojos/file?search=${this.filterRecojos.get('search').value}`;
    parametro.request = 'GET';
    this._recojosService.getFile(parametro).subscribe(
      value => {
        importedSaveAs(value.data.URL);
      }
    );
  }
}
