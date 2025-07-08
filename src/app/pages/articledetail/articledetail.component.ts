import { Component, inject, OnInit, signal } from '@angular/core';
import { Post } from '../../store/models/posts.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { Authors } from '../../store/models/authors.model';
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
  public articalDetail = signal<Post | undefined>(undefined);
  private activatedRoute = inject(ActivatedRoute);
  private endPoint = 'http://localhost:3000/posts';
  constructor() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    console.log(typeof this.id)
    this.store.dispatch(ArticleActions.loadArticleDetail({ endPoint: this.endPoint + "/" + this.id }));
    this.store.select(state => state.article.data).subscribe(res => {
      if (res) {
        this.articalDetail.set(res)
      }
    });
  }

}
