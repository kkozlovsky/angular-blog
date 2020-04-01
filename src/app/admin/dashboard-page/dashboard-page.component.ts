import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

	constructor(private postsService: PostsService) {
	}

	posts: Post[] = [];
	postSubscription: Subscription;
	searchTitle = '';

	ngOnInit(): void {
		this.postSubscription = this.postsService.getAll().subscribe(posts => {
			this.posts = posts;
		});
	}

	ngOnDestroy(): void {
		if (this.postSubscription) {
			this.postSubscription.unsubscribe();
		}
	}

	remove(id: string) {

	}
}
