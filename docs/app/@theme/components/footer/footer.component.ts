

import { Component } from '@angular/core';

@Component({
  selector: 'ngx-landing-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class NgxLandingFooterComponent {
  get currentYear() {
    return new Date().getFullYear();
  }
}
