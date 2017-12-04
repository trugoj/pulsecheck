import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Feathers } from '../../services/feathers.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  messages: string[] = [];
  myip$: Observable<any>;

  constructor(private feathers: Feathers, private router: Router, private data: DataService) {
    this.myip$ = data.getmyip$();
    console.log("myip: ", this.myip$);
    this.myip$.subscribe(
            uid => {
                    console.log("uid: ", uid)
    
               var password = 'secret';
               var email = uid[0].hostname;

                    console.log({email, password});
             // try to authenticate with feathers
            this.feathers.authenticate({
              strategy: 'local',
              email: email,
              password: password
            })
              // navigate to base URL on success
              .then(() => {
                this.router.navigate(['/']);
              })
              .catch(err => {
      
                    this.feathers.service('users')
               .create({email, password})
                              .then(() => {
                                      this.messages.push('User created.');
                                      this.feathers.authenticate({
                                              strategy: 'local',
                                              email: email,
                                              password: password
                                            })
                                      // navigate to base URL on success
                                      .then(() => {
                                              this.router.navigate(['/']);
                                      })
                              }
                              )
               .catch(err => this.messages.push('Could not create user!'))
                    ;

                this.messages.unshift('Wrong credentials!');
               });
            }
  )};
}
