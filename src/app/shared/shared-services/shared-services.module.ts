import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbFirebaseService } from './db-firebase.service';
import { UserFirebaseService } from './user-firebase.service';
import { CheckInService } from './check-in.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../../environments/environment';
import { Ng2Webstorage } from 'ngx-webstorage';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    Ng2Webstorage,
  ],
  declarations: []
  , providers: [DbFirebaseService, UserFirebaseService, CheckInService]
})
export class SharedServicesModule { }
