import { Component, inject, OnInit, signal } from '@angular/core';
import { ViewportScroller } from '@angular/common'
import { Post, } from '../../store/models/posts.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import * as PostsActions from '../../store/actions/posts.actions';
import * as ArticleActions from '../../store/actions/articleDetail.actions';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'articledetail',
  imports: [CommonModule, RouterLink],
  templateUrl: './articledetail.component.html',
  styleUrl: './articledetail.component.scss'
})
export class ArticledetailComponent implements OnInit {
  private viewportScroller = inject(ViewportScroller);
  private store = inject<Store<AppState>>(Store);
  public id: string | null = null;
  public articalDetail = signal<Post | null>(null);
  public sameAuthorArticles = signal<Post[]>([]);
  public relatedByTags = signal<Post[]>([]);
  public posts = signal<Post[] | null>(null);
  private activatedRoute = inject(ActivatedRoute);
  private endPoint = 'http://localhost:3000/posts';
  constructor() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.store.dispatch(ArticleActions.loadArticleDetail({ endPoint: this.endPoint + "/" + this.id }));
      }

      this.store.dispatch(PostsActions.loadPosts({ endPoint: this.endPoint }));
      this.store.select(state => state?.article?.articleData).subscribe(res => {
        if (res) {
          this.articalDetail.set(res)

        }
      });
      this.viewportScroller.scrollToPosition([0, 0]); // Scroll to top
      this.store.select(state => state?.posts?.data).subscribe(res => {
        if (res) {
          // const postsArray = res as unknown as Post[];
          const postsArray = Array.isArray(res) ? res : [];
          this.posts.set(postsArray);
        }
        this.getAuthorArticles()
        this.getRelatedArticlesByTags();
      });
    })


  }
  getAuthorArticles() {
    const currentArticle = this.articalDetail();
    const articles = this.posts();
    if (!currentArticle || !articles) return;
    const relatedArticles = articles?.filter(item => {
      return item.authorName.toLowerCase() === currentArticle.authorName.toLowerCase() &&
        item.id !== currentArticle.id;
    })
    this.sameAuthorArticles.set(relatedArticles);

  }
  getRelatedArticlesByTags() {
    const currentArticle = this.articalDetail();
    const articles = this.posts();

    if (!currentArticle || !articles || !Array.isArray(articles)) return;

    const currentTags = Array.isArray(currentArticle.tags)
      ? currentArticle.tags.map(tag => tag.toLowerCase())
      : [];

    const related = articles.filter(post => {
      if (post.id === currentArticle.id) return false;
      if (!Array.isArray(post.tags)) return false;
      return post.tags.some(tag => currentTags.includes(tag.toLowerCase()));
    });
    this.relatedByTags.set(related);
  }




}
