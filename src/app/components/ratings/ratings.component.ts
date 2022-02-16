import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoffeeBean, Roast } from 'src/app/models/bean.model';
import { IBrewMethod } from 'src/app/models/brew-method.model';
import { Aroma, Flavor, Grind, IBrewRatings } from 'src/app/models/brew-ratings.model';
import { BrewMethodActions, BrewRatingActions, CoffeeBeanActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';
import { NewRatingComponent } from './new-rating.component';
import { RatingFilterComponent } from '../rating-filter/rating-filter.component';
import { ColorizerService } from 'src/app/services/colorizer.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  ratings$: Observable<IBrewRatings[]>;
  Aroma = Aroma;
  Flavor = Flavor;
  Roast = Roast;
  Grind = Grind;
  methods$: Observable<Dictionary<IBrewMethod>>;
  beans$: Observable<Dictionary<ICoffeeBean>>;
  currentUser$: Observable<IUser | null>;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal,
    private colorizer: ColorizerService,
  ) {
    this.ratings$ = this.store.select(selectors['brew-rating'].getAllRatings);
    this.methods$ = this.store.select(selectors['brew-method'].getMethodEntities);
    this.beans$ = this.store.select(selectors['beans'].getBeanEntities);
    this.currentUser$ = this.store.select(selectors['user'].getCurrentUser);
  }

  ngOnInit(): void {
    this.store.dispatch(BrewRatingActions.getMany({}));
    this.store.dispatch(BrewMethodActions.getMany());
    this.store.dispatch(CoffeeBeanActions.getMany());
  }

  onAddRating(): void {
    this.modalService.open(NewRatingComponent).result.then((result) => {
      this.store.dispatch(BrewRatingActions.create({rating: result}));
    }, (reason) => {
      console.log('dismissed');
    });
  }

  getColor(rating: IBrewRatings): string {
    return this.colorizer.color(rating);
  }

  getBean(id: number): Observable<ICoffeeBean | undefined> {
    return this.store.select(selectors['beans'].getBeanById(id));
  }

  getRoast(roast: Roast | undefined): string | undefined {
    return roast != undefined ? Roast[roast] : undefined;
  }

  getMethod(id: number): Observable<IBrewMethod | undefined> {
    return this.store.select(selectors['brew-method'].getMethodById(id));
  }

  onToggleFilters(): void {
    this.modalService.open(RatingFilterComponent);
  }

  onSwipeLeft(event: Event) {
    const target = event.target as HTMLElement;
    target.closest('.rating')?.querySelector('.rating__controls')?.classList.remove('d-none');
    target.closest('.rating')?.querySelector('.rating__controls')?.classList.add('d-block');
  }

  onSwipeRight(event: Event) {
    const target = event.target as HTMLElement;
    target.closest('.rating')?.querySelector('.rating__controls')?.classList.remove('d-block');
    target.closest('.rating')?.querySelector('.rating__controls')?.classList.add('d-none');
  }

  onDelete(id: number): void {
    if(confirm('Are you sure?')) {
      this.store.dispatch(BrewRatingActions.deleteRating({id}));
    }
  }
}
