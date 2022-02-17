import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signinerizer',
  template: `
    <div class="h-100 fa-2x text-center">
      Loading <i class="fas fa-circle-notch fa-spin"></i>
    </div>
  `,
  styles: [
  ]
})
export class SigninerizerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
