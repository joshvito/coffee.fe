import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Coffee Friends</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Ratings</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Beans</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Methods</a>
          </li>
        </ul>
      </div>
    </div>
    </nav>
  `,
  styles: [
  ]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
