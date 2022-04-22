import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoffeeBean, Roast } from 'src/app/models/bean.model';
import { IBrewMethod } from 'src/app/models/brew-method.model';
import { Grind, IBrew } from 'src/app/models/brew.model';
import { BrewMethodActions, BrewActions, CoffeeBeanActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';
import { NewRatingComponent } from './new-rating.component';
import { RatingFilterComponent } from '../rating-filter/rating-filter.component';
import { ColorizerService } from 'src/app/services/colorizer.service';
import { IUser } from 'src/app/models/user.model';
import { EditRatingComponent } from './edit-rating.component';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html'
})
export class RatingsComponent implements OnInit {
  ratings$: Observable<IBrew[]>;
  Roast = Roast;
  Grind = Grind;
  methods$: Observable<Dictionary<IBrewMethod>>;
  currentUser$: Observable<IUser | null>;
  @ViewChildren('rating') ratings!: QueryList<ElementRef>;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal,
    private colorizer: ColorizerService,
  ) {
    this.ratings$ = this.store.select(selectors['brew'].getAllRatings);
    this.methods$ = this.store.select(selectors['brew-method'].getMethodEntities);
    this.currentUser$ = this.store.select(selectors['user'].getCurrentUser);

    this.store.select(selectors['beans'].getBeanEntities);
  }

  ngOnInit(): void {
    this.store.dispatch(BrewActions.getMany({}));
    this.store.dispatch(BrewMethodActions.getMany());
    this.store.dispatch(CoffeeBeanActions.getMany({page: 1, limit: 5000}));
  }

  onAddRating(): void {
    this.modalService.open(NewRatingComponent).result.then((result) => {
      this.store.dispatch(BrewActions.create({brew: result}));
    }, (reason) => { });
  }

  getColor(brew: IBrew): string {
    // TODO: this is probs broken
    return this.colorizer.color(brew.ratings[0]);
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
    const rating = target.closest('.swipe-card');
    const controls = rating?.querySelector('.swipe-card__controls');

    controls?.classList.remove('d-none');
    controls?.classList.add('d-flex');
  }

  onSwipeRight(event: Event) {
    const target = event.target as HTMLElement;
    const rating = target.closest('.swipe-card');
    const controls = rating?.querySelector('.swipe-card__controls');

    controls?.classList.remove('d-flex');
    controls?.classList.add('d-none');
  }

  onDelete(id: number): void {
    if(confirm('Are you sure?')) {
      this.store.dispatch(BrewActions.deleteRating({id}));
    }
  }

  onEdit(id: number): void {
      this.store.dispatch(BrewActions.selectOne({id}));
      this.modalService.open(EditRatingComponent).result.then((result) => {
        this.store.dispatch(BrewActions.update({item: result}));
        this.ratings.forEach(f => f.nativeElement?.querySelector('.rating__controls')?.classList.remove('d-flex'));
        this.ratings.forEach(f => f.nativeElement?.querySelector('.rating__controls')?.classList.add('d-none'));
      }, (reason) => { });
  }
}
