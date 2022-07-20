import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { UploadComponent } from '../admin/upload/upload.component';
import { SampleComponent } from './sample/sample.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AutorizacionesComponent } from './autorizaciones/autorizaciones.component';
import { RecojosComponent } from './recojos/recojos.component';
import { ResponsableRecojoComponent } from './responsable-recojo/responsable-recojo.component';
import { AuthGuardBackofficeService } from 'src/app/shared/services/security/auth-guard-backoffice.service copy';
import { AuthGuardApafaService } from 'src/app/shared/services/security/auth-guard-apafa.service';
import { InasistenciasComponent } from './inasistencias/inasistencias.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'upload', pathMatch: 'full' },
      { path: 'upload', component: UploadComponent, data: { title: ':: Admin :: Upload ::' } },
      { path: 'sample', component: SampleComponent, data: { title: ':: Admin :: Sample ::' } },
      { path: 'usuario', canActivate: [AuthGuardBackofficeService], component: UsuariosComponent, data: { title: ':: Admin :: Usuarios ::' } },
      { path: 'autorizaciones', canActivate: [AuthGuardBackofficeService], component: AutorizacionesComponent, data: { title: ':: Admin :: Autorizaciones ::' } },
      { path: 'recojos', canActivate: [AuthGuardBackofficeService], component: RecojosComponent, data: { title: ':: Admin :: Recojos ::' } },
      { path: 'inasistencias', canActivate: [AuthGuardBackofficeService], component: InasistenciasComponent, data: { title: ':: Admin :: Inasistencias ::' } },
      { path: 'responsable-recojo', canActivate: [AuthGuardApafaService], component: ResponsableRecojoComponent, data: { title: ':: Admin :: Responsable Recojos ::' } }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);