import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IBrew, IFilterBrew } from 'src/app/models/brew.model';
import { BrewRatingActions } from '../actions';

export const key = 'brew';

export interface State extends EntityState<IBrew> {
  filters: IFilterBrew | null,
  selected: number | null,
};

export function sortByCreatedAt(a: IBrew, b: IBrew): number {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export const adapter: EntityAdapter<IBrew> = createEntityAdapter<IBrew>({
  selectId: (ad: IBrew) => ad.id,
  sortComparer: sortByCreatedAt,
});

const initialState: State = adapter.getInitialState({
  filters: null,
  selected: null,
});

export const reducer = createReducer(
  initialState,
  on(
    BrewRatingActions.getManySuccess,
    (state, { page }) => adapter.setAll(page.data, state),
  ),

  on(
    BrewRatingActions.createSuccess, BrewRatingActions.updateSuccess,
    (state, { item }) => adapter.upsertOne(item, state),
  ),

  on(
    BrewRatingActions.storeFilters,
    (state, { filters }) => ({...state, filters: filters as IFilterBrew}),
  ),

  on(
    BrewRatingActions.deleteRatingSuccess,
    (state, { item }) => adapter.removeOne(item.id, state),
  ),

  on(
    BrewRatingActions.selectOne,
    (state, { id }) => {
      return {...state, selected: id}
    },
  )
);

export const getSelectedId = (s: State) => s.selected;
