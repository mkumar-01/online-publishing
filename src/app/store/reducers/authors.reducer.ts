import { createReducer, on } from '@ngrx/store';
import * as AuthorsActions from '../actions/authors.actions';
import { Authors } from '../models/authors.model';

export interface AuthorsState {
    data: Authors[];
    loading: boolean;
    error: any;
}

export const initialState: AuthorsState = {
    data: [],
    loading: false,
    error: null
};

export const authorsReducer = createReducer(
    initialState,
    on(AuthorsActions.loadAuthors, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthorsActions.loadAuthorsSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        data: data
    })),
    on(AuthorsActions.loadAuthorsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
