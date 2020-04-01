import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Alert, AlertService} from '../../services/alert.service';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

	constructor(private alertService: AlertService) {
	}

	@Input() delay = 5000;
	public text: string;
	public type = 'success';
	alertSubscription: Subscription;

	ngOnInit(): void {
		this.alertSubscription = this.alertService.alert$.subscribe((alert: Alert) => {
			this.text = alert.text;
			this.type = alert.type;

			const timeout = setTimeout(() => {
				clearTimeout(timeout);
				this.text = '';
			}, this.delay);
		});
	}

	ngOnDestroy(): void {
		if (this.alertSubscription) {
			this.alertSubscription.unsubscribe();
		}
	}
}
