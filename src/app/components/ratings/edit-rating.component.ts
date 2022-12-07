import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { OptionalRatingDescriptions, OptionalRatingKeys } from 'src/app/models/rating.model';
import { selectors, State } from 'src/app/state/reducers';

@Component({
  selector: 'app-edit-rating',
  templateUrl: 'rating-modal.html',
  styles: []
})
export class EditRatingComponent implements OnInit {
  form: UntypedFormGroup;
  optionalKeys = OptionalRatingKeys;
  optionalDescriptions = OptionalRatingDescriptions;

  constructor(
    private store: Store<State>,
    fb: UntypedFormBuilder,
    public activeModal: NgbActiveModal
  ) {
    const optionalFields = this.optionalKeys.reduce((accum, key) => {
      return {
        ...accum,
        [key]: fb.control(0, [Validators.max(5), Validators.min(1)])
      };
    }, {});

    this.form = fb.group({
      'brew_id': fb.control(null, [Validators.required]),
      'rating': fb.control(null, [Validators.required, Validators.max(5), Validators.min(1)]),
      'notes': fb.control('', [Validators.max(255)]),
      'id': fb.control(null, Validators.required),
      ...optionalFields
    });
  }

  ngOnInit(): void {
    const calcRating = () => {
      let count = 0;
      const ratingTotal = OptionalRatingKeys.reduce((accum, k) => {
        const fv = this.form.get(k)?.value;
        const tmp = fv == null ? 0 : parseInt(fv);
        count += (tmp > 0) ? 1 : 0
        return accum += tmp;
      }, 0);

      return count > 0 ? Math.ceil(ratingTotal/count) : 0;
    };

    OptionalRatingKeys.map(k => {
      this.form.get(k)?.valueChanges
        .pipe(filter(v => !!v))
        .subscribe(v => {
          const rating = calcRating();
          this.form.get('rating')?.setValue(rating);
        });
    });

    this.store.pipe(
      select(selectors['brew'].getSelectedRating),
      filter(r => !!r)
    ).subscribe(r => {
      if(!!r) {this.form.patchValue(r);}
    });
  }

  onSave(): void {
    this.activeModal.close(this.form.value);
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
