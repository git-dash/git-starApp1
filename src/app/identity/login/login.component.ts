import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { UserFirebaseService } from '../../shared/shared-services/user-firebase.service';

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  formTitle: String = 'Start Residentz!';
  loginForm: FormGroup;
  username: string;
  password: string;
  invalidUser: any = {
    'error': false,
    'message': ''
  };
  // constructor(public afAuth: AngularFireAuth) { }


  constructor(private _formBuilder: FormBuilder, private _router: Router
    , private _route: ActivatedRoute, private _dbService: DbFirebaseService
    , private _userDbService: UserFirebaseService
  ) {
    // this.redirectUrl = this._route.queryParams['returnUrl'];
    this.loginForm = _formBuilder.group({
      // tslint:disable-next-line:max-line-length
      'username': [null, [Validators.required,
      // Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      Validators.email
      ]],
      'password': [null,
        [Validators.required,
        Validators.minLength(4), Validators.maxLength(99)
        ]],
      // 'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(500)])],
      // 'validate': ''
    });


  }

  login(provider: number, post?: any) {
    console.log(provider, post);

    this._userDbService.login(provider, post).then((response) => {
      // this._dbService.setStoreData('currentUser', response);
      this._router.navigate([this.returnUrl]);
    }, error => {
      console.log(error);
      this.invalidUser = {
        message: 'Invalid Username Or Password',
        error: true
      };

    });

  }


  /*

   loginWithGmail() {
  //   this._userDbService.loginWithGmail().then((response) => {
  //     if (response) {
  //       this._dbService.setStoreData('currentUser', response);
  //       // console.log(response + '\n' + this._dbService.getStoreData('currentUser'));
  //       this._router.navigate([this.returnUrl]);
  //     }
  //   });
  // }
   logout() {
  //   this._userDbService.logoutWithGmail();
  //   this._dbService.setStoreData('currentUser', null);
  // }
  // addPost(post) {
  //   this.loginWithApplication(post);
  //   this.username = post.username;
  //   this.password = post.password;
  //   const allusers = this._fireDatabase.list('users').valueChanges().subscribe((users: any) => {
  //     console.log(users);
  //     const isValid = users.findIndex((x: any) => x.email === this.username && x.password === this.password);
  //     if (isValid === -1) {
  //       this.invalidUser = {
  //         'error': true,
  //         'message': 'Invalid Username or Password'
  //       };
  //     } else {
  //       this.invalidUser = {
  //         'error': false,
  //         'message': ''
  //       };
  //       // sessionStorage.setItem('currentUser', JSON.stringify(users[isValid]));
  //       this._dbService.setStoreData('currentUser', users[isValid]);
  //       this._router.navigate([this.returnUrl]);
  //     }
  //   });
  //   console.log(allusers);
  // }


  addPost(post) {
    // loginWithApplication(post) {
    console.log(post);

    this._userDbService.loginWithApplication(post).subscribe((response: any) => {
      if (response) {
        // const querybaseRef = querybase.ref(databaseRef, ['name', 'age', 'location']);
        const isValid = response.findIndex((x: any) => x.email === post.username && x.password === post.password);
        if (isValid === -1) {
          this.invalidUser = {
            'error': true,
            'message': 'Invalid Username or Password'
          };
        } else {
          this.invalidUser = {
            'error': false,
            'message': ''
          };
          // name = user.displayName;
          // email = user.email;
          // photoUrl = user.photoURL;
          // emailVerified = user.emailVerified;
          // uid = user.uid;  // The user
          const user = {
            displayName: response[isValid].displayName,
            email: response[isValid].email,
            registeredWith: response[isValid].registeredWith
          };
          // sessionStorage.setItem('currentUser', JSON.stringify(users[isValid]));
          this._dbService.setStoreData('currentUser', user);
          // console.log(response + '\n' + this._dbService.getStoreData('currentUser'));
          this._router.navigate([this.returnUrl]);
        }
      }
      console.log(response);
    });
  }

  */
  ngOnInit() {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || 'hotel/booking/search';

    // const ref = firebase.database().ref('/');
    // const user = {
    //   'name': this.name, 'email': this.email, 'password': this.password,
    //   'mobile': this.mobile, 'DateofBirth': this.dob, 'gender': this.gender
    // };
    // ref.child('registeration').push(user);


  }

}
