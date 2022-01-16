import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';


@NgModule({
  declarations: [
    LoaderComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FeatherIconsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FeatherIconsComponent
  ]
})
export class SharedModule { }
