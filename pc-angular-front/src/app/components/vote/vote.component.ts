import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
//import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})

export class VoteComponent {

        list : Array<{id: number, description: string}>;
        sat_list : Array<{id: number, description: string}>;
        dist_list : Array<{id: number, description: string}>;
        satisfactionEntry : any;
        bossEntry : any;
        distEntry : any;
        di : any;

        constructor(private data: DataService) {
                console.log("vote initialized");
                this.list = [];
                for(var i=1;i<=10;i++) {
                        this.list.push( { id: i, description: String(i) } );
                }
                this.sat_list = [ { id: 1, description: 'Yes' }, { id: 0, description: 'No' } ];
                this.dist_list = [ { id: 1, description: 'Yes' }, { id: 0, description: 'No' } ];
                
                this.satisfactionEntry = { description: "undefined" };
                this.bossEntry = { description: "unknown" };
                this.distEntry = { description: "unknown" };
        }
        
        ngOnInit() { } 

        onSelectionChangeSat(entry) {
                this.satisfactionEntry = entry;
        }
        
        onSelectionChangeBoss(entry) {
                this.bossEntry = entry;
        }

        onSelectionChangeDist(entry) {
                this.distEntry = entry;
        }

        submit() {
                this.di = { satisfaction: this.satisfactionEntry.id, bossCares: this.bossEntry.id, distracted: this.distEntry.id };
                console.log("submit");
                console.log(this.di);
                this.data.vote(this.di);
        }
}
