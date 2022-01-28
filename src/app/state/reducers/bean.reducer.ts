import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ICoffeeBean } from 'src/app/models/bean.model';
import { CoffeeBeanActions } from '../actions';

export const key = 'beans';

export interface State extends EntityState<ICoffeeBean>{};

export const adapter: EntityAdapter<ICoffeeBean> = createEntityAdapter<ICoffeeBean>({
    selectId: (ad: ICoffeeBean) => ad.id,
    sortComparer: false,
  });

const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
    initialState,
    on(
        CoffeeBeanActions.getManySuccess,
        (state, {page}) => adapter.upsertMany(page.data, state),
    ),

    on(
        CoffeeBeanActions.updateSuccess,
        (state, {item}) => adapter.upsertOne(item, state),
    ),

    on(
        CoffeeBeanActions.createSuccess,
        (state, {item}) => adapter.upsertOne(item, state),
    ),
);