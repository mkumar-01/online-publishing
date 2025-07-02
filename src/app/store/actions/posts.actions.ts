import { createAction, props } from '@ngrx/store';
import { PostResponse } from '../models/posts.model';

export const loadProperties = createAction(
    '[Property] Load Properties',
    props<{ endPoint: string }>()
);

export const loadPropertiesSuccess = createAction(
    '[Post] Load Success',
    props<{ data: PostResponse }>()
);

export const loadPropertiesFailure = createAction(
    '[Post] Load Failure',
    props<{ error: any }>()
);

// Uncomment if needed later
// export const markFavourite = createAction(
//   '[Post] Mark Favourite',
//   props<{ id: number }>()
// );
