import { createReducer, on } from '@ngrx/store';
import * as ArticleActions from '../actions/articleDetail.actions';
import { Post } from '../models/posts.model';

export interface ArticleState {
    articleData: Post | null;
    articleLoading: boolean;
    error: any;
}

export const initialState: ArticleState = {
    articleData: null,
    articleLoading: false,
    error: null
};

export const articleReducer = createReducer(
    initialState,
    on(ArticleActions.loadArticleDetail, state => ({
        ...state,
        articleLoading: true,
        error: null
    })),
    on(ArticleActions.loadArticleDetailSuccess, (state, { articleData }) => ({
        ...state,
        articleLoading: false,
        articleData: articleData
    })),
    on(ArticleActions.loadArticleDetailFailure, (state, { error }) => ({
        ...state,
        articleLoading: false,
        error
    }))
);
