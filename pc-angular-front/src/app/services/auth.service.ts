import { Injectable } from '@angular/core';
import { Feathers } from './feathers.service';
import { Router } from '@angular/router';


/**
 * Abstraction layer for auth. Nice to have when things get more complicated.
 */
@Injectable()
export class AuthService {

  cred : any;
        
  constructor(private feathers: Feathers, private router: Router) {}

  public logIn(credentials?): Promise<any> {
          this.cred = credentials;
          return this.feathers.authenticate(credentials);
  }

  public getCredentials(): any {
          return this.cred;
  }

  public logOut() {
    this.feathers.logout();
    this.router.navigate(['/']);
  };

}
