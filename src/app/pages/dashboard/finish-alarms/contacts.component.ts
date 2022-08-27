import { Component, OnDestroy } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'ngx-alarms',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class AlarmComponent {

  alarms: any[];
  recent: any[];

  constructor() {}

  async ngOnInit() {
    const result = await axios.get('https://iot-sensor-backend.herokuapp.com/alarms/finished');

    console.log(result.data);

    this.alarms = result.data;
  }
}
