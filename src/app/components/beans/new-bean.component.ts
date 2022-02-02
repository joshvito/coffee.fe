import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Roast } from 'src/app/models/bean.model';

@Component({
  selector: 'app-new-bean',
  template: `
    <form [formGroup]="form" class="m-4" (ngSubmit)="onSave()">
      <div class="mb-3">
        <label for="brand" class="form-label">Brand</label>
        <input type="text" id="brand" class="form-control" formControlName="brand"
          [class.is-invalid]="form.get('brand')?.invalid && form.get('brand')?.touched" />
      </div>

      <div class="mb-3">
        <label for="origin" class="form-label">Origin</label>
        <input type="number" id="origin" class="form-control" formControlName="origin"
          [class.is-invalid]="form.get('origin')?.invalid && form.get('origin')?.touched" />
      </div>

      <div class="mb-3">
        <label for="roast" class="form-label">Roast</label>
        <select id="roast" class="form-control" formControlName="roast"
          [class.is-invalid]="form.get('roast')?.invalid && form.get('roast')?.touched">
          <option></option>
          <option *ngFor="let kvp of (Roast | enumToArray)" [ngValue]="kvp.key">{{ kvp.value | sentenceCase }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="notes" class="form-label">Notes</label>
        <textarea id="notes" class="form-control" formControlName="notes" rows="4" maxlength="255"
          [class.is-invalid]="form.get('notes')?.invalid && form.get('notes')?.touched"></textarea>
      </div>

      <div class="d-grid gap-2">
        <button class="btn btn-primary" [disabled]="form.invalid">Save</button>
        <button type="button" class="btn btn-outline-primary" (click)="onClose()">Close</button>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class NewBeanComponent implements OnInit {
  form: FormGroup;
  Roast = Roast;

  constructor(
    fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = fb.group({
      'brand': fb.control(null, [Validators.required]),
      'origin': fb.control(null, [Validators.required]),
      'roast': fb.control(null, [Validators.required]),
      'notes': fb.control(null, [Validators.max(255)]),
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.activeModal.close(this.form.value);
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
