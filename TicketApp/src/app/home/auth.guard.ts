import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cservice:CommonService, private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("AuthGuard");
      if(localStorage.getItem('app-accessToken') != undefined && localStorage.getItem('app-accessToken') != null){
        this.cservice.accessToken = localStorage.getItem('app-accessToken');
        return true;
      }
      else {
        this.router.navigate(["/login"]);
        return false;
      }
  }
  
}
