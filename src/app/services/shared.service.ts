import {EventEmitter, Injectable} from '@angular/core';
import {UserModel} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public static instance: SharedService = null;
  user: UserModel;
  token: string;
  showTemplate = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance(): SharedService {
    if (this.instance == null) {
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLogged(): boolean {
    if (this.user == null) {
      return false;
    }
    return this.user.email !== '';
  }

}
