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
  private endPoint = 'https://dummyjson.com/posts';
  public allData = signal<PostResponse | null>(null);
  public posts = signal<Post[] | null>(null);

  ngOnInit(): void {
    this.store.dispatch(PostsActions.loadProperties({ endPoint: this.endPoint }));

    this.store.select(state => state.posts.data).subscribe(res => {
      if (res?.posts?.length) {
        this.allData.set(res);

        this.posts.set(res.posts)
      }
      console.log('Loaded data:', this.posts());
    });
  }

}
