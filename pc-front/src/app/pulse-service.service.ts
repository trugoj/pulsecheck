import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as io from 'socket.io-client';
import * as feathers from 'feathers-client';

import { APIService } from '../api.service';
import { Pulse } from './pulse';

@Injectable()
export class PulseServiceService extends APIService {

        public pulses$: Observable< Pulse[] >;
        private feathersService: any;
        private dataStore: {
                pulses: Pulse[]
        };
                
        constructor() { 
                super();

                const feathersApp = feathers().configure();
                this.feathersService = feathersApp.service('pulse');

                this.dataStore = { pulses: [] };
                
                if (this.dataStore.pulses != null && this.dataStore.pulses !== undefined) {
                        return Observable.create(observer => {
                                observer.next(this.dataStore.pulses);
                                observer.complete();
                        });
                }
        }

        public find() {
                this.feathersService.find((err, pulses: Pulse[]) => {
                        if (err) return console.error(err);

                        this.dataStore.pulses = pulses;
                        if (this.dataStore.pulses != null && this.dataStore.pulses !== undefined) {
                                return Observable.create(observer => {
                                        observer.next(this.dataStore.pulses);
                                        observer.complete();
                                });
                        }
                 }
        }


}
