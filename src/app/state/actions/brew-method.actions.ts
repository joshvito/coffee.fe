import { createAction, union, props } from '@ngrx/store';
import { IBrewMethod, ICreateBrewMethod } from 'src/app/models/brew-method.model';
import { IPageResult } from 'src/app/models/common.model';

export const getMany = createAction('[BREW METHOD] Get Many');
export const getManySuccess = createAction('[BREW METHOD] Get Many Success', props<{page: IPageResult<IBrewMethod>}>());
export const getManyFailure = createAction('[BREW METHOD] Get Many Fail',  props<{errorMsg: string}>());

export const create = createAction('[BREW METHOD] Create', props<{query: ICreateBrewMethod}>());
export const createSuccess = createAction('[BREW METHOD] Create Success', props<{item: IBrewMethod}>());
export const createFailure = createAction('[BREW METHOD] Create Fail',  props<{errorMsg: string}>());

export const update = createAction('[BREW METHOD] Update');
export const updateSuccess = createAction('[BREW METHOD] Update Success', props<{item: IBrewMethod}>());
export const updateFailure = createAction('[BREW METHOD] Update Fail',  props<{errorMsg: string}>());

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
