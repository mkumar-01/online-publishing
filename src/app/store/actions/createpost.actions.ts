import { createAction, props } from '@ngrx/store';
import { PostResponse, Post } from '../models/posts.model';

export const createPost = createAction(
    '[Post] Crate Post',
    props<{ endPoint: string; post: Post }>()
);

export const createPostSuccess = createAction(
    '[Post] Post Created Success',
    props<{ createdPostData: Post }>()
);

export const createPostFailure = createAction(
    '[Post] Load Failure',
    props<{ error: any }>()
);

