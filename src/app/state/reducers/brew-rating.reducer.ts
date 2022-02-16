import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IBrewRatings, IFilterBrewRatings } from 'src/app/models/brew-ratings.model';
import { BrewRatingActions } from '../actions';

export const key = 'brew-rating';

export interface State extends EntityState<IBrewRatings> {
  filters: IFilterBrewRatings | null,
  selected: number | null,
};

export function sortByCreatedAt(a: IBrewRatings, b: IBrewRatings): number {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export const adapter: EntityAdapter<IBrewRatings> = createEntityAdapter<IBrewRatings>({
  selectId: (ad: IBrewRatings) => ad.id,
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
    (state, { filters }) => ({...state, filters}),
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
