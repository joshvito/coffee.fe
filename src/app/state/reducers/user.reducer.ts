import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/models/user.model';
import { UserActions } from '../actions';

export const key = 'user';

export interface State {
  current: IUser | null
};

const initialState: State = {
  current: null
}

export const reducer = createReducer(
    initialState,
    on(
        UserActions.getCurrentSuccess,
        (state, {user}) => ({...state, current: user})
    )
);
