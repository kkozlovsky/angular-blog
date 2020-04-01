import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FirebaseAuthResponse, User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

	constructor(private http: HttpClient) {
	}

	public error$: Subject<string> = new Subject<string>();

	login(user: User): Observable<any> {
		user.returnSecureToken = true;
		return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(
				tap(this.setToken),
				catchError(this.handleError.bind(this)) // чтобы не было потери контекста
			);
	}

	logout() {
		this.setToken(null);
	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	private handleError(error: HttpErrorResponse) {
		console.log(error);
		const {message} = error.error.error;
		console.log(message);
		switch (message) {
			case 'INVALID_EMAIL':
				this.error$.next('Неверный email');
				break;
			case 'INVALID_PASSWORD':
				this.error$.next('Неверный пароль');
				break;
			case 'EMAIL_NOT_FOUND':
				this.error$.next('Email не зарегистрирован');
				break;
		}

		return throwError(error);
	}

	get token(): string {
		const expDate = new Date(localStorage.getItem('fb-token-exp'));
		if (new Date() > expDate) {
			this.logout();
			return null;
		}
		return localStorage.getItem('fb-token');
	}

	private setToken(response: FirebaseAuthResponse | null) {
		if (response) {
			const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
			localStorage.setItem('fb-token', response.idToken);
			localStorage.setItem('fb-token-exp', expDate.toString());
		} else {
			localStorage.clear();
		}

	}

}
