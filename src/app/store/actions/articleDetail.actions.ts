import { createAction, props } from '@ngrx/store';
import { PostResponse, Post } from '../models/posts.model';

export const loadArticleDetail = createAction(
    '[Post] Load Article',
    props<{ endPoint: string }>()
);

export const loadArticleDetailSuccess = createAction(
    '[Post] Load Success',
    props<{ articleData: Post }>()
);

export const loadArticleDetailFailure = createAction(
    '[Post] Load Failure',
    props<{ error: any }>()
);

