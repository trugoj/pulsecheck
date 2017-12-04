import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  votes$: Observable<any[]>;

        constructor(private data: DataService, private auth: AuthService ) {
                this.votes$ = data.vote$(); 
        }

  ngOnInit() {
  }

}
