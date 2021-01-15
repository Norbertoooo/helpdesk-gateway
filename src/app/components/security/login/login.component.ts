import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {SharedService} from '../../../services/shared.service';
import {UserModel} from '../../../model/user.model';
import {Router} from '@angular/router';
import {CurrentUserModel} from '../../../model/current-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new UserModel();
  token: string;
  message: string;
  sharedService: SharedService;

  constructor(private userService: UserService, private router: Router) {
    this.sharedService = SharedService.getInstance();
  }

  ngOnInit(): void {
  }

  logar(): any {
    this.userService.login(this.user).subscribe((resposta: CurrentUserModel) => {
      this.token = resposta.token;
      this.user = resposta.user;
      this.user.profile = resposta.user.profile.substring(5);
      this.sharedService.showTemplate.emit(true);
      this.router.navigate(['']);
    }, error => {
      this.sharedService.token = null;
      this.sharedService.user = null;
      this.sharedService.showTemplate.emit(false);
      this.message = 'error';
    });
  }

  cancelLogin(): void {
    this.message = '';
    this.user = new UserModel();
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

}
