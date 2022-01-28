import { createAction, union, props } from '@ngrx/store';
import { LayoutView } from 'src/app/models/layout.model';

export const change = createAction('[LAYOUT] Change View', props<{view: LayoutView}>());

const all = union({
    change
});

export type ActionsUnion = typeof all;
