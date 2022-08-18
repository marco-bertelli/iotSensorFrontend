

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Descriptions, DescriptionsService } from '../../../@core/data/service/descriptions.service';

@Component({
  selector: 'ngx-landing-sections-container',
  templateUrl: './ngx-landing-sections-container.component.html',
  styleUrls: ['./ngx-landing-sections-container.component.scss'],
})
export class NgxLandingSectionsContainerComponent {

  descriptions: Observable<Descriptions[]> = this.descriptionsService.getDescriptions();

  constructor(private descriptionsService: DescriptionsService) { }
}
