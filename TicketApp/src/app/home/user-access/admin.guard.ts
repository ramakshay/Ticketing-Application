import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../../common.service';
import { ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private cservice:CommonService,
    private router:Router,
    private route:ActivatedRoute
    ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Admin Route",this.route)
      if(this.cservice.getCurrentUserRole()=="admin"){
      return true;
    }
    this.router.navigate(['/home/no-access'],{relativeTo:this.route});
    return false;

  }
  
}
