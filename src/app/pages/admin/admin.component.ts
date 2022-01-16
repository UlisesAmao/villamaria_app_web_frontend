import { Component, HostListener, OnInit } from '@angular/core';
import { CustomizerService } from 'src/app/shared/services/common/customizer.service';
import { NavService } from 'src/app/shared/services/common/nav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  public right_side_bar: boolean;

  constructor(public _navServices: NavService,
    public _customizer: CustomizerService) { }


  ngAfterViewInit() {
    // setTimeout(() => {
    //   feather.replace();
    // });
  }

  @HostListener('document:click', ['$event'])
  clickedOutside(event) {
    // click outside Area perform following action
    document.getElementById('outer-container').onclick = function (e) {
      e.stopPropagation()
      if (e.target != document.getElementById('search-outer')) {
        document.getElementsByTagName("body")[0].classList.remove("offcanvas");
      }
      if (e.target != document.getElementById('outer-container')) {
        document.getElementById("canvas-bookmark").classList.remove("offcanvas-bookmark");
      }
      // if (e.target != document.getElementById('inner-customizer')) {
      //   document.getElementsByClassName("customizer-links")[0].classList.remove("open")
      //   document.getElementsByClassName("customizer-contain")[0].classList.remove("open")
      // }
    }
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  public rightSidebar($event) {
    this.right_side_bar = $event
  }
  
  ngOnInit() { }
}
