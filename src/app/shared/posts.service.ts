import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FirebaseCreateResponse, Post} from './interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class PostsService {

	constructor(private http: HttpClient) {
	}

	create(post: Post): Observable<Post> {
		return this.http.post(`${environment.databaseUrl}/posts.json`, post)
			.pipe(map((response: FirebaseCreateResponse) => {
				return {
					...post, id: response.name, date: new Date(post.date)
				};
			}));
	}

}
