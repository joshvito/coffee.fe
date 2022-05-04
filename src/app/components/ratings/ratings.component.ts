import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoffeeBean, Roast } from 'src/app/models/bean.model';
import { IBrewMethod } from 'src/app/models/brew-method.model';
import { Grind, IBrew, ICreateBrew } from 'src/app/models/brew.model';
import { BrewMethodActions, BrewActions, CoffeeBeanActions, RatingActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';
import { NewBrewComponent } from './new-brew.component';
import { RatingFilterComponent } from '../rating-filter/rating-filter.component';
import { ColorizerService } from 'src/app/services/colorizer.service';
import { IUser } from 'src/app/models/user.model';
import { EditBrewComponent } from './edit-brew.component';
import { NewRatingComponent } from './new-rating.component';
import { ICreateRating, IRating } from 'src/app/models/rating.model';
import { EditRatingComponent } from './edit-rating.component';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.scss']
})
export class RatingsComponent implements OnInit {
  brews$: Observable<IBrew[]>;
  Roast = Roast;
  Grind = Grind;
  methods$: Observable<Dictionary<IBrewMethod>>;
  currentUser$: Observable<IUser | null>;
  @ViewChildren('brew') brews!: QueryList<ElementRef>;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal,
    private colorizer: ColorizerService,
  ) {
    this.brews$ = this.store.select(selectors['brew'].getAllBrews);
    this.methods$ = this.store.select(selectors['brew-method'].getMethodEntities);
    this.currentUser$ = this.store.select(selectors['user'].getCurrentUser);

    this.store.select(selectors['beans'].getBeanEntities);
  }

  ngOnInit(): void {
    this.store.dispatch(BrewActions.getMany({}));
    this.store.dispatch(BrewMethodActions.getMany());
    this.store.dispatch(CoffeeBeanActions.getMany({page: 1, limit: 5000}));
  }

  onAddBrew(): void {
    this.modalService.open(NewBrewComponent).result.then((result: ICreateBrew) => {
      this.store.dispatch(BrewActions.create({brew: result}));
    }, (reason) => { });
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

  /**
   * removes classed from hammerjs slide action
   */
  manipulateDom() {
    this.brews.forEach(f => f.nativeElement?.querySelector('.rating__controls')?.classList.remove('d-flex'));
    this.brews.forEach(f => f.nativeElement?.querySelector('.rating__controls')?.classList.add('d-none'));
  }

  onEdit(brew_id: number): void {
      this.store.dispatch(BrewActions.selectOne({id: brew_id}));
      this.modalService.open(EditBrewComponent).result.then((result: IBrew) => {
        this.store.dispatch(BrewActions.update({item: result}));
        this.manipulateDom();
      }, (reason) => { });
  }

  onAddRating(brew_id: number) {
    this.store.dispatch(BrewActions.selectOne({id: brew_id}));

    this.modalService.open(NewRatingComponent).result.then((result: ICreateRating) => {
      this.store.dispatch(RatingActions.create({item: result}));
    }, (reason) => { });
  }

  onEditRating(brew_id: number, rating_id: number) {
    this.store.dispatch(BrewActions.selectOne({id: brew_id}));
    this.store.dispatch(RatingActions.selectOne({id: rating_id}));

    this.modalService.open(EditRatingComponent).result.then((result: IRating) => {
      this.store.dispatch(RatingActions.update({item: result}));
      this.manipulateDom();
    }, (reason) => { });
  }

  getAvgRating(brew: IBrew): number {
    if (brew?.ratings?.length) {
      const total = brew.ratings.reduce((t, rating) => t+=rating.rating, 0);
      return total/brew.ratings.length;
    }
    return 0;
  }
}
