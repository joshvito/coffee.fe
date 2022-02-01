import { createReducer, on } from '@ngrx/store';
import { LayoutView } from 'src/app/models/layout.model';
import { LayoutActions } from '../actions';

export const key = 'layout';

export interface State {
    currentView: LayoutView
};

const initialState: State = {
  currentView: LayoutView.Ratings,
};

export const reducer = createReducer(
    initialState,
    on(
        LayoutActions.change,
        (state, {view}) => ({...state, currentView: view }),
    ),
);

export const getCurrentView = (s:State) => s.currentView;
