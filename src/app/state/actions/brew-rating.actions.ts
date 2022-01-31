import { createAction, union, props } from '@ngrx/store';
import { IBrewRatings } from 'src/app/models/brew-ratings.model';
import { IPageResult } from 'src/app/models/common.model';

export const getMany = createAction('[BREW RATINGS] Get Beans');
export const getManySuccess = createAction('[BREW RATINGS] Get Beans Success', props<{page: IPageResult<IBrewRatings>}>());
export const getManyFailure = createAction('[BREW RATINGS] Get Beans Fail',  props<{errorMsg: string}>());

export const create = createAction('[BREW RATINGS] Create Bean');
export const createSuccess = createAction('[BREW RATINGS] Create Bean Success', props<{item: IBrewRatings}>());
export const createFailure = createAction('[BREW RATINGS] Create Bean Fail',  props<{errorMsg: string}>());

export const update = createAction('[BREW RATINGS] Update Bean');
export const updateSuccess = createAction('[BREW RATINGS] Update Bean Success', props<{item: IBrewRatings}>());
export const updateFailure = createAction('[BREW RATINGS] Update Bean Fail',  props<{errorMsg: string}>());

const all = union({
    getMany,
    getManySuccess,
    getManyFailure,
    create,
    createSuccess,
    createFailure,
    update,
    updateSuccess,
    updateFailure,
});

export type ActionsUnion = typeof all;
