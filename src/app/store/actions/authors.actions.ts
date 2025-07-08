import { createAction, props } from '@ngrx/store';
import { Authors } from '../models/authors.model';

export const loadAuthors = createAction(
    '[Authors] Load Authors',
    props<{ endPoint: string }>()
);

export const loadAuthorsSuccess = createAction(
    '[Authors] Load Success',
    props<{ data: Authors[] }>()
);

export const loadAuthorsFailure = createAction(
    '[Authors] Load Failure',
    props<{ error: any }>()
);

