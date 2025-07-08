import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from '../../services/http.service';
import * as PostsActions from '../actions/posts.actions';
import * as ArticleActions from '../actions/articleDetail.actions';
import { Post, PostResponse } from '../models/posts.model';

@Injectable()
export class ArticleDetailEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpService);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ArticleActions.loadArticleDetail),
            mergeMap(({ endPoint }) =>
                this.http.get<Post>(endPoint).pipe(
                    map((response: Post) => {
                        return ArticleActions.loadArticleDetailSuccess({ data: response })
                    }

                    ),
                    catchError(error =>
                        of(ArticleActions.loadArticleDetailFailure({ error }))
                    )
                )
            )
        )
    );
}
