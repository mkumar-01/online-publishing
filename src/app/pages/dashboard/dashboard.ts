import { Component, inject, OnInit, signal } from '@angular/core';
import { AppState } from '../../store/reducers';
import * as PostsActions from '../../store/actions/posts.actions';
import { Post, PostResponse } from '../../store/models/posts.model';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private store = inject<Store<AppState>>(Store);
  // private endPoint = 'https://dummyjson.com/posts';
  private endPoint = 'http://localhost:3000/posts';
  public allData = signal<PostResponse | null>(null);
  public posts = signal<Post[] | null>(null);
  public mostPopular = signal<Post | null>(null);

  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadPosts({ endPoint: this.endPoint }));

    this.store.select(state => state.posts).subscribe(res => {
      if (res) {
        this.allData.set(res);

        this.posts.set(res.data)
      }
      console.log('Loaded data:', this.posts());
      this.findMostPopular()
    });

  }
  findMostPopular() {
    const posts = this.posts();
    if (!posts || posts.length === 0) return;

    const mostPopular = posts.reduce((max, post) =>
      post.reactions.likes > max.reactions.likes ? post : max
    );

    this.mostPopular.set(mostPopular);
    console.log("most popular", this.mostPopular())
  }


}
