

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-free-banner-section',
  templateUrl: './free-banner-section.component.html',
  styleUrls: ['./free-banner-section.component.scss'],
})
export class FreeBannerSectionComponent {

 @Input() bannerImg: string;
 @Input() url: string;

}
