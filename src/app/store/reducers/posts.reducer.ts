import { createReducer, on } from '@ngrx/store';
import * as PostsActions from '../actions/posts.actions';
import { PostResponse } from '../models/posts.model';

export interface PostsState {
    data: PostResponse;
    loading: boolean;
    error: any;
}

export const initialState: PostsState = {
    data: {
        posts: [],
        total: 0,
        skip: 0,
        limit: 0
    },
    loading: false,
    error: null
};

export const postsReducer = createReducer(
    initialState,

    on(PostsActions.loadProperties, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(PostsActions.loadPropertiesSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        data
    })),

    on(PostsActions.loadPropertiesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))

    // Uncomment if you add markFavourite feature
    // on(PostsActions.markFavourite, (state, { id }) => ({
    //   ...state,
    //   data: {
    //     ...state.data,
    //     posts: state.data.posts.map(post =>
    //       post.id === id ? { ...post, isFavourite: true } : post
    //     )
    //   }
    // }))
);
