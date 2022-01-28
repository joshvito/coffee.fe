import { createAction, union, props } from '@ngrx/store';
import { ICoffeeBean } from 'src/app/models/bean.model';
import { IPageResult } from 'src/app/models/common.model';

export const getMany = createAction('[BEANS] Get Beans');
export const getManySuccess = createAction('[BEANS] Get Beans', props<{page: IPageResult<ICoffeeBean>}>());
export const getManyFailure = createAction('[BEANS] Get Beans',  props<{errorMsg: string}>());

export const create = createAction('[BEANS] Create Bean');
export const createSuccess = createAction('[BEANS] Create Bean', props<{item: ICoffeeBean}>());
export const createFailure = createAction('[BEANS] Create Bean',  props<{errorMsg: string}>());

export const update = createAction('[BEANS] Update Bean');
export const updateSuccess = createAction('[BEANS] Update Bean', props<{item: ICoffeeBean}>());
export const updateFailure = createAction('[BEANS] Update Bean',  props<{errorMsg: string}>());

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
