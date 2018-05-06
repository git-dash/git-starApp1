import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';


import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { UserFirebaseService } from '../../shared/shared-services/user-firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  maxDate = new Date();
  formTitle: String = 'Register';
  loginForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _router: Router
    , private _dbFirebaseService: DbFirebaseService, private _userDbService: UserFirebaseService
  ) {
    this.loginForm = _formBuilder.group({
      'fullName': [null, Validators.required],
      // tslint:disable-next-line:max-line-length
      'email': [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      'mobile': [null, [Validators.required,
      Validators.pattern(/[0-9]{10}$/), Validators.minLength(10), Validators.maxLength(10)
      ]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'gender': [null, Validators.required],
      'dob': [null, Validators.required],
      // 'username': [null, Validators.required],
      // 'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(500)])],

    });


    this.loginForm.patchValue({
      fullName: 'asd',
      email: 'user1@star.com',
      mobile: '1231231321',
      password: 'asd111',
      gender: 'male',
      'dob': new Date()
    });
  }

  register(post) {
    // register into firebase

    this._userDbService.register({
      'email': post.email,
      'displayName': post.fullName,
      'mobile': post.mobile,
      'password': post.password,
      'gender': post.gender,
      'dob': post.dob,
    }).then((resp: any) => {
      if (!resp.error) {

        alert('Registered Succuessfully ! Please search hotel or Kindly Update Profile');
        this.loginForm.reset();
        this._router.navigate(['/hotel/booking/search']);
      } else {

        alert(resp.message);
      }
    }, error => {

    });

    // alert(response.message);
    // if (!response.error) {
    // this.loginForm.reset();
    // }

    //  send mail
  }
  ngOnInit() {
  }

}
