import { Component, inject, OnInit, signal } from '@angular/core';
import { Post, PostResponse } from '../../store/models/posts.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { Authors } from '../../store/models/authors.model';
import * as PostsActions from '../../store/actions/posts.actions';
import * as ArticleActions from '../../store/actions/articleDetail.actions';
@Component({
  selector: 'articledetail',
  imports: [],
  templateUrl: './articledetail.component.html',
  styleUrl: './articledetail.component.scss'
})
export class ArticledetailComponent implements OnInit {
  private store = inject<Store<AppState>>(Store);
  public id: string | null = null;
  public articalDetail = signal<Post | null>(null);
  public allData = signal<PostResponse | null>(null);
  private activatedRoute = inject(ActivatedRoute);
  private endPoint = 'http://localhost:3000/posts';
  constructor() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    if (this.id) {
      this.store.dispatch(ArticleActions.loadArticleDetail({ endPoint: this.endPoint + "/" + this.id }));
    }

    this.store.dispatch(PostsActions.loadPosts({ endPoint: this.endPoint }));
    this.store.select(state => state?.article?.articleData).subscribe(res => {
      if (res) {
        this.articalDetail.set(res)
      }
    });
    this.store.select(state => state?.posts?.data).subscribe(res => {
      if (res) {
        this.allData.set(res);
      }
    });


  }

}
