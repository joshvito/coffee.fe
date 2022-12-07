import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { OptionalRatingDescriptions, OptionalRatingKeys, optionalRatingKeysType } from 'src/app/models/rating.model';
import { selectors, State } from 'src/app/state/reducers';

type formKeys = 'brew_id' | 'rating' | 'notes' | optionalRatingKeysType;
type IForm = {
  [key in formKeys]: string|null
}
@Component({
  selector: 'app-new-rating',
  templateUrl: 'rating-modal.html',
  styles: []
})
export class NewRatingComponent implements OnInit {
  form: FormGroup;
  optionalKeys = OptionalRatingKeys;
  optionalDescriptions = OptionalRatingDescriptions;

  constructor(
    private store: Store<State>,
    fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    const optionalFields = this.optionalKeys.reduce((accum, key) => {
      return {
        ...accum,
        [key]: fb.control(null, [Validators.max(5), Validators.min(1)])
      };
    }, {});

    this.form = fb.group({
      'brew_id': fb.control<string|null>(null, [Validators.required]),
      'rating': fb.control<string|null>(null, [Validators.required, Validators.max(5), Validators.min(1)]),
      'notes': fb.control<string|null>('', [Validators.max(255)]),
      ...optionalFields
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .subscribe((fv) => {
        const ratingTotal = Object.keys(fv).reduce((accum, k) => {
          if(k === 'rating' || k === 'notes') return accum;
          return accum += parseInt(fv[k]);
        },0);

        const rating = ratingTotal/OptionalRatingKeys.length;

        this.form.patchValue({rating});
      });


    this.store.pipe(
      select(selectors['brew'].getSelectedBrew),
      filter(r => !!r)
    ).subscribe(b => {
      if(!!b) {this.form.patchValue({'brew_id': b.id.toString()})}
    });
  }

  onSave(): void {
    this.activeModal.close(this.form.value);
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
