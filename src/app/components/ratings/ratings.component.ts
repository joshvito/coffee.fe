import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Aroma, Flavor, IBrewRatings } from 'src/app/models/brew-ratings.model';
import { BrewRatingActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';
import { NewRatingComponent } from '../new-rating/new-rating.component';

@Component({
  selector: 'app-ratings',
  template: `
    <p *ngIf="!(ratings$ | async)?.length">No Ratings</p>
    <div class="row gy-3">
      <div class="col-12" *ngFor="let r of (ratings$ | async)">
        <div class="card">
          <div class="card-body">
            <p class="card-title">{{ r.created_at | date:"short" }}</p>
            <p class="card-text">
              Coffee: {{ r.bean_id }}<br/>
              Method: {{ r.method_id }}<br/>
              Flavor: {{ Flavor[r.flavor] | sentenceCase }}<br/>
              Aroma: {{ Aroma[r.aroma] | sentenceCase }}<br/>
              Grams: {{ r.grams }}g<br/>
            </p>
            <ng-container *ngIf="r.notes">
              <p class="bg-light p-2 rounded shadow-sm">
                Notes:<br/>
                {{ r.notes }}
              </p>
            </ng-container>
          </div>
        </div>
      </div>
    </div>

    <div class="position-absolute bottom-0 end-0 h1 m-3">
      <i class="fas fa-plus-circle" (click)="onAddRating()"></i>
    </div>
  `,
  styles: [
  ]
})
export class RatingsComponent implements OnInit {
  ratings$: Observable<IBrewRatings[]>;
  Aroma = Aroma;
  Flavor = Flavor;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal
  ) {
    this.ratings$ = this.store.select(selectors['brew-rating'].getAllRatings);
  }

  ngOnInit(): void {
    this.store.dispatch(BrewRatingActions.getMany());
  }

  onAddRating(): void {
    this.modalService.open(NewRatingComponent).result.then((result) => {
      this.store.dispatch(BrewRatingActions.create({rating: result}));
    }, (reason) => {
      console.log('dismissed');
    });
  }
}
