import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by Marco Bertelli 2022
      Made with
      <b>
        ngx-admin.
      </b>
    </span>
    <div class="socials">
      <a href="https://github.com/marco-bertelli" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/in/marco-bertelli/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
