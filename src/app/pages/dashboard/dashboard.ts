import { Component, inject, OnInit, signal } from '@angular/core';
import { AppState } from '../../store/reducers';
import * as PostsActions from '../../store/actions/posts.actions';
import { Post, PostResponse } from '../../store/models/posts.model';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../../components/paginate/paginate.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, PaginateComponent, SearchComponent, RouterLink],
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
  public totalPost = signal<number>(0);
  public page = signal<number>(1);
  public pagePage = signal<number>(10);
  public activatedRoute = inject(ActivatedRoute);
  public currentPage = signal<number | null>(null);


  ngOnInit(): void {
    const finalEndPonit = `${this.endPoint}?_page=${this.page()}&_per_page=${this.pagePage()}`;
    this.store.dispatch(PostsActions.loadPosts({ endPoint: finalEndPonit }));

    this.store.select(state => state.posts.data).subscribe(res => {
      if (res) {
        this.allData.set(res);
        this.posts.set(res.data)
      }
      if (this.allData()?.items) {
        const totalItem = this.allData()?.items as number;
        this.totalPost.set(totalItem)
      }
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
  }

  onPageChange(newPage: number) {
    this.page.set(newPage);
    const finalEndPoint = `${this.endPoint}?_page=${newPage}&_per_page=${this.pagePage()}`;
    this.store.dispatch(PostsActions.loadPosts({ endPoint: finalEndPoint }));
  }

  search(val: string) {
    const value = val.trim().toLowerCase();
    const articles = this.allData()?.data;
    if (value !== "" && articles !== undefined) {
      const searchResult: Post[] = articles.filter(post =>
        post.title.toLowerCase().includes(value) ||
        post.body.toLowerCase().includes(value) ||
        post.authorName.toLowerCase().includes(value) ||
        post.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
      )
      this.posts.set(searchResult)
    } else {

      this.posts.set(articles ? articles : [])
    }
  }

  sort(element: Event) {
    const val = element.target as HTMLInputElement;
    let sortTerm = val.value.trim().toLowerCase();
    this.sortResult(sortTerm)
  }
  sortResult(sortTerm: string) {
    const posts = [...(this.posts() || [])]; // clone the array safely
    switch (sortTerm) {
      case 'latest':
        posts.sort((a, b) => {
          const dateA = new Date(a.publishedDate).getTime(); //converting string date into javascript object
          const dateB = new Date(b.publishedDate).getTime();
          return dateB - dateA; // newest first
        });
        this.posts.set(posts);
        break;
      case 'most popular':
        posts.sort((a, b) => b.reactions.likes - a.reactions.likes);
        this.posts.set(posts);
        break;
      default:
        this.posts.set(this.allData()?.data ?? []);
    }
  }


}
