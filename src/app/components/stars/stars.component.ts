import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  template: `
    <div>
      <i class="fa fa-solid fa-star fs-7" aria-hidden="true"></i>
      <i class="fa fa-solid fa-star fs-7" aria-hidden="true"></i>
      <i class="fa fa-solid fa-star fs-7" aria-hidden="true"></i>
      <i class="fa fa-solid fa-star fs-7" aria-hidden="true"></i>
      <i class="fa fa-solid fa-star fs-7" aria-hidden="true"></i>
    </div>
  `,
  styles: [
  ]
})
export class StarsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
