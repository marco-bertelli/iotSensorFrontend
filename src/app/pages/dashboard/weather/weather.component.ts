import { Component } from '@angular/core';

import axios from 'axios';

@Component({
  selector: 'ngx-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})

export class WeatherComponent {

  actualData: any;

  getDate() {
    let yourDate = new Date()
    return yourDate.toISOString().split('T')[0]
  }

  async ngOnInit() {
    const result = await axios.get('https://iot-smart-box.herokuapp.com/datalogs/ambient/now')

    this.actualData = result.data
  }
}
