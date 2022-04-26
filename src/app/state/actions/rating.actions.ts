import { createAction, union, props } from '@ngrx/store';
import { ICreateRating, IRating } from 'src/app/models/rating.model';

export const create = createAction('[RATING] Create', props<{item: ICreateRating}>());
export const createSuccess = createAction('[RATING] Create Success', props<{item: IRating}>());
export const createFailure = createAction('[RATING] Create Fail',  props<{errorMsg: string}>());

export const update = createAction('[RATING] Update', props<{item: IRating}>());
export const updateSuccess = createAction('[RATING] Update Success', props<{item: IRating}>());
export const updateFailure = createAction('[RATING] Update Fail',  props<{errorMsg: string}>());

export const deleteRating = createAction('[RATING] Delete', props<{id: number}>());
export const deleteRatingSuccess = createAction('[RATING] Delete Success', props<{item: IRating}>());
export const deleteRatingFailure = createAction('[RATING] Delete Fail',  props<{errorMsg: string}>());

export const selectOne = createAction('[RATING] Select', props<{id: number}>());

const all = union({
    create,
    createSuccess,
    createFailure,
    update,
    updateSuccess,
    updateFailure,
    deleteRating,
    deleteRatingSuccess,
    deleteRatingFailure,
    selectOne,
});

export type ActionsUnion = typeof all;
