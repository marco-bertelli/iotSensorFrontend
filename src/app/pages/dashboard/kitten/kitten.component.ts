import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import axios from 'axios';

@Component({
  selector: 'ngx-kitten',
  styleUrls: ['./kitten.component.scss'],
  templateUrl: './kitten.component.html',
})
export class KittenComponent implements OnDestroy {

  currentTheme: string;
  themeSubscription: any;
  value: string

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  async ngOnInit() {
    const result = await axios.get('https://iot-sensor-backend.herokuapp.com/datalogs/predict');

    
    this.value = result.data;
    console.log(this.value)
  }
}
