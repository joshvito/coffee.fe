import { createAction, union, props } from '@ngrx/store';
import { ICoffeeBean, ICreateBean } from 'src/app/models/bean.model';
import { IPageResult, IPageRequest } from 'src/app/models/common.model';

export const getMany = createAction('[BEANS] Get Beans', props<IPageRequest>());
export const getManySuccess = createAction('[BEANS] Get Beans Success', props<{page: IPageResult<ICoffeeBean>}>());
export const getManyFailure = createAction('[BEANS] Get Beans Fail',  props<{errorMsg: string}>());

export const create = createAction('[BEANS] Create Bean', props<{query: ICreateBean}>());
export const createSuccess = createAction('[BEANS] Create Bean Success', props<{item: ICoffeeBean}>());
export const createFailure = createAction('[BEANS] Create Bean Fail',  props<{errorMsg: string}>());

export const update = createAction('[BEANS] Update Bean');
export const updateSuccess = createAction('[BEANS] Update Bean Success', props<{item: ICoffeeBean}>());
export const updateFailure = createAction('[BEANS] Update Bean Fail',  props<{errorMsg: string}>());

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
