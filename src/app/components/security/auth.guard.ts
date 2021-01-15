import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SharedService} from '../../services/shared.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  shared: SharedService;

  constructor(private router: Router) {
    this.shared = SharedService.getInstance();
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.shared.isLogged()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
