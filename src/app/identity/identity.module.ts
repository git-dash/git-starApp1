import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedServicesModule } from '../shared/shared-services/shared-services.module';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    // SharedServicesModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)

  ],
  declarations: [LoginComponent, RegisterComponent, ForgotComponent, ProfileComponent]
})
export class IdentityModule { }
