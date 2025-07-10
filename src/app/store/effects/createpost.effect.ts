import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CreatePostActions from '../actions/createpost.actions';
import { Post } from '../models/posts.model';

@Injectable()
export class CreatePostEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpService);

    createPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreatePostActions.createPost),
            mergeMap(({ endPoint, post }) =>
                this.http.post<Post>(endPoint, post).pipe(
                    map((createdPostData) => {
                        console.log(createdPostData)
                        return CreatePostActions.createPostSuccess({ createdPostData })
                    }

                    ),
                    catchError((error) =>
                        of(CreatePostActions.createPostFailure({ error }))
                    )
                )
            )
        )
    );
}
