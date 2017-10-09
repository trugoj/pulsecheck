import { Component, OnInit, OnDestroy } from '@angular/core';
import { PulseService } from '../pulse-service.service';
import { Pulse } from '../pulse';
import { Subscription} from 'rxjs/Subscription';

@Component({
        selector: 'pc-one-pulse',
        providers: [PulseService],
        templateUrl: './one-pulse.component.html'
})

export class OnePulseComponent implements OnInit, OnDestroy {

        private pulses: Pulse[] = [];

        constructor(  
                private pulseService: PulseService,
                private subscription: Subscription;
        ) {
        }
        
        public ngOnInit(): void {
                this.subscription = this.pulseService.pulse$.subscribe((pulses: Pulse[]) => {
                        this.pulses = pulses;
                });
                this.pulseService.find();
        }

        public ngOnDestroy() {
                this.subscription.unsubscribe();
        }
}

