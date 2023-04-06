import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthserviceService } from "./services/authservice.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard {
  constructor(
    private apiservice: AuthserviceService,
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
