import { createReducer, on } from '@ngrx/store';
import * as CreatePostActions from '../actions/createpost.actions';
import { Post } from '../models/posts.model';

export interface CreatePostState {
    createdPostData: Post | null;
    createPostLoading: boolean;
    error: any;
}

export const initialState: CreatePostState = {
    createdPostData: null,
    createPostLoading: false,
    error: null
};

export const createPostReducer = createReducer(
    initialState,
    on(CreatePostActions.createPost, state => ({
        ...state,
        createPostLoading: true,
        error: null
    })),
    on(CreatePostActions.createPostSuccess, (state, { createdPostData }) => ({
        ...state,
        createPostLoading: false,
        createdPostData: createdPostData
    })),
    on(CreatePostActions.createPostFailure, (state, { error }) => ({
        ...state,
        createPostLoading: false,
        error
    }))
);
