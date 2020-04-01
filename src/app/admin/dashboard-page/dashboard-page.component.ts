import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

	constructor(
		private postsService: PostsService,
		private alertService: AlertService) {
	}

	posts: Post[] = [];
	postSubscription: Subscription;
	deleteSubscription: Subscription;
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
		if (this.deleteSubscription) {
			this.deleteSubscription.unsubscribe();
		}
	}

	remove(id: string) {
		this.deleteSubscription = this.postsService.remove(id).subscribe(() => {
			this.posts = this.posts.filter(post => post.id !== id);
			this.alertService.danger('Пост успешно удалён');
		});
	}
}
