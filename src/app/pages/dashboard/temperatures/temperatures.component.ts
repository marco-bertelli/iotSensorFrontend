import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-temperatures',
  styleUrls: ['./temperatures.component.scss'],
  templateUrl: './temperatures.component.html',
})
export class TemperaturesComponent  {

  @Input() sensors: any[]
  @Input() interval: any[]

}
