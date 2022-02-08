import { createAction, union, props } from '@ngrx/store';
import { IBrewRatings, ICreateBrewRating, IFilterBrewRatings } from 'src/app/models/brew-ratings.model';
import { IPageResult } from 'src/app/models/common.model';

export const getMany = createAction('[BREW RATINGS] Get Many', props<{filters?: Partial<IFilterBrewRatings>}>());
export const getManySuccess = createAction('[BREW RATINGS] Get Many Success', props<{page: IPageResult<IBrewRatings>}>());
export const getManyFailure = createAction('[BREW RATINGS] Get Many Fail',  props<{errorMsg: string}>());

export const create = createAction('[BREW RATINGS] Create', props<{rating: ICreateBrewRating}>());
export const createSuccess = createAction('[BREW RATINGS] Create Success', props<{item: IBrewRatings}>());
export const createFailure = createAction('[BREW RATINGS] Create Fail',  props<{errorMsg: string}>());

export const update = createAction('[BREW RATINGS] Update');
export const updateSuccess = createAction('[BREW RATINGS] Update Success', props<{item: IBrewRatings}>());
export const updateFailure = createAction('[BREW RATINGS] Update Fail',  props<{errorMsg: string}>());

export const storeFilters = createAction('[BREW RATINGS] Store Filters', props<{filters: IFilterBrewRatings}>());

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
    storeFilters
});

export type ActionsUnion = typeof all;
