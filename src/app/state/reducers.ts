import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromLayout from './reducers/layout.reducer';
import * as fromBeans from './reducers/bean.reducer';
import * as fromRatings from './reducers/brew-rating.reducer';
import * as fromMethods from './reducers/brew-method.reducer';

export interface State {
  [fromLayout.key]: fromLayout.State;
  [fromBeans.key]: fromBeans.State;
  [fromMethods.key]: fromMethods.State;
  [fromRatings.key]: fromRatings.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromLayout.key]: fromLayout.reducer,
  [fromBeans.key]: fromBeans.reducer,
  [fromMethods.key]: fromMethods.reducer,
  [fromRatings.key]: fromRatings.reducer,
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
const beanFeatureState = createFeatureSelector<fromBeans.State>(fromBeans.key);
const ratingsFeatureState = createFeatureSelector<fromRatings.State>(fromRatings.key);
const methodsFeatureState = createFeatureSelector<fromMethods.State>(fromMethods.key);

const getCurrentView = createSelector(
  layoutFeatureState,
  fromLayout.getCurrentView
)

const {
  selectIds: getRatingIds,
  selectEntities: getRatingEntities,
  selectAll: getAllRatings,
  selectTotal: getTotalRatings
} = fromRatings.adapter.getSelectors(ratingsFeatureState);

const {
  selectIds: getMethodIds,
  selectEntities: getMethodEntities,
  selectAll: getAllMethods,
  selectTotal: getTotalMethods
} = fromMethods.adapter.getSelectors(methodsFeatureState);

const {
  selectIds: getBeanIds,
  selectEntities: getBeanEntities,
  selectAll: getAllBeans,
  selectTotal: getTotalBeans
} = fromBeans.adapter.getSelectors(beanFeatureState);

const getFilters = createSelector(ratingsFeatureState, (s) => s.filters);

export const selectors = {
  [fromLayout.key]: {
    getCurrentView,
  },
  [fromRatings.key]: {
    getRatingIds,
    getRatingEntities,
    getAllRatings,
    getTotalRatings,
    getFilters
  },
  [fromMethods.key]: {
    getMethodIds,
    getMethodEntities,
    getAllMethods,
    getTotalMethods,
    getMethodById: (id: number) => {
      return createSelector(
        getMethodEntities,
        (e) => e[id]
      );
    }
  },
  [fromBeans.key]: {
    getBeanIds,
    getBeanEntities,
    getAllBeans,
    getTotalBeans,
    getBeanById: (id: number) => {
      return createSelector(
        getBeanEntities,
        (e) => e[id]
      );
    }
  }
}
