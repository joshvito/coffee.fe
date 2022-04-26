import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoffeeBean, Roast } from 'src/app/models/bean.model';
import { IBrewMethod } from 'src/app/models/brew-method.model';
import { Grind } from 'src/app/models/brew.model';
import { BrewMethodActions, CoffeeBeanActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';

@Component({
  selector: 'app-new-brew',
  templateUrl: 'brew-modal.html',
  styles: [
  ]
})
export class NewBrewComponent implements OnInit {
  form: FormGroup;
  Roast = Roast;
  Grind = Grind;
  methods$: Observable<IBrewMethod[]>;
  beans$: Observable<ICoffeeBean[]>;

  constructor(
    private store: Store<State>,
    fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = fb.group({
      'bean_id': fb.control(null, [Validators.required]),
      'method_id': fb.control(null, [Validators.required]),
      'grams': fb.control(null, [Validators.required]),
      'grind': fb.control(null),
      'notes': fb.control('', [Validators.max(255)]),
    });
    this.methods$ = this.store.select(selectors['brew-method'].getAllMethods);
    this.beans$ = this.store.select(selectors['beans'].getAllBeans);
  }

  ngOnInit(): void {
    this.store.dispatch(BrewMethodActions.getMany());
    this.store.dispatch(CoffeeBeanActions.getMany({page: 1}));
  }

  onSave(): void {
    this.activeModal.close(this.form.value);
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
