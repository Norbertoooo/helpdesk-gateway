import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SharedService} from '../../services/shared.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  shared: SharedService;

  constructor() {
    this.shared = SharedService.getInstance();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest: any;
    if (this.shared.isLogged()) {
      authRequest = req.clone({
        setHeaders: {
          Authorization: this.shared.token
        }
      });
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }

}
