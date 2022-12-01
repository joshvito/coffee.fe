import { ICoffeeBean, Roast } from 'src/app/models/bean.model';

export class BaseBrewComponent {
  constructor() {}

  getTitle(bean: ICoffeeBean): string {
    return `${bean.brand} ${bean.name ? bean.name : bean.origin } ${ Roast[bean.roast] } Roast`
  }

  getLabel(bean: ICoffeeBean): string {
    return `[${bean.brand}] ${bean.name ? bean.name : bean.origin } (${ Roast[bean.roast] } Roast)`
  }

}
