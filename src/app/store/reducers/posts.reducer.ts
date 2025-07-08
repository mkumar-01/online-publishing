import { createReducer, on } from '@ngrx/store';
import * as PostsActions from '../actions/posts.actions';
import { Post, PostResponse } from '../models/posts.model';

export interface PostsState {
    data: PostResponse | null;
    loading: boolean;
    error: any;
}

export const initialState: PostsState = {
    data: null,
    loading: false,
    error: null
};

export const postsReducer = createReducer(
    initialState,
    on(PostsActions.loadPosts, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(PostsActions.loadPostsSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        data: data
    })),
    on(PostsActions.loadPostsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
