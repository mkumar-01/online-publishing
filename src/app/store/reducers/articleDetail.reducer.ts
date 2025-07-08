import { createReducer, on } from '@ngrx/store';
import * as ArticleActions from '../actions/articleDetail.actions';
import { Post } from '../models/posts.model';

export interface ArticleState {
    data: Post | null;
    loading: boolean;
    error: any;
}

export const initialState: ArticleState = {
    data: null,
    loading: false,
    error: null
};

export const articleReducer = createReducer(
    initialState,
    on(ArticleActions.loadArticleDetail, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ArticleActions.loadArticleDetailSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        data: data
    })),
    on(ArticleActions.loadArticleDetailFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
