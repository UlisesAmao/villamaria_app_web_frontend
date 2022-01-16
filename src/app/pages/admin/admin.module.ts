import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminComponent } from './admin.component';
import { UploadComponent } from './upload/upload.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { routing } from './admin.routing';
import { SampleComponent } from './sample/sample.component';



@NgModule({
  declarations: [
    AdminComponent,
    UploadComponent,
    SampleComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
