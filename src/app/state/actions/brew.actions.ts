import { createAction, union, props } from '@ngrx/store';
import { IBrew, ICreateBrew, IFilterBrew } from 'src/app/models/brew.model';
import { IPageResult } from 'src/app/models/common.model';

export const getMany = createAction('[BREW] Get Many', props<{filters?: Partial<IFilterBrew>}>());
export const getManySuccess = createAction('[BREW] Get Many Success', props<{page: IPageResult<IBrew>}>());
export const getManyFailure = createAction('[BREW] Get Many Fail',  props<{errorMsg: string}>());

export const create = createAction('[BREW] Create', props<{brew: ICreateBrew}>());
export const createSuccess = createAction('[BREW] Create Success', props<{item: IBrew}>());
export const createFailure = createAction('[BREW] Create Fail',  props<{errorMsg: string}>());

export const update = createAction('[BREW] Update', props<{item: IBrew}>());
export const updateSuccess = createAction('[BREW] Update Success', props<{item: IBrew}>());
export const updateFailure = createAction('[BREW] Update Fail',  props<{errorMsg: string}>());

export const storeFilters = createAction('[BREW] Store Filters', props<{filters: Partial<IFilterBrew>}>());

export const deleteRating = createAction('[BREW] Delete', props<{id: number}>());
export const deleteRatingSuccess = createAction('[BREW] Delete Success', props<{item: IBrew}>());
export const deleteRatingFailure = createAction('[BREW] Delete Fail',  props<{errorMsg: string}>());

export const selectOne = createAction('[BREW] Select', props<{id: number}>());

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
    storeFilters,
    deleteRating,
    deleteRatingSuccess,
    deleteRatingFailure,
    selectOne,
});

export type ActionsUnion = typeof all;
