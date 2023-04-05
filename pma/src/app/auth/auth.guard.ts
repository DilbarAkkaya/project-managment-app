import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ApiserviceService } from "./apiservice.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard {
  constructor(
    private apiservice: ApiserviceService,
    private router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.apiservice.isAuthenticated()) {
      return true
    } else {
      this.apiservice.logout()
      return this.router.createUrlTree(['/auth/login'], {
        queryParams: {
          isLogin: true
        }
      })
    }
  }
}
