import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromLayout from './reducers/layout.reducer';
import * as fromBeans from './reducers/bean.reducer';
import * as fromBrew from './reducers/brew.reducer';
import * as fromMethods from './reducers/brew-method.reducer';
import * as fromUsers from './reducers/user.reducer';

export interface State {
  [fromLayout.key]: fromLayout.State;
  [fromBeans.key]: fromBeans.State;
  [fromMethods.key]: fromMethods.State;
  [fromBrew.key]: fromBrew.State;
  [fromUsers.key]: fromUsers.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromLayout.key]: fromLayout.reducer,
  [fromBeans.key]: fromBeans.reducer,
  [fromMethods.key]: fromMethods.reducer,
  [fromBrew.key]: fromBrew.reducer,
  [fromUsers.key]: fromUsers.reducer
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
const brewsFeatureState = createFeatureSelector<fromBrew.State>(fromBrew.key);
const methodsFeatureState = createFeatureSelector<fromMethods.State>(fromMethods.key);
const usersFeatureState = createFeatureSelector<fromUsers.State>(fromUsers.key);

const getCurrentView = createSelector(
  layoutFeatureState,
  fromLayout.getCurrentView
)

const {
  selectIds: getBrewIds,
  selectEntities: getBrewEntities,
  selectAll: getAllBrews,
  selectTotal: getTotalBrews
} = fromBrew.adapter.getSelectors(brewsFeatureState);

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

const getFilters = createSelector(brewsFeatureState, (s) => s.filters);

const getSelectedBrewId = createSelector(
  brewsFeatureState,
  fromBrew.getSelectedId
);

const getSelectedBrew = createSelector(
  getBrewEntities,
  getSelectedBrewId,
  (d, id) => id !==null ? d[id] : null
);

const getSelectedRatingId = createSelector(
  brewsFeatureState,
  fromBrew.getSelectedRatingId
)

const getSelectedRating = createSelector(
  getSelectedBrew,
  getSelectedRatingId,
  (b, r_id) => b?.ratings.find(r => r.id === r_id)
)

const getCurrentUser = createSelector(usersFeatureState, (s) => s.current);

export const selectors = {
  [fromLayout.key]: {
    getCurrentView,
  },
  [fromBrew.key]: {
    getBrewIds,
    getBrewEntities,
    getAllBrews,
    getTotalBrews,
    getFilters,
    getSelectedBrew,
    getSelectedRating,
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
    },
    getPageMeta: createSelector(beanFeatureState, (b) => b.pageMeta)
  },
  [fromUsers.key]: {
    getCurrentUser
  }
}
