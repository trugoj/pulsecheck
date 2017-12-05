import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'app-overview',
        templateUrl: './overview.component.html',
        styleUrls: ['./c3.min.css', './overview.component.css']
})

export class OverviewComponent implements OnInit {
        votes$: Observable<any[]>;
        serviceData: any;
        time: any[];

        private chart: any;
        
        constructor(private data: DataService, private auth: AuthService ) {
                this.votes$ = data.vote$()
                        .map(v => v.data)
                console.log(this.votes$);
        }
        // e.data.vote.satisfaction 
        ngOnInit() {
                console.log("oninit");
                this.votes$.subscribe( arg => {
                        console.log(arg); 
                        var tim = arg.map( v => v.createdAt );
                        console.log(tim);
                        var dat = arg.map( v => v.data.vote.satisfaction );
                        //console.log(dat);
                        var d2 = ['Satisfaction Level'].concat(dat);
                        this.time = [];
                        this.time.push('x');
                        this.time = this.time.concat(tim);
                        console.log(tim, dat);

                        console.log(this.time, d2);
                        this.chart = c3.generate({
                                bindto: '#chart',
                                data: { x: 'x',
                                        xFormat: null,
                                        columns: [
                                                this.time,
                                                d2
                                        ]},
                                axis: { x: { type: 'timeseries',
                                                tick: {
                                                        format: '%Y-%m-%d'
                                                }
                                }
                                }
                        }
                        );
                        
                        })
        }
        
        helpme(obj:any) {
                console.log(obj);
        }
}
