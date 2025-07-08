import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from '../../services/http.service';
import * as AuthorsActions from '../actions/authors.actions';
import { Authors } from '../models/authors.model';

@Injectable()
export class AuthorsEffects {
    private actions$ = inject(Actions);
    private http = inject(HttpService);

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthorsActions.loadAuthors),
            mergeMap(({ endPoint }) =>
                this.http.get<Authors[]>(endPoint).pipe(
                    map((response: Authors[]) => {
                        return AuthorsActions.loadAuthorsSuccess({ data: response })
                    }

                    ),
                    catchError(error =>
                        of(AuthorsActions.loadAuthorsFailure({ error }))
                    )
                )
            )
        )
    );
}
