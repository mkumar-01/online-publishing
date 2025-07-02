import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from '../../services/http.service';
import * as PostsActions from '../actions/posts.actions';
import { PostResponse } from '../models/posts.model';

@Injectable()
export class PostsEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpService);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsActions.loadPosts),
            mergeMap(({ endPoint }) =>
                this.http.get<PostResponse>(endPoint).pipe(
                    map((response: PostResponse) =>
                        PostsActions.loadPostsSuccess({ data: response })
                    ),
                    catchError(error =>
                        of(PostsActions.loadPostsFailure({ error }))
                    )
                )
            )
        )
    );
}
