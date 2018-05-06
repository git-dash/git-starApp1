import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../../shared/shared-services/user-firebase.service';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUserProfile: any;
  currentUser: any;


  roomTypes = environment.filterData.roomTypes;
  foodTypes = environment.filterData.foodType;
  serviceTypes = environment.filterData.commonService;


  constructor(private _dbService: DbFirebaseService, private _userDbService: UserFirebaseService
    , private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.currentUser = this._dbService.getStoreData('currentUser');

    if (this.currentUser) {
      // const this.currentUserProfile
      this.profileForm = this._formBuilder.group({
        phoneNumber: [this.currentUser.phoneNumber, [Validators.required,
        Validators.pattern(/[0-9]{10}$/), Validators.minLength(10), Validators.maxLength(10)]],

        gender: [this.currentUser.gender, Validators.required],
        foodPreference: [this.currentUser.foodPreference],
        roomPreference: [this.currentUser.roomPreference],
        servicePreference: [this.currentUser.servicePreference],
        paymentMode: [this.currentUser.paymentMode, Validators.required],
        photoURL: [this.currentUser.photoURL]
      });
    }

    // this._userDbService.getUserProfile(this.currentUser.userId)
    //   .subscribe(response => {
    //     const x: any = response[0];
    //     x.phoneNumber = x.phoneNumber || null;
    //     x.gender = x.gender || null;
    //     x.paymentMode = x.paymentMode || null;
    //     x.foodPreference = x.foodPreference || [];
    //     x.roomPreference = x.roomPreference || [];
    //     x.servicePreference = x.servicePreference || [];
    //     x.photoURL = x.photoURL || 'assets/logo/man.png';
    //     this.currentUserProfile = x;

    //     this.profileForm = this._formBuilder.group({
    //       phoneNumber: [this.currentUserProfile.phoneNumber, [Validators.required,
    //       Validators.pattern(/[0-9]{10}$/), Validators.minLength(10), Validators.maxLength(10)]],

    //       gender: [this.currentUserProfile.gender, Validators.required],
    //       foodPreference: [this.currentUserProfile.foodPreference],
    //       roomPreference: [this.currentUserProfile.roomPreference],
    //       servicePreference: [this.currentUserProfile.servicePreference],
    //       paymentMode: [this.currentUserProfile.paymentMode, Validators.required],
    //       photoURL: [this.currentUserProfile.photoURL]
    //     });

    //   }, error => {
    //     console.log(error);
    //   });

    console.log(this.profileForm);

  }

  updateProfile(newProfile) {

    // newProfile.servicePreference.forEach((element: any) => {
    //   element = element.label;
    // });
    newProfile.servicePreference = newProfile.servicePreference.map(x => x);
    console.log(newProfile);
    this._userDbService.updateUserProfile(newProfile, this.currentUser.pushId)
      ;
  }

  onChange(event) {

    const files = event.srcElement.files;
    console.log(files);
    const fi = new FileReader();


    fi.onload =
      (e) => {
        // this.dataurl = fi.result;
        console.log(fi.result);

        // this.profileForm.controls['photoURL'].patchValue(fi.result);

        this.profileForm.patchValue({
          photoURL: fi.result,

        });
        this.profileForm.markAsDirty();
        // this.profileForm.
      };

    // fi.onload(x => console.log(x));

    fi.readAsDataURL(files[0]);
  }

}
