// store/reducers/index.ts

import { ActionReducerMap } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { postsReducer, PostsState } from './posts.reducer';
import { authorsReducer, AuthorsState } from './authors.reducer';

export interface AppState {
    counter: number,
    posts: PostsState,
    authors: AuthorsState,
}

export const reducers: ActionReducerMap<AppState> = {
    counter: counterReducer,
    posts: postsReducer,
    authors: authorsReducer,
};
