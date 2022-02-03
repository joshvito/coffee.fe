import { createAction, union, props } from '@ngrx/store';
import { IUser } from 'src/app/models/user.model';

export const getCurrent = createAction('[USERS] Get Current');
export const getCurrentSuccess = createAction('[USERS] Get Current Success', props<{user: IUser}>());
export const getCurrentFailure = createAction('[USERS] Get Current Fail',  props<{errorMsg: string}>());

const all = union({
  getCurrent,
  getCurrentSuccess,
  getCurrentFailure
});

export type ActionsUnion = typeof all;
