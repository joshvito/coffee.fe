import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoffeeBean, ICreateBean, Roast } from 'src/app/models/bean.model';
import { IPageMeta } from 'src/app/models/common.model';
import { CoffeeBeanActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';
import { NewBeanComponent } from './new-bean.component';

@Component({
  selector: 'app-beans',
  templateUrl: './beans.component.html',
})
export class BeansComponent implements OnInit {
  beans$: Observable<ICoffeeBean[]>;
  Roast = Roast;
  @ViewChildren('bean') beans!: QueryList<ElementRef>;
  pageMeta$: Observable<IPageMeta | null>;

  constructor(
    private store: Store<State>,
    private modalService: NgbModal,
  ) {
    this.beans$ = this.store.pipe(select(selectors.beans.getAllBeans));
    this.pageMeta$ = this.store.pipe(select(selectors.beans.getPageMeta));
  }

  ngOnInit(): void {
    this.loadPage(1);
  }

  onAdd(): void {
    this.modalService.open(NewBeanComponent).result.then((query: ICreateBean) => {
      this.store.dispatch(CoffeeBeanActions.create({query}));
    }, (reason) => { });
  }

  onDelete(id: number): void {
    if(confirm('Are you sure?')) {
    }
  }

  loadPage(page: number): void {
    this.store.dispatch(CoffeeBeanActions.getMany({page, limit: 100}));
  }

  onEdit(id: number): void {
  }

  onSwipeLeft(event: Event) {
    const target = event.target as HTMLElement;
    const rating = target.closest('.swipe-card');
    const controls = rating?.querySelector('.swipe-card__controls');

    controls?.classList.remove('d-none');
    controls?.classList.add('d-block');
  }

  onSwipeRight(event: Event) {
    const target = event.target as HTMLElement;
    const rating = target.closest('.swipe-card');
    const controls = rating?.querySelector('.swipe-card__controls');

    controls?.classList.remove('d-block');
    controls?.classList.add('d-none');
  }

}
