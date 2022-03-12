import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../services/common/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public show: boolean = false;

  constructor(private _loaderService: LoaderService) {
    // setTimeout(() => {
    //   this.show = false;
    // }, 1500);
  }

  ngOnInit() {
    this._loaderService.loaderState.subscribe(value => {
      this.show = true;
      this._loaderService.loaderState.subscribe(
        value => {
          this.show = value.show;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  ngOnDestroy() { }

}
