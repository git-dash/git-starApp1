import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { SharedServicesModule } from './shared/shared-services/shared-services.module';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'hotel'
  },
  {
    path: 'hotel',
    loadChildren: './pre-stay/pre-stay.module#PreStayModule'
  },
  {
    path: 'check-in',
    loadChildren: './check-in/check-in.module#CheckInModule'
  },

  {
    path: 'identity',
    loadChildren: './identity/identity.module#IdentityModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },


];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedMaterialModule,
    SharedServicesModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
