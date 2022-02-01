import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IBrewMethod } from 'src/app/models/brew-method.model';
import { BrewMethodActions } from '../actions';

export const key = 'brew-method';

export interface State extends EntityState<IBrewMethod>{};

export const adapter: EntityAdapter<IBrewMethod> = createEntityAdapter<IBrewMethod>({
    selectId: (ad: IBrewMethod) => ad.id,
    sortComparer: (a,b) => {
      const typeA = a.type.toUpperCase();
      const typeB = b.type.toUpperCase();

      if (typeA < typeB) {
        return -1;
      }
      if (typeA > typeB) {
        return 1;
      }
      return 0;
    },
  });

const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
    initialState,
    on(
        BrewMethodActions.getManySuccess,
        (state, {page}) => adapter.upsertMany(page.data, state),
    ),

    on(
        BrewMethodActions.updateSuccess,
        (state, {item}) => adapter.upsertOne(item, state),
    ),

    on(
        BrewMethodActions.createSuccess,
        (state, {item}) => adapter.upsertOne(item, state),
    ),
);
