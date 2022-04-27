import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IBrew, IFilterBrew } from 'src/app/models/brew.model';
import { BrewActions, RatingActions } from '../actions';

export const key = 'brew';

export interface State extends EntityState<IBrew> {
  filters: IFilterBrew | null,
  selected: number | null,
  selectedRating: number | null,
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
  selectedRating: null,
});

export const reducer = createReducer(
  initialState,
  on(
    BrewActions.getManySuccess,
    (state, { page }) => adapter.setAll(page.data, state),
  ),

  on(
    BrewActions.createSuccess, BrewActions.updateSuccess,
    (state, { item }) => adapter.upsertOne(item, state),
  ),

  on(
    BrewActions.storeFilters,
    (state, { filters }) => ({...state, filters: filters as IFilterBrew}),
  ),

  on(
    BrewActions.deleteRatingSuccess,
    (state, { item }) => adapter.removeOne(item.id, state),
  ),

  on(
    BrewActions.selectOne,
    (state, { id }) => {
      return {...state, selected: id}
    },
  ),

  on(
    RatingActions.selectOne,
    (state, { id }) => {
      return {...state, selectedRating: id}
    },
  ),

  on(
    RatingActions.createSuccess, RatingActions.updateSuccess,
    (state, {item}) => {
      const _brew: IBrew = {...state.entities[item.brew_id]} as unknown as IBrew;
      const _rating = (_brew.ratings || []).filter(r => r.id !== item.id);
      _brew.ratings =  [..._rating, item];
      return adapter.upsertOne(_brew, state)
    }
  )
);

export const getSelectedId = (s: State) => s.selected;
export const getSelectedRatingId = (s: State) => s.selectedRating;
