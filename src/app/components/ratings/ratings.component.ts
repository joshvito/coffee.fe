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

@Component({
  selector: 'app-ratings',
  template: `
    <div class="mb-2 d-flex align-items-center">
      <h1 class="h3">Ratings</h1>
      <div class="text-end flex-grow-1">
        <button type="button" class="btn btn-text" (click)="onToggleFilters()"><i class="fas fa-filter"></i></button>
      </div>
    </div>

    <p *ngIf="!(ratings$ | async)?.length">No Ratings</p>

    <div class="row gy-3">
      <div class="col-12" *ngFor="let r of (ratings$ | async); let i = index">
        <div class="card">
          <div class="card-body">
            <div class="card-title mb-0">
              <a type="button" class="btn btn-link link-dark p-0 text-decoration-none text-start" data-bs-toggle="collapse" href="#collapse-{{i}}">
                {{ r.created_at | date:"MMM d, y" }} <br/>
                {{ (getBean(r.bean_id) | async)?.origin }} ({{ getRoast((getBean(r.bean_id) | async)?.roast) }} Roast)
              </a>
            </div>

            <div class="collapse mt-3" id="collapse-{{i}}">
              <p class="card-text">
                Method: {{ (getMethod(r.method_id) | async)?.type }}<br/>
                Flavor: {{ Flavor[r.flavor] | sentenceCase }}<br/>
                Aroma: {{ Aroma[r.aroma] | sentenceCase }}<br/>
                Grams: {{ r.grams }}g <span *ngIf="r?.grind !== null">({{r.grind !== undefined && r.grind > -1 !== null ? Grind[r.grind] : 'Unknown'}})</span>
              </p>
              <ng-container *ngIf="r.notes">
                <p class="bg-light p-2 mb-0 rounded shadow-sm">
                  Notes:<br/>
                  {{ r.notes }}
                </p>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="position-fixed bottom-0 end-0 h1 m-3 rounded-circle align-items-center justify-content-center d-flex shadow-sm"
      style="height: 55px; width: 55px; cursor: pointer">
      <i class="fas fa-plus-circle d-block" (click)="onAddRating()"></i>
    </div>
  `,
  styles: [
  ]
})
export class RatingsComponent implements OnInit {
  ratings$: Observable<IBrewRatings[]>;
  Aroma = Aroma;
  Flavor = Flavor;
  Roast = Roast;
  Grind = Grind;
  methods$: Observable<Dictionary<IBrewMethod>>;
  beans$: Observable<Dictionary<ICoffeeBean>>;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal
  ) {
    this.ratings$ = this.store.select(selectors['brew-rating'].getAllRatings);
    this.methods$ = this.store.select(selectors['brew-method'].getMethodEntities);
    this.beans$ = this.store.select(selectors['beans'].getBeanEntities);
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

  getBean(id: number): Observable<ICoffeeBean | undefined> {
    return this.store.select(selectors['beans'].getBeanById(id));
  }

  getRoast(roast: Roast | undefined): string | undefined {
    return roast ? Roast[roast] : undefined;
  }

  getMethod(id: number): Observable<IBrewMethod | undefined> {
    return this.store.select(selectors['brew-method'].getMethodById(id));
  }

  onToggleFilters(): void {
    this.modalService.open(RatingFilterComponent);
  }
}
