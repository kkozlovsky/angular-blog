import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-admin-loyout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

	constructor(private router: Router,
	            public auth: AuthService) {
	}

	ngOnInit(): void {
	}

	logout(event: Event) {
		event.preventDefault(); // отменяет поведение ссылки по умолчанию
		this.auth.logout();
		this.router.navigate(['/admin', 'login']);
	}
}
