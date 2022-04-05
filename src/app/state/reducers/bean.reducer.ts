import { state } from '@angular/animations';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ICoffeeBean } from 'src/app/models/bean.model';
import { IPageMeta } from 'src/app/models/common.model';
import { CoffeeBeanActions } from '../actions';

export const key = 'beans';

export interface State extends EntityState<ICoffeeBean>{
  pageMeta: IPageMeta | null
};

export const adapter: EntityAdapter<ICoffeeBean> = createEntityAdapter<ICoffeeBean>({
    selectId: (ad: ICoffeeBean) => ad.id,
    sortComparer: false,
  });

const initialState: State = adapter.getInitialState({
  pageMeta: null
});

export const reducer = createReducer(
    initialState,
    on(
        CoffeeBeanActions.getManySuccess,
        (state, {page}) => {
          const {data, ...pageMeta} = page;
          const s = adapter.upsertMany(page.data, state);
          return {...s, pageMeta};
        },
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
