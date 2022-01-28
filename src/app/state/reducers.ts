import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromLayout from './reducers/layout.reducer';

export interface State {
    [fromLayout.key]: fromLayout.State;
}
  
export const reducers: ActionReducerMap<State> = {
    [fromLayout.key]: fromLayout.reducer,
};


// console.log all actions in dev mode
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state, action) => {
      const result = reducer(state, action);
      console.groupCollapsed(action.type);
      console.log('prev state', state);
      console.log('action', action);
      console.log('next state', result);
      console.groupEnd();
  
      return result;
    };
  }
  
export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger]
: [];

const layoutFeatureState = createFeatureSelector<fromLayout.State>(fromLayout.key);
const getCurrentView = createSelector(
    layoutFeatureState,
    fromLayout.getCurrentView
)
export const selectors = {
    [fromLayout.key]: {
        getCurrentView,
    }
}