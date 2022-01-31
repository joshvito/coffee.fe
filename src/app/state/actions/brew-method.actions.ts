import { createAction, union, props } from '@ngrx/store';
import { IBrewMethod } from 'src/app/models/brew-method.model';
import { IPageResult } from 'src/app/models/common.model';

export const getMany = createAction('[BREW METHOD] Get Beans');
export const getManySuccess = createAction('[BREW METHOD] Get Beans Success', props<{page: IPageResult<IBrewMethod>}>());
export const getManyFailure = createAction('[BREW METHOD] Get Beans Fail',  props<{errorMsg: string}>());

export const create = createAction('[BREW METHOD] Create Bean');
export const createSuccess = createAction('[BREW METHOD] Create Bean Success', props<{item: IBrewMethod}>());
export const createFailure = createAction('[BREW METHOD] Create Bean Fail',  props<{errorMsg: string}>());

export const update = createAction('[BREW METHOD] Update Bean');
export const updateSuccess = createAction('[BREW METHOD] Update Bean Success', props<{item: IBrewMethod}>());
export const updateFailure = createAction('[BREW METHOD] Update Bean Fail',  props<{errorMsg: string}>());

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
