import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IBrewRatings } from 'src/app/models/brew-ratings.model';
import { BrewRatingActions } from '../actions';

export const key = 'brew-rating';

export interface State extends EntityState<IBrewRatings> { };

export function sortByCreatedAt(a: IBrewRatings, b: IBrewRatings): number {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export const adapter: EntityAdapter<IBrewRatings> = createEntityAdapter<IBrewRatings>({
  selectId: (ad: IBrewRatings) => ad.id,
  sortComparer: sortByCreatedAt,
});

const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(
    BrewRatingActions.getManySuccess,
    (state, { page }) => adapter.upsertMany(page.data, state),
  ),

  on(
    BrewRatingActions.updateSuccess,
    (state, { item }) => adapter.upsertOne(item, state),
  ),

  on(
    BrewRatingActions.createSuccess,
    (state, { item }) => adapter.upsertOne(item, state),
  ),
);
