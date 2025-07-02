import { createAction, props } from '@ngrx/store';
import { PostResponse } from '../models/posts.model';

export const loadPosts = createAction(
    '[Post] Load Properties',
    props<{ endPoint: string }>()
);

export const loadPostsSuccess = createAction(
    '[Post] Load Success',
    props<{ data: PostResponse }>()
);

export const loadPostsFailure = createAction(
    '[Post] Load Failure',
    props<{ error: any }>()
);

