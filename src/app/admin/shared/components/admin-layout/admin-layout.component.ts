import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-admin-loyout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

	constructor(private router: Router) {
	}

	ngOnInit(): void {
	}

	logout(event: Event) {
		event.preventDefault(); // отменяет поведение ссылки по умолчанию
		this.router.navigate(['/admin', 'login']);
	}
}
