import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DbFirebaseService } from '../shared-services/db-firebase.service';

@Injectable()
export class BookGuard implements CanActivate {
  constructor(private _router: Router, private _dbService: DbFirebaseService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;

    // const currentUser = this._dbService.getStoreData('currentUser') || null;

    const finalHotel = this._dbService.getStoreData('finalHotel') || null;
    const finalRoom = this._dbService.getStoreData('finalRoom') || null;

    const searchDetails = this._dbService.getStoreData('searchDetails') || null;
    // JSON.parse(sessionStorage.getItem('currentUser'));
    if (finalHotel && finalRoom && searchDetails) {
      //  && JSON.parse(currentUser).type === 'admin') {
      // logged in so return true
      return true;
    }
    // not logged in & book so redirect to login page with the return url


    this._router.navigate(['hotel/booking/search'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
