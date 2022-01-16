import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { UploadComponent } from '../admin/upload/upload.component';
import { SampleComponent } from './sample/sample.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'upload', pathMatch: 'full' },
      { path: 'upload', component: UploadComponent, data: { title: ':: Admin :: Upload ::' } },
      { path: 'sample', component: SampleComponent, data: { title: ':: Admin :: Sample ::' } }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);